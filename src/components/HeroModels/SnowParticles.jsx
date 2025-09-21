import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const SnowParticles = ({ count = 1000 }) => {
  const ref = useRef();

  // Generate initial positions
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20; // x
      pos[i * 3 + 1] = Math.random() * 10;     // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
    }
    return pos;
  }, [count]);

  const velocities = useMemo(() => {
    const v = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      v[i] = 0.01 + Math.random() * 0.002; // fall speed
    }
    return v;
  }, [count]);

  useFrame(() => {
    const pos = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= velocities[i];
      if (pos[i * 3 + 1] < -5) {
        pos[i * 3 + 1] = 5 + Math.random() * 2; // reset to top
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={0xffffff}
        size={0.05}
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
};

export default SnowParticles;
