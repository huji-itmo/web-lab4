import { useFrame } from "@react-three/fiber";

export function MousePositionLogger() {

    useFrame((state, delta) => {
        console.log(state.pointer);
    })
    return (
        <></>
    )

}
