import { useEffect, useRef, useState } from "react";
import { Box3, Group, Mesh, Vector2, Vector3 } from "three";
import { OrbitControls } from '@react-three/drei';
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { OrbitControls as OrbitControlsType } from 'three-stdlib'; // Import the type
import { CatMesh } from "./CatMesh";

export function CatOnARubberBand({ position, scale }: { position: Vector3, scale: Vector3 }) {
    const [isHovered, setIsHovered] = useState(false);

    const [isHoldingMouseOn, setIsHoldingMouseOn] = useState(false);
    const [clickedMousePosition, setClickedMousePosition] = useState(new Vector2(0, 0));
    // const [defaultPos, setDefaultPos] = useState(new Vector3(position.x, position.y, position.z));

    const catRef = useRef<Group>(null);
    const orbitControlsRef = useRef<OrbitControlsType>(null);


    function onMouseKeyUp(_event: MouseEvent) {
        console.log("key up")
        if (isHoldingMouseOn && catRef.current != null) {
            console.log("pew")
        }

        setIsHoldingMouseOn(false);
        if (orbitControlsRef.current != null) {
            orbitControlsRef.current.enabled = true;
        }
    }

    function onMouseKeyDown(event: ThreeEvent<PointerEvent>) {
        setIsHoldingMouseOn(true);
        if (orbitControlsRef.current != null) {
            orbitControlsRef.current.enabled = false;
            setClickedMousePosition(new Vector2(event.pointer.x, event.pointer.y));
        }
    }

    useEffect(() => {
        document.body.addEventListener("mouseup", onMouseKeyUp);
        return () => {
            document.body.removeEventListener("mouseup", onMouseKeyUp);
        }
    })

    useFrame((state, _delta) => {
        if (!isHoldingMouseOn || catRef.current == null || orbitControlsRef.current == null) {
            return;
        }

        const pointerOffset = new Vector2(state.pointer.x - clickedMousePosition.x, state.pointer.y - clickedMousePosition.y)

        catRef.current.rotation.y = pointerOffset.x
        catRef.current.rotation.x = pointerOffset.y
    })

    return (
        <>
            <OrbitControls ref={orbitControlsRef} target={[0, 0.5, 0]} />
            <group position={position}>
                <CatMesh
                    ref={catRef}
                    position={position}
                    scale={scale}
                    onPointerDown={onMouseKeyDown} >
                </CatMesh>
                <mesh
                    scale={scale}
                    position={new Vector3(0, position.y + 0.2 * scale.y, 0)}
                    onPointerEnter={() => { setIsHovered(true); }}
                    onPointerLeave={() => setIsHovered(false)}
                >
                    <boxGeometry args={[100, 100, 100]}></boxGeometry>
                    <meshStandardMaterial
                        wireframe
                        color={isHovered ? "orange" : "lightblue"}
                    >
                    </meshStandardMaterial>
                </mesh>
            </group>
        </>

    );
}
