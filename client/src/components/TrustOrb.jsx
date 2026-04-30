import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const TrustOrb = ({ status = 'none' }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Clear any existing canvas (Fixes React 18 StrictMode double render issue)
    mountRef.current.innerHTML = '';

    // SCENE SETUP
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(180, 180);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // MESH GROUP
    const group = new THREE.Group();
    scene.add(group);

    let innerMesh, outerMesh;

    if (status === 'verified') {
      // Awwwards Style: Inner glowing core + Outer intricate wireframe
      innerMesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.0, 1),
        new THREE.MeshStandardMaterial({
          color: 0x00ff88,
          emissive: 0x00aa55,
          emissiveIntensity: 0.4,
          wireframe: false,
          flatShading: true
        })
      );
      
      outerMesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.3, 2),
        new THREE.MeshBasicMaterial({
          color: 0x00ff88,
          wireframe: true,
          transparent: true,
          opacity: 0.3
        })
      );
      group.add(innerMesh);
      group.add(outerMesh);

    } else if (status === 'partial') {
      // Partial: Just a pulsing yellow wireframe structure
      outerMesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.2, 1),
        new THREE.MeshBasicMaterial({
          color: 0xffb800,
          wireframe: true,
          transparent: true,
          opacity: 0.8
        })
      );
      group.add(outerMesh);

    } else {
      // None/Failed: Jagged, raw red core
      innerMesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.0, 0),
        new THREE.MeshStandardMaterial({
          color: 0xff4444,
          emissive: 0x880000,
          emissiveIntensity: 0.5,
          flatShading: true
        })
      );
      group.add(innerMesh);
    }

    // ANIMATION LOOP
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      if (innerMesh) {
        innerMesh.rotation.x += 0.005;
        innerMesh.rotation.y += 0.01;
      }
      if (outerMesh) {
        outerMesh.rotation.x -= 0.002;
        outerMesh.rotation.y -= 0.005;
      }
      
      // Add subtle floating effect for the whole group if verified
      if (status === 'verified') {
        const time = Date.now() * 0.001;
        group.position.y = Math.sin(time * 2) * 0.1;
      } else {
        group.position.y = 0;
      }

      group.rotation.y += 0.005;

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
      renderer.dispose();
    };
  }, [status]); 

  return (
    <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div ref={mountRef} style={{ width: '180px', height: '180px', zIndex: 2 }} />
      {/* Outer glow based on status */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: status === 'verified' ? 'rgba(0,255,136,0.3)' : status === 'partial' ? 'rgba(255,184,0,0.2)' : 'rgba(255,68,68,0.2)',
        filter: 'blur(30px)',
        zIndex: 1,
        pointerEvents: 'none',
        transition: 'all 0.5s ease'
      }} />
    </div>
  );
};

export default TrustOrb;
