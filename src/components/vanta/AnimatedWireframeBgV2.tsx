import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const AnimatedWireframeBg = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    try {
      const isMobile =
        /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
        window.innerWidth < 768;

      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // ---------- SCENE ----------
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        isMobile ? 70 : 55,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      camera.position.z = isMobile ? 150 : 110;

      const renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(isMobile ? 0.9 : Math.min(window.devicePixelRatio, 2));

      ref.current.appendChild(renderer.domElement);

      // ---------- DENSITY ----------
      const LINES = isMobile ? 32 : 120;
      const POINTS = isMobile ? 70 : 220;

      const geometry = new THREE.BufferGeometry();
      const positions: number[] = [];
      const indices: number[] = [];

      for (let i = 0; i < LINES; i++) {
        for (let j = 0; j < POINTS; j++) {
          const x = (j / POINTS - 0.5) * 220;
          const y = (i / LINES - 0.5) * 220;

          positions.push(x, y, 0);

          if (j < POINTS - 1) {
            const a = i * POINTS + j;
            const b = i * POINTS + j + 1;
            indices.push(a, b);
          }
        }
      }

      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(positions, 3)
      );
      geometry.setIndex(indices);

      // ---------- SHADER ----------
      // Palette: Violet-blue (#4f46e5) -> Magenta (#ec4899) -> Warm orange (#f97316)
      const material = new THREE.ShaderMaterial({
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uAmp: { value: isMobile ? 7.0 : 16.0 },
        },

        vertexShader: `
          uniform float uTime;
          uniform vec2 uMouse;
          uniform float uAmp;

          varying float vDepth;
          varying float vWave;
          varying vec2 vUv;

          float noise(vec2 p){
            return sin(p.x) * sin(p.y);
          }

          void main() {
            vec3 pos = position;
            vUv = uv;

            float t = uTime * 0.45;

            float wave;
            if (uAmp > 10.0) {
              float w1 = sin(pos.x * 0.024 + t);
              float w2 = cos(pos.y * 0.028 + t * 1.15);
              float w3 = sin((pos.x + pos.y) * 0.018 + t * 0.7);
              float w4 = noise(pos.xy * 0.025 + t);
              wave = w1 + w2 + w3 + w4;
            } else {
              float w1 = sin(pos.x * 0.028 + t);
              float w2 = sin(pos.y * 0.045 + t * 1.1);
              wave = w1 + w2;
            }

            pos.y += wave * uAmp;
            pos.z += wave * (uAmp * 1.6);

            pos.x += uMouse.x * 5.0;
            pos.y += uMouse.y * 5.0;

            vDepth = pos.z;
            vWave = wave;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,

        fragmentShader: `
          varying float vDepth;
          varying float vWave;

          void main() {
            float d = vDepth * 0.022;

            // Apple Burgundy spectrum: deep indigo -> rich Apple burgundy (#881337) -> crimson -> warm ember
            vec3 indigo    = vec3(0.25, 0.20, 0.65);
            vec3 burgundy  = vec3(0.58, 0.08, 0.24); // Rich Apple burgundy
            vec3 crimson   = vec3(0.82, 0.12, 0.35); // Keynote bordeaux highlight
            vec3 ember     = vec3(0.98, 0.45, 0.12);

            vec3 color = mix(indigo, burgundy, smoothstep(-0.8, 0.0, d));
            color = mix(color, crimson, smoothstep(-0.1, 0.65, d));
            color = mix(color, ember, smoothstep(0.45, 1.2, d));

            float intensity = 0.32 + abs(vWave) * 0.55;
            gl_FragColor = vec4(color * intensity, intensity * 0.5);
          }
        `,
      });

      const lines = new THREE.LineSegments(geometry, material);
      scene.add(lines);

      // ---------- INPUT ----------
      const target = new THREE.Vector2();
      const smooth = new THREE.Vector2();

      const update = (x: number, y: number) => {
        target.x = (x / window.innerWidth - 0.5) * 2;
        target.y = (y / window.innerHeight - 0.5) * 2;
      };

      const onMouse = (e: MouseEvent) => {
        if (!isMobile) update(e.clientX, e.clientY);
      };

      const onTouch = (e: TouchEvent) => {
        if (isMobile && e.touches.length) {
          update(e.touches[0].clientX, e.touches[0].clientY);
        }
      };

      window.addEventListener('mousemove', onMouse, { passive: true });
      window.addEventListener('touchmove', onTouch, { passive: true });

      // ---------- RESIZE ----------
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', onResize);

      // ---------- ANIMATION ----------
      let frameId: number | null = null;

      const renderScene = () => {
        smooth.lerp(target, isMobile ? 0.02 : 0.04);
        material.uniforms.uMouse.value.copy(smooth);

        const camFactor = isMobile ? 6 : 16;
        camera.position.x += (smooth.x * camFactor - camera.position.x) * 0.04;
        camera.position.y += (smooth.y * camFactor - camera.position.y) * 0.04;

        renderer.render(scene, camera);
      };

      const animate = () => {
        material.uniforms.uTime.value += isMobile ? 0.005 : 0.008;
        renderScene();
        frameId = requestAnimationFrame(animate);
      };

      if (prefersReducedMotion) {
        // Render single static frame
        renderScene();
      } else {
        animate();
      }

      // ---------- CLEANUP ----------
      return () => {
        try {
          if (frameId !== null) cancelAnimationFrame(frameId);

          window.removeEventListener('mousemove', onMouse);
          window.removeEventListener('touchmove', onTouch);
          window.removeEventListener('resize', onResize);

          geometry.dispose();
          material.dispose();
          renderer.dispose();

          if (renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
          }
        } catch (e) {
          console.error('AnimatedWireframeBg cleanup error:', e);
        }
      };
    } catch (error) {
      console.error('AnimatedWireframeBg initialization error:', error);
      return () => {};
    }
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
};