import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useSphere } from '@react-three/cannon';

interface CharacterProps {
  position?: [number, number, number];
}

const Char = ({ position = [0, 0, 0] }: CharacterProps) => {
  const gltf = useLoader(GLTFLoader, '/models/gojo.glb');

  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [...position],
    args: [0.1],
    linearDamping: 0.5, 
    fixedRotation: true,
    type: 'Dynamic',
  }));

  const direction = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'w') direction.current.forward = true;
      if (e.key === 's') direction.current.backward = true;
      if (e.key === 'a') direction.current.left = true;
      if (e.key === 'd') direction.current.right = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'w') direction.current.forward = false;
      if (e.key === 's') direction.current.backward = false;
      if (e.key === 'a') direction.current.left = false;
      if (e.key === 'd') direction.current.right = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  useFrame(() => {
    const moveSpeed = 5.5;
    const velocity = new THREE.Vector3();

    if (direction.current.forward) velocity.z -= moveSpeed;
    if (direction.current.backward) velocity.z += moveSpeed;
    if (direction.current.left) velocity.x -= moveSpeed;
    if (direction.current.right) velocity.x += moveSpeed;

    api.velocity.set(velocity.x, 0, velocity.z);
  });

  return (
    <group ref={ref} dispose={null}>
      <primitive object={gltf.scene} scale={0.8} />
    </group>
  );
};

export default Char;


