import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, Vector3 } from "three";

const Box = ({ position }: { position: Vector3 }) => {

    const ref = useRef<Mesh>(null);

    const [isHovered, setIsHovered] = useState(false);



    useFrame((_state, delta) => {
        if (ref.current != null) {
            ref.current.rotation.x += delta;
            ref.current.rotation.y += delta;
        }
    })

    return (

        <mesh
            position={position}
            ref={ref}
            onPointerEnter={(event) => { event.stopPropagation(); console.log("test"); setIsHovered(true) }}
            onPointerLeave={() => setIsHovered(false)}
            onPointerUp={() => {
                if (ref.current != null) {
                    ref.current.visible = false
                }
            }}
        >
            <boxGeometry args={[0.75, 0.75, 0.75]}></boxGeometry>
            <meshStandardMaterial color={isHovered ? "orange" : "lightblue"}></meshStandardMaterial>
        </mesh>
    );
};
