import { useGLTF } from '@react-three/drei'

export function BlackHole(props) {
  const { nodes, materials } = useGLTF('/assets/models/optimized_blackhole.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.black_hole_ring_ring_0002.geometry} material={materials['ring.002']} />
      <mesh geometry={nodes.black_hole_ring_ring_0002_1.geometry} material={materials['black_hole_blackoutside.002']} />
      <mesh geometry={nodes.black_hole_ring_ring_0002_2.geometry} material={materials['black_hole_light3.002']} />
      <mesh geometry={nodes.black_hole_ring_ring_0002_3.geometry} material={materials['black_hole_light2.002']} />
      <mesh geometry={nodes.black_hole_ring_ring_0002_4.geometry} material={materials['black_hole_light1.002']} />
      <mesh geometry={nodes.black_hole_ring_ring_0002_5.geometry} material={materials['black_hole_distortion.002']} />
      <mesh geometry={nodes.black_hole_ring_ring_0002_6.geometry} material={materials['black_hole_center.002']} />
      <mesh geometry={nodes.black_hole_ring_ring_0002_7.geometry} material={materials['ring2.002']} />
      <mesh geometry={nodes.black_hole_ring_ring_0002_8.geometry} material={materials['Planet.002']} />
    </group>
  )
}

useGLTF.preload('/assets/models/optimized_blackhole.glb')
