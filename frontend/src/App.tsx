import "./App.css";
import { Canvas } from "@react-three/fiber";

const Box = ({ position }) => {
    return (
        <mesh position={position}>
            <boxGeometry args={[0.75, 0.75, 0.75]}></boxGeometry>
            <meshStandardMaterial color="orange"></meshStandardMaterial>
        </mesh>
    );
};

function App() {
    return (
        <>
            <Canvas>
                <directionalLight position={[0, 0, 2]}></directionalLight>
                <ambientLight intensity={0.1}></ambientLight>

                <group position={[2,0,0]}>
                    <Box position={[-1, -1, 1]} />
                    <Box position={[1, -1, 1]} />
                    <Box position={[1, 1, 1]} />
                    <Box position={[-1, 1, 1]} />
                </group>
            </Canvas>
        </>
    );
}

export default App;
