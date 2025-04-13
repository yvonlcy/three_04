import { useBox } from '@react-three/cannon';
import * as THREE from 'three';
import { useEffect, useState } from 'react';

const Box = () => {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0] }));
  const [materials, setMaterials] = useState<THREE.MeshStandardMaterial[] | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();

    const paths = [
      '/texture/prisonRealm/Pasted image.png',     // +x
      '/texture/prisonRealm/Pasted image (2).png', // -x
      '/texture/prisonRealm/Pasted image (3).png', // +y
      '/texture/prisonRealm/Pasted image (4).png', // -y
      '/texture/prisonRealm/Pasted image (5).png', // +z
      '/texture/prisonRealm/Pasted image (6).png', // -z
    ];

    // Preload all textures
    Promise.all(paths.map(path => loader.loadAsync(path)))
      .then(textures => {
        textures.forEach(tex => {
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          tex.generateMipmaps = true;
        });

        const loadedMaterials = textures.map(texture =>
          new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.7,
            metalness: 0.2,
          })
        );

        setMaterials(loadedMaterials);
      })
      .catch(error => {
        console.error('Error loading textures:', error);
      });
  }, []);

  if (!materials) {
    return (
      <mesh ref={ref}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    );
  }

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      {materials.map((material, idx) => (
        <primitive key={idx} object={material} attach={`material-${idx}`} />
      ))}
    </mesh>
  );
};

export default Box;
