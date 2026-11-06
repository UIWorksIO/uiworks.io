import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Line, Sparkles } from "@react-three/drei";
import * as THREE from "three";

type Modality = {
  id: string;
  label: string;
  sub: string;
  angle: number;
  phase: number;
};

const MODALITIES: Modality[] = [
  { id: "2d", label: "2D", sub: "Screens", angle: 0, phase: 0 },
  { id: "3d", label: "3D", sub: "Spatial", angle: 60, phase: 0.16 },
  { id: "voice", label: "Voice", sub: "Speak", angle: 120, phase: 0.33 },
  { id: "touch", label: "Touch", sub: "Gesture", angle: 180, phase: 0.5 },
  { id: "devices", label: "Devices", sub: "Wearable", angle: 240, phase: 0.66 },
  { id: "ambient", label: "Ambient", sub: "Anywhere", angle: 300, phase: 0.83 },
];

const RADIUS = 2.45;
const BASE_TILT = THREE.MathUtils.degToRad(16);
const BRAND = "#feb000";

function nodePosition(angleDeg: number): [number, number, number] {
  const a = THREE.MathUtils.degToRad(angleDeg);
  return [Math.cos(a) * RADIUS, 0, Math.sin(a) * RADIUS];
}

function Packet({ to, phase, active }: { to: [number, number, number]; phase: number; active: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    if (!active) {
      mesh.visible = false;
      return;
    }
    mesh.visible = true;
    const t = (state.clock.elapsedTime * 0.22 + phase) % 1;
    const ease = t < 0.5 ? t * 2 : 2 - t * 2;
    mesh.position.set(to[0] * ease, to[1] * ease, to[2] * ease);
    const mat = mesh.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.25 + Math.sin(ease * Math.PI) * 0.75;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 10, 10]} />
      <meshBasicMaterial color={BRAND} toneMapped={false} transparent opacity={0.8} />
    </mesh>
  );
}

function Node({ modality, reducedMotion }: { modality: Modality; reducedMotion: boolean }) {
  const pos = useMemo(() => nodePosition(modality.angle), [modality.angle]);

  return (
    <group>
      <Line
        points={[[0, 0, 0], pos]}
        color={BRAND}
        lineWidth={1}
        transparent
        opacity={0.22}
      />
      <Packet to={pos} phase={modality.phase} active={!reducedMotion} />
      <mesh position={pos}>
        <sphereGeometry args={[0.15, 20, 20]} />
        <meshStandardMaterial
          color="#14141a"
          emissive={BRAND}
          emissiveIntensity={0.55}
          metalness={0.4}
          roughness={0.35}
        />
      </mesh>
      <Html position={pos} center transform={false} style={{ pointerEvents: "none" }} zIndexRange={[10, 0]}>
        <div className="hero-node-chip">
          <span className="hero-node-chip-label">{modality.label}</span>
          <span className="hero-node-chip-sub">{modality.sub}</span>
        </div>
      </Html>
    </group>
  );
}

function Constellation({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);
  const tiltTarget = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const g = group.current;
    const r = ring.current;
    if (!g || !r) return;

    const { pointer } = state;
    tiltTarget.current.x = pointer.y * 0.18;
    tiltTarget.current.y = pointer.x * 0.22;

    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, BASE_TILT + tiltTarget.current.x, 4, delta);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, tiltTarget.current.y * 0.4, 4, delta);

    if (!reducedMotion) {
      r.rotation.y += delta * 0.22;
    }
  });

  return (
    <group ref={group}>
      <group ref={ring}>
        {MODALITIES.map((m) => (
          <Node key={m.id} modality={m} reducedMotion={reducedMotion} />
        ))}

        <Float
          speed={reducedMotion ? 0 : 1.1}
          floatIntensity={reducedMotion ? 0 : 0.5}
          rotationIntensity={reducedMotion ? 0 : 0.35}
        >
          <mesh>
            <icosahedronGeometry args={[0.72, 1]} />
            <meshStandardMaterial
              color="#16161c"
              emissive={BRAND}
              emissiveIntensity={0.4}
              metalness={0.55}
              roughness={0.3}
            />
          </mesh>
          <mesh scale={1.22}>
            <icosahedronGeometry args={[0.72, 1]} />
            <meshBasicMaterial color={BRAND} wireframe transparent opacity={0.22} toneMapped={false} />
          </mesh>
        </Float>

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[RADIUS - 0.015, RADIUS + 0.015, 96]} />
          <meshBasicMaterial color={BRAND} transparent opacity={0.08} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

export default function HeroScene({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.4, 7], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[0, 0, 0]} color={BRAND} intensity={5} distance={9} decay={2} />
      <pointLight position={[3, 3, 5]} color="#ffffff" intensity={0.5} />

      <Constellation reducedMotion={reducedMotion} />

      {!reducedMotion && (
        <Sparkles count={50} scale={6.5} size={2.2} speed={0.3} color={BRAND} opacity={0.5} />
      )}
    </Canvas>
  );
}
