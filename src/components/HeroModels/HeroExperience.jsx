import { Canvas } from "@react-three/fiber";
import { Suspense } from "react"
import { OrbitControls } from "@react-three/drei"
import { SnowParticles } from "./SnowParticles.jsx";

const HeroExperience = () => {
  return (
     <div  style={{
    width: "100vw",
    height: "100vh",
    position: "fixed", // <- fix it to the viewport
    top: 0,
    left: 0,
    zIndex: 0, // <- behind everything
    pointerEvents: "none", // <- make sure it doesn’t block clicks
  }}>
      <Canvas>
  
  <Suspense fallback={null}>
    <SnowParticles count={400} />
  </Suspense>
</Canvas>

    </div>
  );
};

export default HeroExperience;
