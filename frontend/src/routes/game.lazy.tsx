import { Canvas } from '@react-three/fiber'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { Loading } from '../components/Loading'
import "./Canvas.css";
import { GameScene } from '../components/GameScene'
import { Grid } from '@react-three/drei';


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
                <GameScene></GameScene>
                <Grid args={[10.5, 10.5]} {...gridConfig}></Grid>
            </Canvas>
        </Suspense>
    );
}
