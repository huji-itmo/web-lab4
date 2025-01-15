import { createLazyFileRoute } from '@tanstack/react-router'
import { Canvas } from '@react-three/fiber'
import { DancingCat } from '../components/DancingCat'
import { OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'
import "./Canvas.css";
import { Suspense } from 'react'
import { Loading } from '../components/Loading'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <>
            <Suspense fallback={<Loading></Loading>}>
                <Canvas className="canvas">
                    <directionalLight intensity={2} position={[0, 0, 2]}></directionalLight>
                    <ambientLight intensity={0.5}></ambientLight>
                    <DancingCat swing={0.5} speed={20} position={new Vector3(0, 0, 0)} scale={new Vector3(4, 4, 4)}></DancingCat>
                    <OrbitControls target={[0, 0.5, 0]} />
                </Canvas>
            </Suspense>

        </>
    )
}
