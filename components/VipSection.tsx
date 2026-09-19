"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX, Play } from "lucide-react";
import { SHOW_COLLAB_LABEL } from "@/lib/config";

interface Creator {
  handle: string;
  name: string;
  followers: string;
  t: number;
}

const creators: Creator[] = [
  { handle: "lorenzofierro_lf", name: "Lorenzo Fierro", followers: "164k", t: 0 },
  { handle: "christianpaneronireal", name: "Christian Paneroni", followers: "175k", t: 7.27 },
  { handle: "gianlucacarboni", name: "Gianluca Carboni", followers: "52,9k", t: 8.85 },
];

export default function VipSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [activeCreatorIndex, setActiveCreatorIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Auto-pause when scrolled out of view (only after user has started playback)
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video || video.paused) return;
        if (!entry.isIntersecting) {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  // Sync active chip with video time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => {
      const t = video.currentTime;
      const idx = t >= creators[2].t ? 2 : t >= creators[1].t ? 1 : 0;
      setActiveCreatorIndex(idx);
    };
    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  const startPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    const promise = video.play();
    if (promise !== undefined) {
      promise
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If blocked, try muted
          video.muted = true;
          setIsMuted(true);
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        });
    }
  }, [isMuted]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      startPlay();
    }
  }, [isPlaying, startPlay]);

  const handleCreatorClick = useCallback((index: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = creators[index].t;
    setActiveCreatorIndex(index);
    if (!isPlaying) startPlay();
  }, [isPlaying, startPlay]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = !isMuted;
    video.muted = next;
    setIsMuted(next);
  }, [isMuted]);

  return (
    <section
      ref={sectionRef}
      id="vip"
      aria-labelledby="vip-heading"
      className="py-20 lg:py-28 bg-notte"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="vip-heading"
          className="font-anton text-[clamp(1.8rem,4vw,3rem)] uppercase text-center text-testo mb-14 leading-none"
        >
          I VIP di Resellife
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">

          {/* Phone frame */}
          <div className="relative w-full max-w-[300px] aspect-[2/3] rounded-[2.5rem] border-[8px] border-superficie bg-black overflow-hidden shadow-2xl flex-shrink-0">

            {/* Notch */}
            <div className="absolute top-0 inset-x-0 flex justify-center z-20 pointer-events-none">
              <div className="w-24 h-5 bg-superficie rounded-b-xl" />
            </div>

            {/* Collab label */}
            {SHOW_COLLAB_LABEL && (
              <div className="absolute top-7 left-3 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] font-medium tracking-wide text-white pointer-events-none">
                Collaborazione
              </div>
            )}

            {/* Video */}
            <video
              ref={videoRef}
              src="/videos/vip/vip-resellife.mp4"
              poster="/videos/vip/vip-resellife-poster.jpg"
              className="absolute inset-0 w-full h-full object-cover"
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
            />

            {/* Play overlay — shown when not playing */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 z-30 flex items-center justify-center bg-black/40"
                aria-label="Riproduci video"
              >
                <span className="w-16 h-16 bg-viola rounded-full flex items-center justify-center pl-1 shadow-xl">
                  <Play size={30} className="text-white" />
                </span>
              </button>
            )}

            {/* Pause overlay — tap video while playing */}
            {isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 z-30 bg-transparent"
                aria-label="Metti in pausa"
              />
            )}

            {/* Audio button */}
            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 z-40 w-10 h-10 flex items-center justify-center bg-black/60 backdrop-blur-md rounded-full text-white border border-white/10 hover:bg-black/80 transition-colors"
              aria-label={isMuted ? "Attiva audio" : "Disattiva audio"}
              aria-pressed={!isMuted}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

          {/* Creator chips */}
          <div className="w-full max-w-sm flex flex-col gap-3">
            {creators.map((creator, idx) => {
              const isActive = idx === activeCreatorIndex;
              const initials = creator.name.split(" ").map((n) => n[0]).join("");
              return (
                <button
                  key={creator.handle}
                  onClick={() => handleCreatorClick(idx)}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 text-left border ${
                    isActive
                      ? "bg-viola/10 border-viola/50 shadow-md"
                      : "bg-superficie border-bordo hover:border-viola/40"
                  }`}
                  aria-pressed={isActive}
                  aria-label={`Vai al segmento di ${creator.name}`}
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${
                      isActive ? "bg-viola text-white" : "bg-notte text-testo border border-bordo"
                    }`}
                  >
                    {initials}
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-semibold text-sm ${isActive ? "text-testo" : "text-testo/80"}`}>
                      {creator.name}
                    </span>
                    <span className="text-testo/50 text-xs mt-0.5">
                      @{creator.handle} · {creator.followers}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
