import { RigidBody } from "@react-three/rapier";

export function Ground() {
    return (
        <RigidBody type="fixed" restitution={0.75}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <planeGeometry args={[250, 250]} />
                <meshStandardMaterial color="grey" />
            </mesh>
        </RigidBody>
    );
}
