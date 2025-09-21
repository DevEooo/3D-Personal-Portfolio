import { useGLTF } from '@react-three/drei'

export function Asteroids(props) {
  const { nodes, materials } = useGLTF('/assets/models/optimized_asteroids.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes['Asteroid_no_1_Material_#3_0'].geometry} material={materials.Material_3} />
      <mesh geometry={nodes['Asteroid_no_10_Material_#3_0'].geometry} material={materials.Material_3} />
      <mesh geometry={nodes['Asteroid_no_2_Material_#3_0'].geometry} material={materials.Material_3} />
      <mesh geometry={nodes['Asteroid_no_3_Material_#3_0'].geometry} material={materials.Material_3} />
      <mesh geometry={nodes['Asteroid_no_4_Material_#3_0'].geometry} material={materials.Material_3} />
      <mesh geometry={nodes['Asteroid_no_5_Material_#3_0'].geometry} material={materials.Material_3} />
      <mesh geometry={nodes['Asteroid_no_6_Material_#3_0'].geometry} material={materials.Material_3} />
      <mesh geometry={nodes['Asteroid_no_7_Material_#3_0'].geometry} material={materials.Material_3} />
      <mesh geometry={nodes['Asteroid_no_8_Material_#3_0'].geometry} material={materials.Material_3} />
      <mesh geometry={nodes['Asteroid_no_9_Material_#3_0'].geometry} material={materials.Material_3} />
    </group>
  )
}

useGLTF.preload('/assets/models/optimized_asteroids.glb')
