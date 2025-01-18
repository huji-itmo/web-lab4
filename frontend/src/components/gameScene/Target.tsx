import { useLoader } from "@react-three/fiber";
import { CollisionEnterPayload, RigidBody } from "@react-three/rapier";
import { useState } from "react";
import { TextureLoader, Vector2, Vector3 } from "three";

type TargetArgs = {
    position: Vector3,
    size: Vector2,
    contactCallback?: (point: Vector2) => void,
    cooldownInMillis: number,
}

export function Target({ position, size, contactCallback, cooldownInMillis }: TargetArgs) {

    const texture = useLoader(TextureLoader, '/target.png');

    const [lastHitPoint, setLastHitPoint] = useState<Vector3 | null>(null);
    const [inCooldown, setCooldown] = useState(false);

    const handleCollision = (event: CollisionEnterPayload) => {
        if (inCooldown) {
            return;
        }

        const { manifold } = event;

        const contactPoint = manifold.solverContactPoint(0);

        setCooldown(true);

        setTimeout(() => {
            setCooldown(false)
        }, cooldownInMillis);

        setLastHitPoint(new Vector3(contactPoint.x, contactPoint.y, contactPoint.z));

        if (contactCallback == null) {
            return;
        }

        contactPoint.x = contactPoint.x - position.x;
        contactPoint.y = contactPoint.y - position.y;
        contactPoint.z = contactPoint.z - position.z;

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
