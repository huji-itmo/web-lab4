import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";
import { Cat } from "./components/Cat";
import { OrbitControls } from "@react-three/drei";

function App() {
    return (
        <>
            <Canvas className="canvas">
                <directionalLight intensity={2} position={[0, 0, 2]}></directionalLight>
                <ambientLight intensity={0.5}></ambientLight>
                <Cat swing={0.5} speed={20} position={new Vector3(0, 0, 0)} scale={new Vector3(4, 4, 4)}></Cat>
                <OrbitControls target={[0, 0.5, 0]} />
            </Canvas>
        </>
    );
}

export default App;
