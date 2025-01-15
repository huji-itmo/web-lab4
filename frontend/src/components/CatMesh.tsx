import { useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { forwardRef, useEffect, useState } from "react";
import { Box3, Group, Mesh, Vector3 } from "three";

interface CatModelProps {
    onPointerDown?: (event: ThreeEvent<PointerEvent>) => void;
    position?: Vector3,
    scale?: Vector3
}

export const CatMesh = forwardRef<Group, CatModelProps>((props, ref) => {
    const { scene } = useGLTF("/cat_model.glb");

    const { position, scale, onPointerDown } = props;

    const [subtracted, setSubtracted] = useState(false)

    useEffect(() => {
        if (ref && scene && !subtracted) {
            // Compute the bounding box of the model
            const box = new Box3().setFromObject(scene);

            // Calculate the center of the bounding box
            const center = new Vector3(0, 0, 0);
            box.getCenter(center);

            center.add(new Vector3(0, 0, 0))

            // Adjust the position of the model to center it
            // scene.position.sub(center);
            setSubtracted(true);
        }
    }, []);

    return (

        <group position={position} ref={ref} >
            <mesh position={position}
                onPointerDown={onPointerDown}
                scale={scale}
            >
                <primitive object={scene} />
            </mesh>
        </group >
    )
});
