import { useEffect, useRef } from "react";
import * as THREE from "three";

export const AnimatedWireframeBg = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // ---------- SCENE ----------
    const scene = new THREE.Scene();

    // ---------- CAMERA ----------
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 120;

    // ---------- RENDERER ----------
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    containerRef.current.appendChild(renderer.domElement);

    // ---------- GEOMETRY ----------
    const geometry = new THREE.PlaneGeometry(200, 200, 200, 200);

    // ---------- SHADER ----------
    const material = new THREE.ShaderMaterial({
      wireframe: true,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: 15.0 },
        uFrequency: { value: 2.0 },
        uSpeed: { value: 0.6 },
        uColor: { value: new THREE.Color(0x7f7fff) },
      },

      vertexShader: `
        uniform float uTime;
        uniform float uAmplitude;
        uniform float uFrequency;
        uniform float uSpeed;

        varying float vWave;

        void main() {
          vec3 pos = position;

          float wave1 = sin(pos.x * 0.05 * uFrequency + uTime * uSpeed);
          float wave2 = cos(pos.y * 0.05 * uFrequency + uTime * uSpeed * 0.8);

          float wave = wave1 + wave2;

          pos.z += wave * uAmplitude;

          vWave = wave;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,

      fragmentShader: `
        uniform vec3 uColor;
        varying float vWave;

        void main() {
          float intensity = 0.5 + vWave * 0.5;
          vec3 color = uColor * intensity;

          gl_FragColor = vec4(color, 0.35);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -0.5;
    scene.add(mesh);

    // ---------- MOUSE ----------
    const mouse = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

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

      material.uniforms.uTime.value += 0.01;

      // subtle camera motion
      camera.position.x += (mouse.x * 20 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 15 - camera.position.y) * 0.05;

      mesh.rotation.z += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // ---------- CLEANUP ----------
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
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
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ overflow: "hidden" }}
    />
  );
};

