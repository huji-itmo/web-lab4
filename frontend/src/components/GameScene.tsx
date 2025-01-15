import { Vector3 } from "three";
import { CatOnARubberBand } from "./CatOnARubberBand";
import { Physics, RigidBody } from "@react-three/rapier";
import { Plane } from "@react-three/drei";

export function GameScene() {
    return (
        <Physics>
            <directionalLight intensity={2} position={[0, 0, 2]}></directionalLight>
            <ambientLight intensity={1}></ambientLight>
            <CatOnARubberBand position={new Vector3(0, 2, 0)} scale={new Vector3(4, 4, 4)}>
            </CatOnARubberBand>

            {/* Ground */}
            <RigidBody type="fixed" restitution={0.5}>
                <mesh position={[0, -1, 0]}>
                    <boxGeometry args={[100, 0.5, 100]} />
                    <meshStandardMaterial color="white" />
                </mesh>
            </RigidBody>

            <mesh rotation={[0, Math.PI, 0]} position={[0, 5, 20]}>
                <planeGeometry args={[5, 5]} /> {/* Width and height of the plane */}
                <meshStandardMaterial color="green" /> {/* Material for the plane */}
            </mesh>
        </Physics>
    );
}
