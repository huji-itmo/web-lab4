import { Grid } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { Loading } from '../components/Loading'
import { Vector3 } from 'three'
import "./Canvas.css";
import { CatOnARubberBand } from '../components/CatOnARubberBand'


export const Route = createLazyFileRoute('/game')({
    component: RouteComponent,
})

function RouteComponent() {

    const gridConfig = {
        cellSize: 0.6,
        cellThickness: 1,
        cellColor: '#6f6f6f',
        sectionSize: 3.3,
        sectionThickness: 1.5,
        sectionColor: '#9d4b4b',
        fadeDistance: 25,
        fadeStrength: 1,
        followCamera: false,
        infiniteGrid: true,
    };

    return (
        <Suspense fallback={<Loading></Loading>}>
            <Canvas className="canvas">
                {/* <MousePositionLogger></MousePositionLogger> */}
                <directionalLight intensity={2} position={[0, 0, 2]}></directionalLight>
                <ambientLight intensity={0.5}></ambientLight>
                <CatOnARubberBand position={new Vector3(0, 0, 0)} scale={new Vector3(4, 4, 4)}>
                </CatOnARubberBand>
                <Grid args={[10.5, 10.5]} {...gridConfig}></Grid>
            </Canvas>
        </Suspense>
    );
}
