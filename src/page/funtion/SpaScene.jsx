import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const FlyingObjectsScene = () => {
  const mountRef = useRef(null);
  const objectsRef = useRef([]); // Store our flying objects

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f8f0);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.z = 20;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Create multiple small spheres (flying stuff)
    const NUM_OBJECTS = 50;
    const objects = [];
    for (let i = 0; i < NUM_OBJECTS; i++) {
      const geometry = new THREE.SphereGeometry(0.2, 8, 8);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(Math.random(), Math.random(), Math.random()),
        roughness: 0.3,
      });
      const sphere = new THREE.Mesh(geometry, material);

      // Random initial position
      sphere.position.x = (Math.random() - 0.5) * 40;
      sphere.position.y = (Math.random() - 0.5) * 40;
      sphere.position.z = (Math.random() - 0.5) * 40;

      // Assign a random velocity vector for movement
      sphere.userData = {
        velocity: {
          x: (Math.random() - 0.5) * 0.2,
          y: (Math.random() - 0.5) * 0.2,
          z: (Math.random() - 0.5) * 0.2,
        },
      };

      scene.add(sphere);
      objects.push(sphere);
    }
    objectsRef.current = objects;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Animate
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Move each object
      objectsRef.current.forEach((obj) => {
        obj.position.x += obj.userData.velocity.x;
        obj.position.y += obj.userData.velocity.y;
        obj.position.z += obj.userData.velocity.z;

        // Bounce back on boundaries
        ['x', 'y', 'z'].forEach((axis) => {
          if (obj.position[axis] > 20 || obj.position[axis] < -20) {
            obj.userData.velocity[axis] *= -1;
          }
        });
      });

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }} ref={mountRef} />
  );
};

export default FlyingObjectsScene;
