"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Volume2, VolumeX, ChevronRight, ChevronLeft } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const testimonials = [
  { 
    id: 1, 
    start: 0, 
    end: 8.7, 
    name: "Marco",
    context: "Partito da zero",
    result: "+€1.500 nel primo mese",
    thumb: "/videos/dicono/thumb-1.jpg" 
  },
  { 
    id: 2, 
    start: 8.7, 
    end: 24.3, 
    name: "Andrea",
    context: "Studente universitario",
    result: "Prime vendite in 48 ore",
    thumb: "/videos/dicono/thumb-2.jpg" 
  },
  { 
    id: 3, 
    start: 24.3, 
    end: 33.5, 
    name: "Luca",
    context: "Lavoro full-time",
    result: "Entrata extra costante",
    thumb: "/videos/dicono/thumb-3.jpg" 
  },
  { 
    id: 4, 
    start: 33.5, 
    end: 40.7, 
    name: "Giulia",
    context: "Cercava indipendenza",
    result: "Vende in tutta Europa",
    thumb: "/videos/dicono/thumb-4.jpg" 
  },
  { 
    id: 5, 
    start: 40.7, 
    end: 46.1, 
    name: "Simone",
    context: "Appassionato di sneakers",
    result: "Da hobby a business",
    thumb: "/videos/dicono/thumb-5.jpg" 
  },
];

export default function ProvaSociale() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true); // parte sempre muto: l'audio lo attiva l'utente
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeStory = testimonials[currentIndex];

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = activeStory.start;
      video.play().then(() => setIsPlaying(true)).catch(() => {
        setIsMuted(true);
        video.muted = true;
        video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      });
      trackEvent("testimonial_view", { story: activeStory.id });
    }
  }, [currentIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      if (video.currentTime >= activeStory.end) {
        if (currentIndex < testimonials.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setCurrentIndex(0);
        }
      }
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [currentIndex, activeStory]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  return (
    <section id="risultati" aria-labelledby="risultati-heading" className="py-20 lg:py-32 bg-superficie overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="risultati-heading" className="font-anton text-[clamp(2.5rem,6vw,5rem)] uppercase text-white leading-[0.9] mb-4">
            QUESTO È IL RESELLING<br/> <span className="text-viola">VISTO DA CHI LO STA FACENDO.</span>
          </h2>
        </div>

        <div className="max-w-md mx-auto relative group">
          <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
            <video
              ref={videoRef}
              src="/videos/dicono/dicono-di-noi.mp4"
              poster={activeStory.thumb}
              className="w-full h-full object-cover"
              playsInline
              preload="metadata"
              muted={isMuted}
              onClick={togglePlay}
            />

            {/* Top progress bar */}
            <div className="absolute top-0 inset-x-0 z-20 flex gap-1 px-2 pt-4">
              {testimonials.map((s, i) => (
                <div key={s.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-300" 
                    style={{ width: i < currentIndex ? '100%' : i === currentIndex ? '50%' : '0%' }} 
                  />
                </div>
              ))}
            </div>

            {/* Overlays */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 pt-24 z-20 pointer-events-none">
              <div className="mb-2">
                <h3 className="text-white font-poppins font-bold text-xl">{activeStory.name}</h3>
                <p className="text-white/80 font-poppins text-sm">{activeStory.context}</p>
              </div>
              <div className="inline-block bg-viola/20 border border-viola/50 rounded px-3 py-1 mb-4 backdrop-blur-sm">
                <p className="text-viola font-semibold text-sm">{activeStory.result}</p>
              </div>

              <div className="flex justify-between items-end pointer-events-auto">
                <p className="text-white/50 text-xs max-w-[70%]">Risultati individuali, non garantiti.</p>
                <div className="flex gap-2">
                  <button onClick={() => setIsMuted(!isMuted)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-colors">
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <button onClick={togglePlay} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-colors">
                    {isPlaying ? <span className="text-xs font-bold">||</span> : <Play size={18} className="ml-1" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              className={`absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all z-30 hover:bg-viola ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => setCurrentIndex(Math.min(testimonials.length - 1, currentIndex + 1))}
              className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all z-30 hover:bg-viola ${currentIndex === testimonials.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
