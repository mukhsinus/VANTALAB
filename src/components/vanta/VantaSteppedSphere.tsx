import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface VantaSteppedSphereProps {
  className?: string;
}

export const VantaSteppedSphere = ({ className = '' }: VantaSteppedSphereProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      const container = containerRef.current;
      const isMobile =
        /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
        window.innerWidth < 768;

      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // ---------- SCENE & CAMERA ----------
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        42,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 95);

      const renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(isMobile ? 0.9 : Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;

      container.appendChild(renderer.domElement);

      // ---------- PROCEDURAL STEPPED SPHERE GEOMETRY ----------
      // Concentric terraced discs with chamfered rim edges
      const buildSteppedSphereGeometry = (
        R = 26,
        numSlices = isMobile ? 24 : 32,
        grooveRatio = 0.26,
        grooveDepth = 1.6
      ) => {
        const points: THREE.Vector2[] = [];
        const dy = (2 * R) / numSlices;

        // Bottom pole anchor
        points.push(new THREE.Vector2(0.001, -R));

        for (let i = 0; i < numSlices; i++) {
          const y0 = -R + i * dy;
          const y1 = y0 + dy;
          const yMid = (y0 + y1) * 0.5;

          const outerR = Math.sqrt(Math.max(0.2, R * R - yMid * yMid));
          const innerR = Math.max(0.2, outerR - grooveDepth);

          const grooveH = dy * grooveRatio;
          const discH = dy - grooveH;
          const yDiscBot = y0 + grooveH;
          const bevel = Math.min(0.22, discH * 0.22);

          // Groove floor
          points.push(new THREE.Vector2(innerR, y0));
          // Groove vertical wall
          points.push(new THREE.Vector2(innerR, yDiscBot));
          // Underside bevel & shelf
          points.push(new THREE.Vector2(outerR - bevel, yDiscBot));
          points.push(new THREE.Vector2(outerR, yDiscBot + bevel * 0.5));
          // Disc vertical outer rim
          points.push(new THREE.Vector2(outerR, y1 - bevel));
          // Top chamfer (catches the crimson rim light)
          points.push(new THREE.Vector2(outerR - bevel, y1));
          // Inward step into next groove
          points.push(new THREE.Vector2(innerR, y1));
        }

        // Top pole anchor
        points.push(new THREE.Vector2(0.001, R));

        const geo = new THREE.LatheGeometry(points, isMobile ? 54 : 80);
        geo.computeVertexNormals();
        return geo;
      };

      const steppedGeo = buildSteppedSphereGeometry();

      // Outer dark obsidian satin material
      const steppedMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#0c0e14'),
        roughness: 0.32,
        metalness: 0.28,
        clearcoat: 0.55,
        clearcoatRoughness: 0.16,
        reflectivity: 0.65,
      });

      const steppedMesh = new THREE.Mesh(steppedGeo, steppedMat);

      // Inner glowing core visible through groove crevices
      const coreGeo = new THREE.SphereGeometry(24.5, 32, 32);
      const coreMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1a040b'),
        emissive: new THREE.Color('#660a1e'),
        emissiveIntensity: 0.65,
        roughness: 0.7,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);

      // ---------- HIERARCHY FOR DYNAMIC ORBITAL ROTATION ----------
      // 1. tiltGroup: Holds meshes with base inclination (so discs are viewed at an angle)
      const tiltGroup = new THREE.Group();
      tiltGroup.add(coreMesh);
      tiltGroup.add(steppedMesh);
      tiltGroup.rotation.set(0.40, 0, -0.22);

      // 2. spinGroup: Continuously spins the tilted sphere around the Y-axis so the concentric
      //    terraced rings visibly revolve and sweep through perspective in a slow hypnotic dance
      const spinGroup = new THREE.Group();
      spinGroup.add(tiltGroup);

      // 3. pivotGroup: Handles responsive positioning, floating breathing motion, and mouse parallax
      const pivotGroup = new THREE.Group();
      pivotGroup.add(spinGroup);
      scene.add(pivotGroup);

      // ---------- LIGHTING SETUP ----------
      // 1. Signature Crimson Rim Light (from upper-left, illuminating disc edges)
      const redRimDirLight = new THREE.DirectionalLight(0xff224a, 3.8);
      redRimDirLight.position.set(-42, 38, 12);
      scene.add(redRimDirLight);

      const redRimPointLight = new THREE.PointLight(0xff1844, 18, 90, 1.2);
      redRimPointLight.position.set(-32, 26, 18);
      scene.add(redRimPointLight);

      // 2. Soft Cool Slate Key Light (giving tactile 3D volume & depth)
      const slateKeyLight = new THREE.DirectionalLight(0xcfdbe8, 1.6);
      slateKeyLight.position.set(38, 22, 45);
      scene.add(slateKeyLight);

      // 3. Deep Burgundy Backfill
      const burgundyBackfill = new THREE.DirectionalLight(0x881337, 1.4);
      burgundyBackfill.position.set(-18, -15, -35);
      scene.add(burgundyBackfill);

      // 4. Subtle Dark Ambient Light
      const ambientLight = new THREE.AmbientLight(0x08090e, 0.9);
      scene.add(ambientLight);

      // ---------- RESPONSIVE POSITIONING & SCALING ----------
      let basePosX = 22;
      let basePosY = 2;

      const updateResponsiveLayout = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;

        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);

        if (w >= 1280) {
          // Large desktop: right focal anchor
          basePosX = 23;
          basePosY = 3;
          pivotGroup.scale.setScalar(1.02);
        } else if (w >= 1024) {
          // Medium desktop: right-positioned
          basePosX = 19;
          basePosY = 2;
          pivotGroup.scale.setScalar(0.92);
        } else if (w >= 768) {
          // Tablet: slightly offset to right
          basePosX = 15;
          basePosY = 4;
          pivotGroup.scale.setScalar(0.78);
        } else if (w >= 480) {
          // Phablet / large mobile: scaled down to keep text uncluttered
          basePosX = 11;
          basePosY = 14;
          pivotGroup.scale.setScalar(0.48);
        } else {
          // Standard mobile: compact scale (~35% smaller than before) positioned in the upper-right background
          basePosX = 10;
          basePosY = 15;
          pivotGroup.scale.setScalar(0.42);
        }

        pivotGroup.position.set(basePosX, basePosY, 0);
      };

      updateResponsiveLayout();
      window.addEventListener('resize', updateResponsiveLayout);

      // ---------- INTERACTIVE MOUSE / TOUCH PARALLAX ----------
      const targetMouse = new THREE.Vector2(0, 0);
      const smoothMouse = new THREE.Vector2(0, 0);

      const onMouseMove = (e: MouseEvent) => {
        targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };

      const onTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          targetMouse.x = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
          targetMouse.y = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
        }
      };

      window.addEventListener('mousemove', onMouseMove, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: true });

      // ---------- ANIMATION LOOP ----------
      let frameId: number | null = null;
      const clock = new THREE.Clock();

      const renderFrame = () => {
        const delta = Math.min(clock.getDelta(), 0.1);
        const elapsed = clock.getElapsedTime();

        // 1. Continuous slow autonomous spin (revolving the tilted sphere around Y)
        // At ~0.22 rad/s, completes a full majestic revolution every ~28 seconds
        spinGroup.rotation.y += delta * 0.22;

        // 2. Subtle organic precession & breathing tilt so the motion feels alive
        tiltGroup.rotation.x = 0.40 + Math.sin(elapsed * 0.65) * 0.05;
        tiltGroup.rotation.z = -0.22 + Math.cos(elapsed * 0.5) * 0.04;

        // 3. Smooth mouse interpolation for cursor parallax
        smoothMouse.lerp(targetMouse, isMobile ? 0.025 : 0.045);

        // 4. Parallax tilt on the pivot
        pivotGroup.rotation.x = smoothMouse.y * 0.18;
        pivotGroup.rotation.z = -smoothMouse.x * 0.12;

        // 5. Floating vertical hover and mouse tracking
        pivotGroup.position.x = basePosX + smoothMouse.x * 1.8;
        pivotGroup.position.y = basePosY + Math.sin(elapsed * 0.85) * 0.7 - smoothMouse.y * 1.2;

        // 6. Subtly shift point light to shimmer across the step edges as the sphere turns
        redRimPointLight.position.x = -32 + Math.sin(elapsed * 0.6) * 3;

        renderer.render(scene, camera);
      };

      const animate = () => {
        renderFrame();
        frameId = requestAnimationFrame(animate);
      };

      if (prefersReducedMotion) {
        renderFrame();
      } else {
        animate();
      }

      // ---------- CLEANUP ----------
      return () => {
        if (frameId !== null) cancelAnimationFrame(frameId);

        window.removeEventListener('resize', updateResponsiveLayout);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('touchmove', onTouchMove);

        steppedGeo.dispose();
        steppedMat.dispose();
        coreGeo.dispose();
        coreMat.dispose();
        renderer.dispose();

        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    } catch (err) {
      console.error('VantaSteppedSphere error:', err);
      return () => {};
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
