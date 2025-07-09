"use client";
import Grass from "../components/grass";
import Dandelions from "../components/dandelions";
import TextFromDandelions from "../components/textFromDandelions";

export default function Dashboard() {
  return (
    <>
    <div className="relative w-screen h-screen bg-green-400 overflow-hidden">
        <TextFromDandelions/>
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
