import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

export default function Mask() {
  const { nodes } = useGLTF("/3dmodel/medmask2.gltf");

  const maskMesh = nodes.mask_LP_RetopoFlow000 as THREE.Mesh;

  const nodeGeometry = maskMesh.geometry;

  const materials = maskMesh.material;

  console.log(materials, "material 현재 뭐가 나오고 있지 ? ");

  if (Array.isArray(materials)) {
    materials.forEach((material) => {
      material.side = THREE.DoubleSide;
    });
  } else {
    materials.side = THREE.DoubleSide;
  }

  return (
    <group
      // {...props}
      dispose={null}
      scale={0.75}
      position={[0, 3, -5]}
    >
      <mesh
        visible
        castShadow
        receiveShadow
        geometry={nodeGeometry}
        material={materials}
      />
    </group>
  );
}
