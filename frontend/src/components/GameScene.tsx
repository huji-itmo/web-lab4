import { Vector2, Vector3 } from "three";
import { CatOnARubberBand } from "./CatOnARubberBand";
import { Physics, RigidBody } from "@react-three/rapier";
import { Target } from "./Target";
import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "@/state/state";
import { addPoint } from "@/state/points/PointesSlice";
import { HitResult } from "./table/columns";

export function GameScene() {

    const dispatch = useDispatch<AppDispatch>();

    function contactCallback(arg: Vector2) {


        let res: HitResult = {
            x: arg.x,
            y: arg.y,
            r: 1,
            hit: true,
            serverTime: "hui",
            durationInMilliseconds: "pizda"
        }
        console.log(res);
        dispatch(addPoint(res))
    }

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
                    <meshStandardMaterial color="grey" />
                </mesh>
            </RigidBody>
            <Target
                position={new Vector3(0, 5, 20)}
                size={new Vector2(5, 5)}
                contactCallback={contactCallback}>
            </Target>
        </Physics>

    );
}
