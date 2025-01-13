import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, Vector3 } from "three";
import { useGLTF } from '@react-three/drei';


export function Cat({ position, scale, speed, swing }: { position: Vector3, scale: Vector3, speed: number, swing: number }) {
    const { scene } = useGLTF("/cat_model.glb");

    const [isHovered, setIsHovered] = useState(false);


    const ref = useRef<Mesh>(null);


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
        <group position={position}>
            <mesh
                ref={ref}
                scale={scale}
            >
                <primitive object={scene} />
            </mesh>
            <mesh
                scale={scale}
                position={new Vector3(0, position.y + 0.125 * scale.y, 0)}
                onPointerEnter={(event) => { event.stopPropagation(); setIsHovered(true); }}
                onPointerLeave={() => setIsHovered(false)}
            >
                <boxGeometry args={[0.75, 0.75, 0.75]}></boxGeometry>
                <meshStandardMaterial
                    visible={false}
                    wireframe
                    color={isHovered ? "orange" : "lightblue"}
                >
                </meshStandardMaterial>
            </mesh>
        </group>

    );
}
