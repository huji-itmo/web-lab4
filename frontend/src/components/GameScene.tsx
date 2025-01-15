import { Vector3 } from "three";
import { CatOnARubberBand } from "./CatOnARubberBand";
import { RigidBodyCatShooter } from "./RigidBodyCatShooter";
import { Physics } from "@react-three/rapier";

export function GameScene() {
    return (
        <Physics>

            <directionalLight intensity={2} position={[0, 0, 2]}></directionalLight>
            <ambientLight intensity={0.5}></ambientLight>
            {/* <CatOnARubberBand position={new Vector3(0, 0, 0)} scale={new Vector3(4, 4, 4)}>
            </CatOnARubberBand> */}
            <RigidBodyCatShooter angleX={0} angleY={Math.PI / 4}></RigidBodyCatShooter>
        </Physics>
    );
}
