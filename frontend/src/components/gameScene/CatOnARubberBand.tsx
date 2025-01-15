import { useEffect, useRef, useState } from "react";
import { Euler, Group, Vector2, Vector3 } from "three";
import { OrbitControls } from '@react-three/drei';
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { OrbitControls as OrbitControlsType } from 'three-stdlib'; // Import the type
import { CatMesh } from "../CatMesh";
import { CapsuleCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";

export function CatOnARubberBand({ position, scale }: { position: Vector3, scale: Vector3 }) {
    // const [_isHovered, _setIsHovered] = useState(false);

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
            if (orbitControlsRef.current.enabled == false)
                orbitControlsRef.current.enabled = true;
        }
    }

    function onMouseKeyDown(event: ThreeEvent<PointerEvent>) {
        setIsHoldingMouseOn(true);
        if (orbitControlsRef.current != null) {
            if (orbitControlsRef.current.enabled == true)
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

        const direction = new Vector3(
            Math.sin(catRef.current.rotation.y) * Math.cos(catRef.current.rotation.x),
            -Math.sin(catRef.current.rotation.x),
            Math.cos(catRef.current.rotation.x) * Math.cos(catRef.current.rotation.y),
        );

        catRef.current.position.x = position.x - direction.x
        catRef.current.position.y = position.y - direction.y - 2
        catRef.current.position.z = position.z - direction.z
    })

    function shoot(angle: Euler) {
        if (rigidBodyRef.current == null) {
            return
        }

        rigidBodyRef.current.setBodyType(0/*dynamic*/, true)

        const speed = 25; // Speed of the projectile

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

        setTimeout(() => {
            if (rigidBodyRef.current == null || catRef.current == null) {
                return;
            }

            rigidBodyRef.current.setBodyType(1/*fixed*/, true)
            rigidBodyRef.current.setTranslation({ x: position.x, y: position.y - 1.1, z: position.z }, false);

            rigidBodyRef.current.setRotation({ x: 0, y: 0, z: 0, w: 0 }, false);
            rigidBodyRef.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, false);
            catRef.current.setRotationFromEuler(new Euler(0, 0, 0))

        }, 5000);
    };

    return (
        <>
            <OrbitControls ref={orbitControlsRef} target={position} />
            <RigidBody type="fixed" ref={rigidBodyRef} colliders={false}>
                <group position={position}>
                    <CatMesh
                        ref={catRef}
                        scale={scale}
                        onPointerDown={onMouseKeyDown} >
                    </CatMesh>
                    <CapsuleCollider rotation={[Math.PI / 2, 0, 0]} args={[0.5, 0.5]}></CapsuleCollider>

                </group>
            </RigidBody >
        </>

    );
}
