"use client";
import Grass from "../components/grass";
import Dandelions from "../components/dandelions";
import TextFromDandelions from "../components/textFromDandelions";
import { useEffect, useState } from "react";
import hearts from "../lottie/floating hearts.json";
import Player from "lottie-react";
import wind from "../sounds/wind.mp3";


export default function Dashboard() {
  const [showText, setShowText] = useState<boolean>(false);
  const [heartsList, setHeartsList] = useState<
    { x: number; y: number; key: string }[]
  >([]);

   function handleHeartsTap(e: React.MouseEvent<HTMLDivElement>) {
    const x = e.clientX;
    const y = e.clientY;
    const key = `${Date.now()}-${Math.random()}`;
    setHeartsList((list) => [...list, { x, y, key }]);
  }

  useEffect(()=>{

  const timer = setTimeout(() => {
      setShowText(true);
    }, 3500);

  return ()=> clearTimeout(timer);
  }, [])


  return (
    <>
    <div className="relative w-screen h-screen bg-green-400 overflow-hidden" onClick={handleHeartsTap}>
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
              zIndex: 1000,
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
        <Dandelions count={50} color="#ffe600" />
        <Grass
          bladeCount={2000}
          color="#003e0d"
          heightRange={[50, 120]}
          className="z-1000"
          swayPhase={0} 
        />
       <Grass
          bladeCount={2000}
          color="#228B22"
          heightRange={[330, 490]}
          className="z-600"
          swayPhase={Math.PI / 2}
        />
       <Grass
          bladeCount={2000}
          color="#004000"
          heightRange={[280, 370]}
          className="z-700"
          swayPhase={Math.PI}
        />
      <Grass
          bladeCount={2000}
          color="#006600"
          heightRange={[200, 270]}
          className="z-800"
           swayPhase={0} 
        />
      <Grass
          bladeCount={2000}
          color="#004000"
          heightRange={[140, 190]}
          className="z-900"
          swayPhase={Math.PI / 2}
        />
         <Grass
          bladeCount={2000}
          color="#003e0d"
          heightRange={[500, 560]}
          className="z-500"
          swayPhase={Math.PI}
        />
      </div>
    </>
    
  );
}
