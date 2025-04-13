# 3D Interactive Environment with Three.js

An interactive 3D environment built with Next.js, Three.js, and React Three Fiber. The scene features a controllable Gojo character, physics-based interactions, and a dynamic camera.

## Demo

[https://github.com/yvonlcy/three_04/raw/main/public/videos/showcase.mp4](https://github.com/yvonlcy/three_04/raw/main/public/videos/showcase.mp4)

## Features

- **Interactive Character**: Control Gojo Satoru character with WASD keys
- **Physics Simulation**: Using react-three/cannon for realistic physics interactions
- **Dynamic Camera**: Cinematic opening camera rotation around the scene
- **Textured Objects**: Detailed textures for the ground and the Prison Realm box

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the 3D environment.

## Controls

- **W**: Move forward
- **S**: Move backward
- **A**: Move left
- **D**: Move right
- **Mouse**: Click and drag to rotate the camera view
- **Mouse Wheel**: Zoom in and out

## Technical Implementation

The project uses:

- **Next.js** as the React framework
- **Three.js** and **@react-three/fiber** for 3D rendering
- **@react-three/cannon** for physics
- **@react-three/drei** for helpful Three.js components
- **GLTFLoader** for loading 3D models

The scene is composed of:

1. A controllable Gojo character with physics-based movement
2. A textured Prison Realm box with physics
3. A textured ground plane 
4. Dynamic lighting
5. Orbit controls for camera manipulation

## Model Credits

- Gojo Satoru model
- Prison Realm textures


