import { usePlane } from '@react-three/cannon';
import * as THREE from 'three';
import { useEffect, useState, useRef } from 'react';

const Ground = () => {
  const [ref] = usePlane(() => ({
    mass: 0, 
    position: [0, 0, 0], 
    rotation: [-Math.PI / 2, 0, 0] 
  }));
  
  const [dimensions, setDimensions] = useState({ width: 5, height: 5 });
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/texture/Gojo_Prison-Realm-1.jpg', (loadedTexture) => {
      const image = loadedTexture.image;
      
      if (image) {
        const aspectRatio = image.width / image.height;
        const width = 10; 
        const height = width / aspectRatio;
        
        setDimensions({ width, height });
      }
    });
    
    if (materialRef.current) {
      materialRef.current.map = texture;
      materialRef.current.needsUpdate = true;
    }
    
    return () => {
      texture.dispose();
    };
  }, []);
  
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} >
      <planeGeometry args={[dimensions.width, dimensions.height]} />
      <meshStandardMaterial ref={materialRef} />
    </mesh>
  );
}

export default Ground;
