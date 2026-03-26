import { useEffect, useRef } from "react";
import * as THREE from "three";

export const AnimatedWireframeBg = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const isMobile =
      /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
      window.innerWidth < 768;

    // ---------- SCENE ----------
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      isMobile ? 75 : 60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = isMobile ? 160 : 120;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isMobile ? 0.8 : Math.min(window.devicePixelRatio, 2));

    ref.current.appendChild(renderer.domElement);

    // ---------- DENSITY ----------
    const LINES = isMobile ? 35 : 140;
    const POINTS = isMobile ? 80 : 260;

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
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);

    // ---------- SHADER ----------
    const material = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uAmp: { value: isMobile ? 8.0 : 18.0 },
      },

      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uAmp;

        varying float vDepth;
        varying float vWave;

        float noise(vec2 p){
          return sin(p.x)*sin(p.y);
        }

        void main() {
          vec3 pos = position;

          float t = uTime * 0.5;

          // Desktop = richer pattern
          float wave;
          if(uAmp > 10.0){
            float w1 = sin(pos.x * 0.025 + t);
            float w2 = cos(pos.y * 0.03 + t * 1.2);
            float w3 = sin((pos.x + pos.y) * 0.02 + t * 0.7);
            float w4 = noise(pos.xy * 0.03 + t);

            wave = w1 + w2 + w3 + w4;
          } else {
            // Mobile simpler pattern
            float w1 = sin(pos.x * 0.03 + t);
            float w2 = sin(pos.y * 0.05 + t * 1.2);
            float w3 = noise(pos.xy * 0.04 + t);

            wave = w1 + w2 + w3;
          }

          pos.y += wave * uAmp;
          pos.z += wave * (uAmp * 1.8);

          pos.x += uMouse.x * 6.0;
          pos.y += uMouse.y * 6.0;

          vDepth = pos.z;
          vWave = wave;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,

      fragmentShader: `
        varying float vDepth;
        varying float vWave;

        void main() {

          float d = vDepth * 0.02;

          // Violet gradient (dark → light → near white)
          vec3 darkViolet = vec3(0.15, 0.0, 0.3);
          vec3 violet = vec3(0.6, 0.3, 1.0);
          vec3 light = vec3(0.9, 0.8, 1.0);

          vec3 color = mix(darkViolet, violet, smoothstep(-1.0, 0.5, d));
          color = mix(color, light, smoothstep(0.3, 1.2, d));

          float glow = 0.4 + abs(vWave) * 0.7;

          gl_FragColor = vec4(color * glow, glow * 0.35);
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

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch);

    // ---------- RESIZE ----------
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    // ---------- ANIMATION ----------
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      material.uniforms.uTime.value += isMobile ? 0.006 : 0.01;

      smooth.lerp(target, isMobile ? 0.02 : 0.05);
      material.uniforms.uMouse.value.copy(smooth);

      const camFactor = isMobile ? 8 : 20;

      camera.position.x += (smooth.x * camFactor - camera.position.x) * 0.05;
      camera.position.y += (smooth.y * camFactor - camera.position.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // ---------- CLEANUP ----------
    return () => {
      cancelAnimationFrame(frameId);

      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", onResize);

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{ overflow: "hidden", background: "black" }}
    />
  );
};