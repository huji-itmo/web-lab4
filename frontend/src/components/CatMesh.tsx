import { Center, useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { forwardRef } from "react";
import { Group, Vector3 } from "three";

interface CatModelProps {
    onPointerDown?: (event: ThreeEvent<PointerEvent>) => void;
    position?: Vector3,
    scale?: Vector3
}

export const CatMesh = forwardRef<Group, CatModelProps>((props, ref) => {
    const { scene } = useGLTF("/cat_model.glb");

    const { position, scale, onPointerDown } = props;

    return (
        <Center>
            <group position={position} ref={ref} >
                <mesh position={position}
                    onPointerDown={onPointerDown}
                    scale={scale}
                >
                    <primitive object={scene} />
                </mesh>
            </group >
        </Center>
    )
});
