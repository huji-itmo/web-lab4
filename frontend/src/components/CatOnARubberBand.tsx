import { useEffect, useRef, useState } from "react";
import { Box3, Euler, Group, Mesh, Vector2, Vector3 } from "three";
import { OrbitControls } from '@react-three/drei';
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { OrbitControls as OrbitControlsType } from 'three-stdlib'; // Import the type
import { CatMesh } from "./CatMesh";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";

export function CatOnARubberBand({ position, scale }: { position: Vector3, scale: Vector3 }) {
    const [isHovered, setIsHovered] = useState(false);

    const [isHoldingMouseOn, setIsHoldingMouseOn] = useState(false);
    const [clickedMousePosition, setClickedMousePosition] = useState(new Vector2(0, 0));

    const catRef = useRef<Group>(null);
    const orbitControlsRef = useRef<OrbitControlsType>(null);
    const rigidBodyRef = useRef<RapierRigidBody>(null);



    function onMouseKeyUp(_event: MouseEvent) {
        console.log("key up")
        if (isHoldingMouseOn && catRef.current != null) {
            console.log("pew")
            shoot(catRef.current.rotation)
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

    function shoot(angle: Euler) {
        if (rigidBodyRef.current == null) {
            return
        }

        rigidBodyRef.current.setBodyType(0/*dynamic*/, true)

        const speed = 250; // Speed of the projectile

        const direction = [
            Math.sin(angle.y) * Math.cos(angle.x),
            -Math.sin(angle.x),
            Math.cos(angle.x) * Math.cos(angle.y),
        ];

        console.log(direction);
        console.log(angle);


        rigidBodyRef.current.applyImpulse(
            { x: direction[0] * speed, y: direction[1] * speed, z: direction[2] * speed },
            true
        );
        // rigidBodyRef.current.setTranslation({ x: 0, y: 0, z: 0 }, true); // Reset position to origin
    };

    return (
        <>
            <OrbitControls ref={orbitControlsRef} target={position} />
            <RigidBody type="fixed" ref={rigidBodyRef} colliders="cuboid">
                <group position={position}>
                    <CatMesh
                        ref={catRef}
                        // position={position}
                        scale={scale}
                        onPointerDown={onMouseKeyDown} >
                    </CatMesh>
                    {/* <mesh
                        scale={scale}
                        // position={}
                        onPointerEnter={() => { setIsHovered(true); }}
                        onPointerLeave={() => setIsHovered(false)}
                    >
                        <boxGeometry args={[0.7, 0.7, 0.7]}></boxGeometry>
                        <meshStandardMaterial
                            wireframe
                            color={isHovered ? "orange" : "lightblue"}
                        >
                        </meshStandardMaterial>
                    </mesh> */}
                </group>
            </RigidBody >
        </>

    );
}
