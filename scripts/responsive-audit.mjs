import { chromium, devices } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const viewports = [
  { name: '320x568', width: 320, height: 568, isMobile: true },
  { name: '360x740', width: 360, height: 740, isMobile: true },
  { name: '375x667', width: 375, height: 667, isMobile: true },
  { name: '390x844', width: 390, height: 844, isMobile: true },
  { name: '412x915', width: 412, height: 915, isMobile: true },
  { name: '430x932', width: 430, height: 932, isMobile: true },
  { name: '844x390', width: 844, height: 390, isMobile: true },
  { name: '768x1024', width: 768, height: 1024, isMobile: true },
  { name: '1024x768', width: 1024, height: 768, isMobile: false },
  { name: '1280x800', width: 1280, height: 800, isMobile: false },
  { name: '1440x900', width: 1440, height: 900, isMobile: false },
  { name: '1920x1080', width: 1920, height: 1080, isMobile: false }
];

async function runAudit() {
  const browser = await chromium.launch();
  const url = 'http://localhost:3000';
  const outDir = path.join(process.cwd(), 'audit', 'before');

  fs.mkdirSync(outDir, { recursive: true });

  const logs = [];

  for (const vp of viewports) {
    console.log(`Auditing ${vp.name}...`);
    const vpDir = path.join(outDir, vp.name);
    fs.mkdirSync(vpDir, { recursive: true });

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile,
      userAgent: vp.isMobile ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1' : undefined
    });

    const page = await context.newPage();
    const vpLogs = {
      viewport: vp.name,
      errors: [],
      overflowingElements: [],
      smallTextElements: [],
      smallTapTargets: []
    };

    page.on('console', msg => {
      if (msg.type() === 'error' || msg.text().toLowerCase().includes('hydration')) {
        vpLogs.errors.push(msg.text());
      }
    });
    
    page.on('pageerror', err => {
      vpLogs.errors.push(err.message);
    });

    await page.goto(url, { waitUntil: 'networkidle' });

    // evaluate on page
    const evaluatePage = await page.evaluate(() => {
      const issues = {
        hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
        overflowing: [],
        smallText: [],
        smallTap: []
      };

      const allEls = Array.from(document.querySelectorAll('*'));
      allEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        
        // Overflow
        if (rect.right > window.innerWidth && rect.width > 0 && el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE' && el.tagName !== 'HEAD' && el.tagName !== 'META' && el.tagName !== 'LINK') {
          // Find if there is overflow clipping on parent
          let p = el.parentElement;
          let clipped = false;
          while(p && p !== document.body) {
            const style = window.getComputedStyle(p);
            if (style.overflowX === 'clip' || style.overflowX === 'hidden' || style.overflow === 'hidden' || style.overflow === 'clip') {
              clipped = true;
              break;
            }
            p = p.parentElement;
          }
          if (!clipped) {
            issues.overflowing.push({ tag: el.tagName, className: el.className, text: el.textContent?.substring(0,20) });
          }
        }

        const style = window.getComputedStyle(el);
        
        // Text < 12px
        if (el.childNodes.length > 0 && Array.from(el.childNodes).some(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0)) {
          const fontSize = parseFloat(style.fontSize);
          if (fontSize > 0 && fontSize < 12) {
            issues.smallText.push({ tag: el.tagName, className: el.className, text: el.textContent?.substring(0,20), size: fontSize });
          }
        }

        // Tap targets < 44x44
        if (el.tagName === 'A' || el.tagName === 'BUTTON' || (el.hasAttribute('role') && el.getAttribute('role') === 'button')) {
          if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
            issues.smallTap.push({ tag: el.tagName, className: el.className, text: el.textContent?.substring(0,20), width: rect.width, height: rect.height });
          }
        }
      });

      return issues;
    });

    vpLogs.overflowingElements = evaluatePage.overflowing;
    vpLogs.smallTextElements = evaluatePage.smallText;
    vpLogs.smallTapTargets = evaluatePage.smallTap;
    
    // Scroll in steps
    let scrollPos = 0;
    let step = 0;
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewportHeight = vp.height;

    while (scrollPos < pageHeight) {
      await page.evaluate((y) => window.scrollTo(0, y), scrollPos);
      await page.waitForTimeout(600); // wait for animations
      await page.screenshot({ path: path.join(vpDir, `${String(step).padStart(2, '0')}.png`) });
      scrollPos += viewportHeight;
      step++;
    }

    logs.push(vpLogs);
    await context.close();
  }

  await browser.close();
  fs.writeFileSync(path.join(process.cwd(), 'audit', 'before', 'audit-logs.json'), JSON.stringify(logs, null, 2));
  console.log('Audit complete.');
}

runAudit().catch(console.error);
