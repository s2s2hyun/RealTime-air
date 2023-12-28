import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

export default function Mask({ props }) {
  const { nodes, materials } = useGLTF("/3dmodel/3dmask.gltf");

  console.log(nodes, "현재 뭐가 나오고 있지 ? ");
  console.log(materials, " materials현재 뭐가 나오고 있지 ? ");

  return (
    <group
      {...props}
      dispose={null}
      scale={[0.1, 0.1, 0.1]}
      position={[0, 0, -5]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mask_LP_RetopoFlow000.geometry}
        material={nodes.mask_LP_RetopoFlow000.material}
      />
    </group>
  );
}
