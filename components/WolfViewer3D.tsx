"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface WolfViewer3DProps {
  intensity?: number;
  isPlaying?: boolean;
  wireColor?: string;
}

export function WolfViewer3D({
  intensity = 70,
  isPlaying = true,
  wireColor = "#22d3ee",
}: WolfViewer3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // References to dynamic scene objects
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const fillLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const isPlayingRef = useRef<boolean>(isPlaying);
  const isUserInteractingRef = useRef<boolean>(false);
  const userIdleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Update light intensity dynamically when Ambience slider changes
  useEffect(() => {
    const factor = intensity / 70;
    if (keyLightRef.current) keyLightRef.current.intensity = factor * 3.5;
    if (fillLightRef.current) fillLightRef.current.intensity = factor * 2.2;
    if (ambientLightRef.current) ambientLightRef.current.intensity = factor * 1.2;
  }, [intensity]);

  // Update material color when model changes
  useEffect(() => {
    if (materialRef.current && wireColor) {
      materialRef.current.color.set(wireColor);
    }
  }, [wireColor]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 2.3);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 1.1;
    controls.maxDistance = 4.2;
    controls.enablePan = false;
    controls.autoRotate = false;

    controls.addEventListener("start", () => {
      isUserInteractingRef.current = true;
      if (userIdleTimeoutRef.current) clearTimeout(userIdleTimeoutRef.current);
    });

    controls.addEventListener("end", () => {
      if (userIdleTimeoutRef.current) clearTimeout(userIdleTimeoutRef.current);
      userIdleTimeoutRef.current = setTimeout(() => {
        isUserInteractingRef.current = false;
      }, 1500);
    });

    // 5. Lighting setup
    const lightFactor = intensity / 70;

    const ambientLight = new THREE.AmbientLight(0x1a1f2c, lightFactor * 1.2);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    // Warm golden key light
    const keyLight = new THREE.DirectionalLight(0xffe8c8, lightFactor * 3.5);
    keyLight.position.set(3, 3.5, 3.5);
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    // Cool cyber cyan fill light
    const fillLight = new THREE.DirectionalLight(0x22d3ee, lightFactor * 2.2);
    fillLight.position.set(-3.5, 1.5, -2);
    scene.add(fillLight);
    fillLightRef.current = fillLight;

    // Rim light from behind/top
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 3.8);
    rimLight.position.set(0, 4, -3.5);
    scene.add(rimLight);

    // Bottom bounce light
    const bounceLight = new THREE.DirectionalLight(0xf59e0b, 1.2);
    bounceLight.position.set(0, -3, 2);
    scene.add(bounceLight);

    // 6. Model Group Container
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // 7. Load GLB Model
    const loader = new GLTFLoader();
    const modelUrl = "/3D-Model/Wolf.glb";

    const standardMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(wireColor || "#22d3ee"),
      metalness: 0.88,
      roughness: 0.22,
      envMapIntensity: 1.2,
      flatShading: false,
    });
    materialRef.current = standardMat;

    loader.load(
      modelUrl,
      (gltf) => {
        const root = gltf.scene;

        // Traverse and enhance mesh normals & materials
        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (!mesh.geometry.attributes.normal) {
              mesh.geometry.computeVertexNormals();
            }
            mesh.material = standardMat;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        // Compute bounding box and center perfectly at (0, 0, 0)
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        root.position.sub(center);

        // Normalize scale to fit nicely in viewport
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 1.65 / (maxDim || 1);
        modelGroup.scale.setScalar(targetScale);

        // Initial orientation
        modelGroup.rotation.y = -0.4;
        modelGroup.rotation.x = 0.05;

        modelGroup.add(root);
        setIsLoaded(true);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadProgress(percent);
        } else {
          // Approximate progress if total is unknown
          setLoadProgress((prev) => Math.min(prev + 12, 95));
        }
      },
      (err) => {
        console.error("Error loading Wolf.glb:", err);
        setError("Failed to load 3D model.");
      }
    );

    // 8. Animation loop
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous turntable rotation animation effect
      if (modelGroup && isPlayingRef.current && !isUserInteractingRef.current) {
        modelGroup.rotation.y += 0.007;
        // Subtle organic floating float
        modelGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.025;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      if (userIdleTimeoutRef.current) clearTimeout(userIdleTimeoutRef.current);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center select-none overflow-hidden">
      {/* 3D Canvas Mounting Node */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Loading Overlay */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-20 pointer-events-none">
          <div className="relative w-14 h-14 mb-3">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20" />
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          </div>
          <span className="font-display text-xs tracking-widest uppercase text-white font-semibold">
            LOADING 3D WOLF MESH
          </span>
          <span className="font-mono text-[11px] text-cyan-400 mt-1">
            {loadProgress > 0 ? `${loadProgress}%` : "INITIALIZING..."}
          </span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-rose-400 text-xs font-mono z-20 pointer-events-none">
          <span>{error}</span>
        </div>
      )}

      {/* Floating 3D Interaction Pill at bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.4)]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] tracking-widest uppercase text-slate-300 font-mono">
            3D ORBIT &bull; DRAG TO ROTATE &bull; SCROLL TO ZOOM
          </span>
        </div>
      </div>
    </div>
  );
}

