import React, { useRef, useState } from 'react';
import { Physics } from '@react-three/cannon';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Box from './Box';
import * as THREE from 'three';
import Ground from './Ground';
import Char from './Char';

// Camera rig component that rotates once around the scene
const CameraRig = ({ children }: { children: React.ReactNode }) => {
    const groupRef = useRef<THREE.Group>(null);
    const [rotation, setRotation] = useState(0);
    const [isRotating, setIsRotating] = useState(true);
    
    // Animate the camera rotation
    useFrame((_, delta) => {
        if (isRotating && groupRef.current) {
            // rotation speed for camera movement
            const rotationSpeed = 1.5;
            const newRotation = rotation + rotationSpeed * delta;
            
            // Update the group's rotation
            groupRef.current.rotation.y = newRotation;
            setRotation(newRotation);
            
            // Stop after one full revolution
            if (newRotation >= Math.PI * 2) {
                setIsRotating(false);
            }
        }
    });
    
    return <group ref={groupRef}>{children}</group>;
};

const ThreeAdvanced = () => {
    return (
        <Canvas style={{ background: '#8B0000', height: '100vh' }}>
            <color attach="background" args={['#8B0000']} />
            
            {/* Camera rig that rotates around the scene */}
            <CameraRig>
                {/* Main scene camera with good initial position */}
                <PerspectiveCamera 
                    makeDefault 
                    position={[5, 5, 5]} 
                    fov={60}
                />
            </CameraRig>
            
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 2]} intensity={2} />
            
            <Physics>
                <Box />
                <Ground />
                <Char/>
            </Physics>
            
            {/* OrbitControls with target focused on the character position */}
            <OrbitControls 
                enableDamping
                dampingFactor={0.1}
                target={[0, 1, 0]} // Focus on where the character is
                maxPolarAngle={Math.PI / 2} // Don't go below the ground plane
            />
        </Canvas>
    )
}

export default ThreeAdvanced
