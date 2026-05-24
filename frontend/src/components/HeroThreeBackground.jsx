import { useEffect, useRef } from "react";
import * as THREE from "three";

// Reusable scene runner. Uses vanilla three.js to avoid R3F JSX transform conflicts
// with the Emergent visual-edit plugin attributes.
const useThreeScene = (canvasRef, setup) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      canvas.clientWidth / Math.max(canvas.clientHeight, 1),
      0.1,
      100
    );
    camera.position.z = 6;

    const ctx = { renderer, scene, camera, canvas, disposables: [] };
    setup(ctx);

    const handleResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(canvas);

    let raf = 0;
    let last = performance.now();
    const tick = (now) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (ctx.onFrame) ctx.onFrame(delta, now * 0.001);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      ctx.disposables.forEach((d) => {
        if (d && typeof d.dispose === "function") d.dispose();
      });
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

const makeBlob = (color, distortStrength = 0.2) => {
  const geometry = new THREE.IcosahedronGeometry(1.1, 24);
  const basePositions = geometry.attributes.position.array.slice();
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: 0.4,
    metalness: 0.2,
    transparent: true,
    opacity: 0.9,
    flatShading: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return { mesh, geometry, material, basePositions, distortStrength };
};

const makeTorus = (color) => {
  const geometry = new THREE.TorusGeometry(0.8, 0.28, 24, 64);
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: 0.45,
    metalness: 0.3,
    transparent: true,
    opacity: 0.85,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return { mesh, geometry, material };
};

const distortBlob = (blob, time) => {
  const { geometry, basePositions, distortStrength, mesh } = blob;
  const pos = geometry.attributes.position;
  const arr = pos.array;
  const v = new THREE.Vector3();
  for (let i = 0; i < arr.length; i += 3) {
    v.set(basePositions[i], basePositions[i + 1], basePositions[i + 2]);
    const n =
      Math.sin(v.x * 1.7 + time * 0.8) *
        Math.cos(v.y * 1.4 + time * 0.6) *
        Math.sin(v.z * 1.6 + time * 0.7) *
        distortStrength +
      1;
    v.multiplyScalar(n);
    arr[i] = v.x;
    arr[i + 1] = v.y;
    arr[i + 2] = v.z;
  }
  pos.needsUpdate = true;
  geometry.computeVertexNormals();
  mesh.rotation.x = time * 0.15;
  mesh.rotation.y = time * 0.2;
};

export const HeroThreeBackground = ({ className = "" }) => {
  const canvasRef = useRef(null);

  useThreeScene(canvasRef, (ctx) => {
    const { scene } = ctx;
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dir1 = new THREE.DirectionalLight(0xffffff, 1.1);
    dir1.position.set(3, 4, 5);
    scene.add(dir1);
    const dir2 = new THREE.DirectionalLight(0xf59e0b, 0.4);
    dir2.position.set(-4, -2, -3);
    scene.add(dir2);

    const blobA = makeBlob("#5ec4b6", 0.18);
    blobA.mesh.position.set(-2.6, 1.1, -1);
    blobA.mesh.scale.setScalar(0.95);
    scene.add(blobA.mesh);

    const blobB = makeBlob("#fdba74", 0.22);
    blobB.mesh.position.set(2.8, -0.6, -1.5);
    blobB.mesh.scale.setScalar(0.75);
    scene.add(blobB.mesh);

    const blobC = makeBlob("#bbf7d0", 0.14);
    blobC.mesh.position.set(0.2, -1.9, -2.8);
    blobC.mesh.scale.setScalar(0.5);
    scene.add(blobC.mesh);

    const torusA = makeTorus("#60a5fa");
    torusA.mesh.position.set(1.4, 1.6, -2);
    torusA.mesh.scale.setScalar(0.6);
    scene.add(torusA.mesh);

    const torusB = makeTorus("#fbcfe8");
    torusB.mesh.position.set(-2.0, -1.4, -2.5);
    torusB.mesh.scale.setScalar(0.55);
    scene.add(torusB.mesh);

    ctx.disposables.push(
      blobA.geometry,
      blobA.material,
      blobB.geometry,
      blobB.material,
      blobC.geometry,
      blobC.material,
      torusA.geometry,
      torusA.material,
      torusB.geometry,
      torusB.material
    );

    const startA = performance.now() * 0.001;
    const blobs = [blobA, blobB, blobC];
    const toruses = [torusA, torusB];

    ctx.onFrame = (_delta, t) => {
      blobs.forEach((b, i) => {
        distortBlob(b, t * (0.8 + i * 0.1) + i * 0.7);
        // gentle bobbing
        b.mesh.position.y +=
          Math.sin(t * (0.6 + i * 0.15) + i) * 0.0015;
      });
      toruses.forEach((tor, i) => {
        tor.mesh.rotation.x = t * (0.4 + i * 0.12) + startA;
        tor.mesh.rotation.y = t * (0.5 + i * 0.08);
        tor.mesh.position.y += Math.sin(t * 0.5 + i * 1.3) * 0.0012;
      });
    };
  });

  return (
    <div
      aria-hidden
      data-testid="hero-three-bg"
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
};

export const SectionParticles = ({ className = "", color = "#5ec4b6" }) => {
  const canvasRef = useRef(null);

  useThreeScene(canvasRef, (ctx) => {
    const { scene, camera } = ctx;
    camera.position.z = 5;

    const count = 90;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const material = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.07,
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    ctx.disposables.push(geometry, material);

    ctx.onFrame = (_delta, t) => {
      points.rotation.y = t * 0.04;
      points.rotation.x = t * 0.02;
    };
  });

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
};
