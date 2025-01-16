import { useEffect, useRef, useState } from "react";
import { Vector2, Vector3 } from "three";
import { OrbitControls } from '@react-three/drei';
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { OrbitControls as OrbitControlsType } from 'three-stdlib'; // Import the type
import { CatMesh } from "../CatMesh";
import { CapsuleCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";

type Rotation = { x: number, y: number, z: number, w: number };

function eulerToQuaternion({ x: roll, y: pitch, z: yaw }: Vector3): Rotation {
    const qx = Math.sin(roll / 2) * Math.cos(pitch / 2) * Math.cos(yaw / 2) - Math.cos(roll / 2) * Math.sin(pitch / 2) * Math.sin(yaw / 2)
    const qy = Math.cos(roll / 2) * Math.sin(pitch / 2) * Math.cos(yaw / 2) + Math.sin(roll / 2) * Math.cos(pitch / 2) * Math.sin(yaw / 2)
    const qz = Math.cos(roll / 2) * Math.cos(pitch / 2) * Math.sin(yaw / 2) - Math.sin(roll / 2) * Math.sin(pitch / 2) * Math.cos(yaw / 2)
    const qw = Math.cos(roll / 2) * Math.cos(pitch / 2) * Math.cos(yaw / 2) + Math.sin(roll / 2) * Math.sin(pitch / 2) * Math.sin(yaw / 2)

    return { x: qx, y: qy, z: qz, w: qw, };
}

function quaternionToVector(rotation: Rotation): Vector3 {
    return new Vector3(
        rotation.y * Math.sqrt(3),
        -rotation.x * Math.sqrt(3),
        rotation.w,
    );
}

export function CatOnARubberBand({ position, scale, cooldownInMillis }: { position?: Vector3, scale?: Vector3, cooldownInMillis: number }) {
    // const [_isHovered, _setIsHovered] = useState(false);
    const [isHoldingMouseOn, setIsHoldingMouseOn] = useState(false);
    const [clickedMousePosition, setClickedMousePosition] = useState(new Vector2(0, 0));

    // const catRef = useRef<Group>(null);
    const orbitControlsRef = useRef<OrbitControlsType>(null);
    const rigidBodyRef = useRef<RapierRigidBody>(null);

    function onMouseKeyUp(_event: MouseEvent) {
        if (isHoldingMouseOn) {
            shoot()
        }
        setIsHoldingMouseOn(false);

        if (orbitControlsRef.current != null && orbitControlsRef.current.enabled == false) {
            orbitControlsRef.current.enabled = true;
        }
    }

    function onMouseKeyDown(event: ThreeEvent<PointerEvent>) {
        setIsHoldingMouseOn(true);
        setClickedMousePosition(new Vector2(event.pointer.x, event.pointer.y));

        if (orbitControlsRef.current != null && orbitControlsRef.current.enabled == true) {
            orbitControlsRef.current.enabled = false;
        }
    }

    useEffect(() => {
        document.body.addEventListener("mouseup", onMouseKeyUp);
        return () => {
            document.body.removeEventListener("mouseup", onMouseKeyUp);
        }
    })

    useFrame((state, _delta) => {
        if (!isHoldingMouseOn || rigidBodyRef.current == null || orbitControlsRef.current == null) {
            return;
        }
        const pointerOffset = new Vector3(
            state.pointer.y - clickedMousePosition.y,
            state.pointer.x - clickedMousePosition.x,
            0
        );
        rotateByPointer(pointerOffset);
        moveByRotation();
    })

    function rotateByPointer(pointerOffset: Vector3) {
        if (rigidBodyRef.current == null) { return }

        const rotation = eulerToQuaternion(pointerOffset)

        rigidBodyRef.current.setRotation(rotation, false)
    }

    function moveByRotation() {
        if (rigidBodyRef.current == null) { return }

        const direction = quaternionToVector(rigidBodyRef.current.rotation());

        direction.multiplyScalar(1.5);

        const currentPosition = new Vector3(0, 0, 0);
        if (position != null) {
            currentPosition.copy(position)
        }
        currentPosition.sub(direction);

        rigidBodyRef.current.setTranslation(currentPosition, false);
    }

    function shoot() {
        if (rigidBodyRef.current == null) {
            return
        }

        rigidBodyRef.current.setBodyType(0/*dynamic*/, true)

        const speed = 50; // Speed of the projectile

        const direction = quaternionToVector(rigidBodyRef.current.rotation());
        direction.multiplyScalar(speed);

        rigidBodyRef.current.applyImpulse(direction, true);

        setTimeout(resetPositionAndRotation, cooldownInMillis);
    };

    function resetPositionAndRotation() {
        if (rigidBodyRef.current == null) {
            return;
        }

        rigidBodyRef.current.setBodyType(1/*fixed*/, true)

        const startPosition = new Vector3(0, 0, 0);
        if (position != null) {
            startPosition.copy(position)
        }
        rigidBodyRef.current.setTranslation(startPosition, true);

        rigidBodyRef.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
    }

    return (
        <>
            <OrbitControls ref={orbitControlsRef} target={position} />
            <RigidBody position={position} type="fixed" ref={rigidBodyRef} colliders={false}>
                <group>
                    <CatMesh
                        scale={scale}
                        onPointerDown={onMouseKeyDown} >
                    </CatMesh>
                    <CapsuleCollider position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]} args={[0.5, 0.6]}></CapsuleCollider>
                </group>
            </RigidBody >
        </>

    );
}
