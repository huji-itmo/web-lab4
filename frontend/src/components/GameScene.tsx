import { Vector2, Vector3 } from "three";
import { CatOnARubberBand } from "./CatOnARubberBand";
import { Physics, RigidBody } from "@react-three/rapier";
import { Target } from "./Target";

export function GameScene() {
    return (
        <Physics debug>
            <directionalLight intensity={2} position={[0, 0, 2]}></directionalLight>
            <ambientLight intensity={1}></ambientLight>
            <CatOnARubberBand position={new Vector3(0, 2, 0)} scale={new Vector3(4, 4, 4)}>
            </CatOnARubberBand>

            {/* Ground */}
            <RigidBody type="fixed" restitution={0.5}>
                <mesh position={[0, -1, 0]}>
                    <boxGeometry args={[100, 0.5, 100]} />
                    <meshStandardMaterial color="grey" />
                </mesh>
            </RigidBody>
            <Target
                position={new Vector3(0, 5, 20)}
                size={new Vector2(5, 5)}
                contactCallback={(arg) => { console.log(arg); }}>

            </Target>
        </Physics>
    );
}
