import { useLoader } from "@react-three/fiber";
import { CollisionEnterPayload, RigidBody } from "@react-three/rapier";
import { useState } from "react";
import { TextureLoader, Vector2, Vector3 } from "three";

export function Target({ position, size, contactCallback }: { position: Vector3, size: Vector2, contactCallback?: (point: Vector2) => void }) {

    const texture = useLoader(TextureLoader, '/target.png');

    const [lastHitPoint, setLastHitPoint] = useState<Vector3 | null>(null);


    const handleCollision = (event: CollisionEnterPayload) => {
        const { manifold } = event;

        const contactPoint = manifold.solverContactPoint(0);
        setLastHitPoint(new Vector3(contactPoint.x, contactPoint.y, contactPoint.z));

        contactPoint.x = contactPoint.x - position.x;
        contactPoint.y = contactPoint.y - position.y;
        contactPoint.z = contactPoint.z - position.z;

        if (contactCallback != null)
            contactCallback(new Vector2(contactPoint.x / size.x, contactPoint.y / size.y));
    }


    return (
        <>
            <RigidBody onCollisionEnter={handleCollision}>
                <mesh rotation={[0, Math.PI, 0]} position={position}>
                    <planeGeometry args={[size.x, size.y]} />
                    <meshStandardMaterial map={texture} />
                </mesh>
            </RigidBody>
            <mesh
                position={lastHitPoint == null ? new Vector3(0, 0, 0) : lastHitPoint}
                visible={lastHitPoint != null}>
                <sphereGeometry args={[0.5]}></sphereGeometry>
                <meshStandardMaterial color={"green"} />
            </mesh>
        </>

    );
}
