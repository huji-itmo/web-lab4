import { Vector2, Vector3 } from "three";
import { CatOnARubberBand } from "./CatOnARubberBand";
import { Physics } from "@react-three/rapier";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/state";
import { addPoint } from "@/state/points/PointesSlice";
import { HitResult } from "../table/columns";
import { useToast } from "@/hooks/use-toast";
import { Target } from "./Target";
import { Ground } from "./Ground";

export function GameScene() {

    const dispatch = useDispatch<AppDispatch>();
    const { toast } = useToast();

    const COOLDOWN_IN_MILLIS = 5000


    function contactCallback(arg: Vector2) {
        const res: HitResult = {
            x: +arg.x.toFixed(4),
            y: +arg.y.toFixed(4),
            r: 1,
            hit: true,
            serverTime: "hui",
            durationInMilliseconds: "pizda"
        };

        console.log(res);
        dispatch(addPoint(res))
        toast({
            title: "Есть попадание!!!",
            description: "x: " + res.x + " y: " + res.y,
        });
    }

    return (
        <Physics>
            <directionalLight intensity={2} position={[0, 0, 2]}></directionalLight>
            <ambientLight intensity={1}></ambientLight>

            <CatOnARubberBand
                cooldownInMillis={COOLDOWN_IN_MILLIS}
                position={new Vector3(0, 2, 0)}
                scale={new Vector3(4, 4, 4)}>
            </CatOnARubberBand>

            <Ground></Ground>

            <Target
                cooldownInMillis={COOLDOWN_IN_MILLIS}
                position={new Vector3(0, 5, 20)}
                size={new Vector2(5, 5)}
                contactCallback={contactCallback}>
            </Target>
        </Physics>
    );
}
