import { Vector2, Vector3 } from "three";
import { CatOnARubberBand } from "./CatOnARubberBand";
import { Physics } from "@react-three/rapier";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/state";
import { addPoint } from "@/state/points/PointesSlice";
import { useToast } from "@/hooks/use-toast";
import { Target } from "./Target";
import { Ground } from "./Ground";
import { useState } from "react";

export function GameScene() {

    const dispatch = useDispatch<AppDispatch>();
    const { toast } = useToast();

    const [pointColor, setPointColor] = useState("green");

    const COOLDOWN_IN_MILLIS = 5000



    function contactCallback(arg: Vector2) {
        const dataToSend = {
            x: +arg.x.toFixed(4),
            y: +arg.y.toFixed(4),
            r: 1,
        }

        fetch("/api/points/add", {
            method: "POST",
            headers: {
                "Authorization": `${window.localStorage.getItem("session")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend),
        })
            .then(responce => responce.json())
            .then(data => {
                if (data.error != null) {
                    toast({
                        title: "Error.",
                        description: `${data.error}`,
                    });
                    return;
                }

                toast({
                    title: "HIT!!!",
                    description: "x: " + data.x + " y: " + data.y + " inside shape: " + data.hit,
                });

                setPointColor(data.hit ? "green" : "red")

                console.log(data);
                dispatch(addPoint(data))
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
                contactCallback={contactCallback}
                pointColor={pointColor}>
            </Target>
        </Physics>
    );
}
