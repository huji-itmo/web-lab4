import { useFrame } from "@react-three/fiber";

export function MousePositionLogger() {

    useFrame((state, _delta) => {
        console.log(state.pointer);
    })
    return (
        <></>
    )

}
