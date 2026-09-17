"use client";

import { useEffect, useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [activeCreatorIndex, setActiveCreatorIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowPlayButton(true);
    }
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().then(() => setIsPlaying(true)).catch(() => {
              // Autoplay can be blocked by browser
              setShowPlayButton(true);
            });
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const time = video.currentTime;
      let newIndex = 0;
      if (time >= creators[2].t) newIndex = 2;
      else if (time >= creators[1].t) newIndex = 1;

      if (newIndex !== activeCreatorIndex) {
        setActiveCreatorIndex(newIndex);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [activeCreatorIndex]);

  const handleCreatorClick = (index: number) => {
    setActiveCreatorIndex(index);
    if (videoRef.current) {
      videoRef.current.currentTime = creators[index].t;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setShowPlayButton(false);
      }).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleManualPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowPlayButton(true);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          setShowPlayButton(false);
        }).catch(() => {});
      }
    }
  };

  return (
    <section
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
          
          {/* Contenitore Video (Cornice Mobile) */}
          <div 
            ref={containerRef}
            className="relative w-full max-w-[320px] aspect-[2/3] rounded-[2.5rem] border-[8px] border-superficie bg-black overflow-hidden shadow-2xl flex-shrink-0"
          >
            {/* Notch */}
            <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
              <div className="w-24 h-6 bg-superficie rounded-b-xl relative top-[-4px]"></div>
            </div>

            {/* Etichetta Collaborazione */}
            {SHOW_COLLAB_LABEL && (
              <div className="absolute top-8 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-medium tracking-wide text-white">
                Collaborazione
              </div>
            )}

            <video
              ref={videoRef}
              src="/videos/vip/vip-resellife.mp4"
              poster="/videos/vip/vip-resellife-poster.jpg"
              className="absolute inset-0 w-full h-full object-cover"
              muted={isMuted}
              loop
              playsInline
              preload="none"
              onClick={handleManualPlay}
            />

            {/* Overlay Pulsante Play (Reduced Motion / Autoplay Bloccato) */}
            {showPlayButton && (
              <button
                onClick={handleManualPlay}
                className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 transition-opacity"
                aria-label="Riproduci video"
              >
                <div className="w-16 h-16 bg-viola rounded-full flex items-center justify-center text-white pl-1 shadow-lg">
                  <Play size={32} />
                </div>
              </button>
            )}

            {/* Bottone Audio */}
            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 z-30 w-10 h-10 flex items-center justify-center bg-black/60 backdrop-blur-md rounded-full text-white border border-white/10 hover:bg-black/80 transition-colors"
              aria-label={isMuted ? "Attiva audio" : "Disattiva audio"}
              aria-pressed={!isMuted}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

          {/* Lista Creatori */}
          <div className="w-full max-w-sm flex flex-col gap-4">
            {creators.map((creator, idx) => {
              const isActive = idx === activeCreatorIndex;
              const initials = creator.name
                .split(" ")
                .map((n) => n[0])
                .join("");

              return (
                <button
                  key={creator.handle}
                  onClick={() => handleCreatorClick(idx)}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left border ${
                    isActive
                      ? "bg-viola/10 border-viola/50 shadow-md"
                      : "bg-superficie border-bordo hover:border-viola/40"
                  }`}
                  aria-pressed={isActive}
                  aria-label={`Vai al segmento di ${creator.name}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${
                    isActive ? "bg-viola text-white" : "bg-notte text-testo border border-bordo"
                  }`}>
                    {initials}
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-semibold text-base ${isActive ? "text-testo" : "text-testo/80"}`}>
                      {creator.name}
                    </span>
                    <span className="text-testo/50 text-sm">
                      @{creator.handle} • {creator.followers}
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
