import { Loading } from '@/components/Loading'
import { AsciiRenderer, Center, OrbitControls, Text3D } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import "./Canvas.css";


export const Route = createLazyFileRoute('/about')({
    component: About,
})

function About() {



    return (
        <Suspense fallback={<Loading></Loading>}>
            <Canvas className="canvas">
                <OrbitControls
                    // enabled={false}
                    autoRotate={true}
                    autoRotateSpeed={5}></OrbitControls>
                <AsciiRenderer

                    fgColor="lightblue"
                    bgColor={"black"}
                    /** Colorize output (very expensive!), default: false */
                    color={false}
                    /** Level of detail, default: 0.15 */
                    resolution={0.15}>
                </AsciiRenderer>
                <color attach="background" args={['black']} />
                <spotLight intensity={0.1} position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight intensity={0.1} position={[-10, -10, -10]} />

                <Center>
                    <Text3D
                        font={"./InterBold.json"}
                        curveSegments={32}
                        bevelSize={0.04}
                        bevelThickness={0.001}
                        height={0.5}
                        lineHeight={0.5}
                        letterSpacing={-0.06}
                        size={1.5}>
                        {`Лаба 4`}
                    </Text3D>
                    <meshBasicMaterial color={"grey"} />
                </Center>

            </Canvas>
        </Suspense >
    )
}
