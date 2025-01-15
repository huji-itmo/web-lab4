import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Group, Vector3 } from "three";
import { CatMesh } from "./CatMesh";


export function DancingCat({ position, scale, speed, swing }: { position: Vector3, scale: Vector3, speed: number, swing: number }) {
    const [isHovered, setIsHovered] = useState(false);


    const ref = useRef<Group>(null);


    useFrame((state, delta) => {
        if (ref.current == null) {
            return;
        }

        if (isHovered) {
            ref.current.position.y = position.y + swing * (0.5 + 0.5 * Math.sin(state.clock.elapsedTime * speed));
            ref.current.rotation.y += delta * speed
        } else {
            ref.current.position.y = position.y
            ref.current.rotation.y = 0
        }
    });

    return (
        <group>
            <CatMesh ref={ref} position={position} scale={scale}></CatMesh>
            <mesh
                scale={scale}
                position={position}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
            >
                <boxGeometry args={[0.4, 0.4, 0.4]}></boxGeometry>
                <meshStandardMaterial
                    visible={false}
                    wireframe
                    color={isHovered ? "orange" : "lightblue"}
                >
                </meshStandardMaterial>
            </mesh>
        </group >

    );
}
