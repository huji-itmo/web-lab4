import React, { useEffect, useRef, useState } from "react";
import { Box3, Camera, Mesh, Vector2, Vector3 } from "three";
import { OrbitControls, useGLTF } from '@react-three/drei';
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { OrbitControls as OrbitControlsType, RigidBody } from 'three-stdlib'; // Import the type

export function CatOnARubberBand({ position, scale }: { position: Vector3, scale: Vector3 }) {
    const { scene } = useGLTF("/cat_model.glb");

    const [isHovered, setIsHovered] = useState(false);

    const [isHoldingMouseOn, setIsHoldingMouseOn] = useState(false);
    const [clickedMousePosition, setClickedMousePosition] = useState(new Vector2(0, 0));
    const [defaultPos, setDefaultPos] = useState(new Vector3(position.x, position.y, position.z));

    useEffect(() => {
        if (catRef.current) {
          // Compute the bounding box of the model
          const box = new Box3().setFromObject(catRef.current);

          // Calculate the center of the bounding box
          const center = new Vector3();
          box.getCenter(center);

          // Adjust the position of the model to center it
          catRef.current.position.sub(center);
        }
      }, [scene]);

    const catRef = useRef<Mesh>(null);
    const orbitControlsRef = useRef<OrbitControlsType>(null);


    function onMouseKeyUp(event: MouseEvent) {
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

    useFrame((state, delta) => {
        if (!isHoldingMouseOn || catRef.current == null || orbitControlsRef.current == null) {
            return;
        }

        // let yaw = state.camera.rotation.x;
        // let multiplier = {
        //     x: Math.sin(yaw),
        //     y: -Math.cos(yaw),
        // }

        let pointerOffset = new Vector2(state.pointer.x - clickedMousePosition.x, state.pointer.y - clickedMousePosition.y)

        // console.log(yaw)

        // catRef.current.position.x = position.x
        // catRef.current.position.z = position.y
        catRef.current.rotation.y = pointerOffset.x
        catRef.current.rotation.x = pointerOffset.y
    })



    return (
        <>
            <OrbitControls ref={orbitControlsRef} target={[0, 0.5, 0]} />
            <group position={position}>
                <mesh
                    onPointerDown={onMouseKeyDown}

                    ref={catRef}
                    scale={scale}
                >
                    <primitive object={scene} />
                </mesh>
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
