"use client";
import Grass from "../components/grass";

export default function Dashboard() {
  return (
    <>
    <div className="relative w-screen h-screen bg-green-400 overflow-hidden">
        <Grass
          bladeCount={2000}
          color="#003e0d"
          heightRange={[50, 120]}
          opacity={1}
          strokeWidth={0.8}
          className="z-1000"
        />
       <Grass
          bladeCount={4000}
          color="#228B22"
          heightRange={[330, 490]}
          opacity={0.9}
          strokeWidth={0.8}
          className="z-600"
        />
       <Grass
          bladeCount={2000}
          color="#004000"
          heightRange={[280, 370]}
          opacity={0.9}
          strokeWidth={0.6}
          className="z-700"
        />
      <Grass
          bladeCount={3000}
          color="#006600"
          heightRange={[200, 270]}
          opacity={0.9}
          strokeWidth={1}
          className="z-800"
        />
      <Grass
          bladeCount={3000}
          color="#004000"
          heightRange={[140, 190]}
          opacity={0.9}
          strokeWidth={0.6}
          className="z-900"
        />
         <Grass
          bladeCount={3000}
          color="#003e0d"
          heightRange={[500, 560]}
          opacity={0.8}
          strokeWidth={0.4}
          className="z-500"
        />
      </div>
    </>
    
  );
}
