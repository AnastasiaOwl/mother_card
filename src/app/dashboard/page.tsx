"use client";
import Grass from "../components/grass";
import Dandelions from "../components/dandelions";
import TextFromDandelions from "../components/textFromDandelions";
import { useEffect, useState, useRef } from "react";
import hearts from "../lottie/floating hearts.json";
import Player from "lottie-react";


export default function Dashboard() {
  const [showText, setShowText] = useState<boolean>(false);
  const [showFlowers, setShowFlowers] = useState<boolean>(false);
  const [heartsList, setHeartsList] = useState<
    { x: number; y: number; key: string }[]
  >([]);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const windRef = useRef<HTMLAudioElement | null>(null);
  const finalRef = useRef<HTMLAudioElement | null> (null);

  const isMobile = useIsMobile();

  const bladeCount = isMobile ? 400 : 2000;

  function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 1024);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }, []);

    return isMobile;
  }

  const dandelionRadius: [number, number] = isMobile ? [8, 12] : [20, 23];
  const grassHeights: [number, number][] = isMobile
    ? [
        [20, 50],
        [100, 180],
        [80, 130],
        [60, 90],
        [30, 60],
        [180, 210],
      ]
    : [
        [50, 120],
        [330, 490],
        [280, 370],
        [200, 270],
        [140, 190],
        [500, 560],
      ];

  useEffect(() => {
    windRef.current = new Audio("/sounds/wind.mp3");
    windRef.current.preload = "auto";

    finalRef.current = new Audio("/sounds/final.mp3");
    finalRef.current.preload = "auto";
  }, []);

   function handleHeartsTap(e: React.MouseEvent<HTMLDivElement>) {
    const x = e.clientX;
    const y = e.clientY;
    const key = `${Date.now()}-${Math.random()}`;
    setHeartsList((list) => [...list, { x, y, key }]);
  }

  function handleFirstTap() {
    setHasInteracted(true);
  }

  useEffect(()=>{

  const timer = setTimeout(() => {
      setShowText(true);
      const final = finalRef.current;
      if (final) {
        final.currentTime = 0;
        final.play().catch(console.error);
      }
      windRef.current?.pause();
      windRef.current!.currentTime = 0;
    }, 10000);

  const timerFlower = setTimeout(()=>{
    setShowFlowers(true);
  }, 6000)

   return () => {
    clearTimeout(timer);
    clearTimeout(timerFlower);
  };
  }, [])

  return (
    <>
    {!hasInteracted && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={() => {
              if (windRef.current) {
                windRef.current.loop = true;
                windRef.current.play().catch(console.error);
              }
              handleFirstTap();
            }}
      >
        <p className="text-white text-2xl">тапни будь-де</p>
      </div>
    )}
    {hasInteracted && (
      <div className="relative w-screen h-screen bg-green-400 overflow-hidden" onClick={handleHeartsTap}
      >
        {heartsList.map(({ x, y, key }) => (
            <div
              key={key}
              className="pointer-events-none fixed"
              style={{
                left: x,
                top: y,
                width: 200,
                height: 200,
                transform: "translate(-50%,-50%)",
                zIndex: 800000,
              }}
            >
              
          <Player
              autoplay
              animationData={hearts}
              style={{ width: "100%", height: "100%" }}
              onComplete={() => {
                setHeartsList(list => list.filter(c => c.key !== key));
              }}
            />
            </div>
          ))}

          {showText && (
            <TextFromDandelions/>
          )}
          {showFlowers && (
            <Dandelions count={50} color="#ffe600" radiusRange={dandelionRadius} />
          )
          }
       <Grass bladeCount={bladeCount} color="#003e0d" heightRange={grassHeights[0]} className="z-1000" swayPhase={0} />
       <Grass bladeCount={bladeCount} color="#228B22" heightRange={grassHeights[1]} className="z-600" swayPhase={Math.PI / 2} />
       <Grass bladeCount={bladeCount} color="#004000" heightRange={grassHeights[2]} className="z-700" swayPhase={Math.PI} />
       <Grass bladeCount={bladeCount} color="#006600" heightRange={grassHeights[3]} className="z-800" swayPhase={0} />
       <Grass bladeCount={bladeCount} color="#004000" heightRange={grassHeights[4]} className="z-900" swayPhase={Math.PI / 2} />
       <Grass bladeCount={bladeCount} color="#003e0d" heightRange={grassHeights[5]} className="z-500" swayPhase={Math.PI} />
        </div>
      )}
    </>
    
  );
}
