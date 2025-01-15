import { useGLTF } from "@react-three/drei";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { CatMesh } from "./CatMesh";
import { Group } from "three";

interface ShooterProps {
    angleX: number;
    angleY: number;
}

export function RigidBodyCatShooter({ angleX, angleY }: ShooterProps) {
    const rigidBodyRef = useRef<RapierRigidBody>(null);

    const catRef = useRef<Group>(null);

    document.addEventListener('keydown', function (event) {
        // Check if the pressed key is the spacebar
        if (event.code === 'Space') {
            // Your code to handle the spacebar press
            console.log('Spacebar was pressed!');
        }

        shoot()
    });


    const shoot = () => {
        if (rigidBodyRef.current == null) {
            return
        }

        rigidBodyRef.current.setBodyType(0/*dynamic*/, true)

        const speed = 10; // Speed of the projectile
        const direction = [
            Math.sin(angleY) * Math.cos(angleX),
            Math.cos(angleY),
            Math.sin(angleY) * Math.sin(angleX),
        ];

        rigidBodyRef.current.setLinvel(
            { x: direction[0] * speed, y: direction[1] * speed, z: direction[2] * speed },
            true
        );
        rigidBodyRef.current.setTranslation({ x: 0, y: 0, z: 0 }, true); // Reset position to origin
    };


    // return (
    // )

}
