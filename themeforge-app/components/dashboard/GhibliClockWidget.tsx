"use client";

import { useEffect, useRef, useState } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  color: string;
  life: number;
  maxLife: number;
};

const PARTICLE_COLORS = [
  "#4ade80", // verde esmeralda claro
  "#22c55e", // verde esmeralda
  "#16a34a", // verde oscuro
  "#fbbf24", // dorado
  "#f59e0b", // dorado oscuro
  "#fde68a", // dorado claro/crema
  "#86efac", // verde menta
  "#d4edda", // blanco verdoso
];

export default function GhibliClockWidget({ compact = false }: { compact?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const [time, setTime] = useState(new Date());

  // Actualiza el reloj cada segundo
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Animación de partículas en canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    const spawnParticle = (): Particle => ({
      id: Math.random(),
      x: Math.random() * W,
      y: H + 5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: -(Math.random() * 1.2 + 0.4),
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      life: 0,
      maxLife: Math.random() * 120 + 80,
    });

    // Inicializa partículas
    for (let i = 0; i < 18; i++) {
      const p = spawnParticle();
      p.y = Math.random() * H; // distribuye al inicio
      p.life = Math.random() * p.maxLife;
      particlesRef.current.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, W, H);

      // Spawn nuevas partículas
      if (particlesRef.current.length < 25 && Math.random() < 0.3) {
        particlesRef.current.push(spawnParticle());
      }

      particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);

      particlesRef.current.forEach((p) => {
        p.life++;
        p.x += p.speedX + Math.sin(p.life * 0.05) * 0.3;
        p.y += p.speedY;

        const lifeRatio = p.life / p.maxLife;
        const alpha = p.opacity * (lifeRatio < 0.2
          ? lifeRatio / 0.2
          : lifeRatio > 0.7
          ? 1 - (lifeRatio - 0.7) / 0.3
          : 1);

        // Brillo exterior (glow)
        ctx.save();
        ctx.globalAlpha = alpha * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();

        // Partícula principal
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const monthNames = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

  const dayName = dayNames[time.getDay()];
  const day = time.getDate();
  const month = monthNames[time.getMonth()];
  const year = time.getFullYear();

  if (compact) {
    // Versión compacta para MobilePreview
    return (
      <div className="relative w-full rounded-xl overflow-hidden" style={{ height: "64px", background: "linear-gradient(135deg, rgba(20,83,45,0.85) 0%, rgba(101,62,0,0.7) 100%)" }}>
        <canvas
          ref={canvasRef}
          width={260}
          height={64}
          className="absolute inset-0 w-full h-full"
          style={{ mixBlendMode: "screen" }}
        />
        <div className="relative z-10 flex items-center justify-between px-3 h-full">
          <div>
            <div
              className="text-2xl font-bold leading-none"
              style={{ color: "#fde68a", textShadow: "0 0 12px rgba(251,191,36,0.8), 0 0 24px rgba(251,191,36,0.4)", fontFamily: "Georgia, serif", letterSpacing: "0.05em" }}
            >
              {hours}:{minutes}
            </div>
            <div className="text-[9px] mt-0.5" style={{ color: "#86efac", textShadow: "0 0 8px rgba(74,222,128,0.6)" }}>
              :{seconds}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[9px] font-medium" style={{ color: "#fde68a" }}>{dayName}</div>
            <div className="text-[8px]" style={{ color: "#86efac" }}>{day} {month} {year}</div>
            <div className="text-[8px] mt-0.5" style={{ color: "rgba(253,230,138,0.6)" }}>✦ Ghibli Forest ✦</div>
          </div>
        </div>
      </div>
    );
  }

  // Versión completa para exportar / vista standalone
  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        width: "320px",
        height: "160px",
        background: "linear-gradient(135deg, rgba(5,46,22,0.95) 0%, rgba(20,83,45,0.9) 40%, rgba(101,62,0,0.85) 100%)",
        boxShadow: "0 0 30px rgba(74,222,128,0.2), 0 0 60px rgba(251,191,36,0.1), inset 0 1px 0 rgba(253,230,138,0.2)",
        border: "1px solid rgba(74,222,128,0.3)",
      }}
    >
      {/* Borde decorativo interior */}
      <div
        className="absolute inset-[2px] rounded-2xl pointer-events-none"
        style={{ border: "1px solid rgba(253,230,138,0.15)" }}
      />

      {/* Canvas de partículas */}
      <canvas
        ref={canvasRef}
        width={320}
        height={160}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Contenido del reloj */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6">

        {/* Hora principal */}
        <div className="flex items-end gap-2 mb-1">
          <div
            style={{
              fontSize: "52px",
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontWeight: "700",
              lineHeight: 1,
              color: "#fde68a",
              textShadow: "0 0 20px rgba(251,191,36,0.9), 0 0 40px rgba(251,191,36,0.5), 0 0 80px rgba(251,191,36,0.2)",
              letterSpacing: "-0.02em",
            }}
          >
            {hours}:{minutes}
          </div>
          <div className="flex flex-col mb-1 gap-0.5">
            <span
              style={{
                fontSize: "16px",
                color: "#86efac",
                textShadow: "0 0 10px rgba(74,222,128,0.8)",
                fontFamily: "Georgia, serif",
              }}
            >
              :{seconds}
            </span>
            <span style={{ fontSize: "10px", color: "rgba(134,239,172,0.6)", letterSpacing: "0.1em" }}>
              {time.getHours() < 12 ? "AM" : "PM"}
            </span>
          </div>
        </div>

        {/* Separador decorativo */}
        <div className="flex items-center gap-2 mb-2">
          <div style={{ height: "1px", flex: 1, background: "linear-gradient(to right, transparent, rgba(251,191,36,0.5), transparent)" }} />
          <span style={{ color: "#fbbf24", fontSize: "10px" }}>✦</span>
          <div style={{ height: "1px", flex: 1, background: "linear-gradient(to right, transparent, rgba(251,191,36,0.5), transparent)" }} />
        </div>

        {/* Fecha y día */}
        <div className="flex justify-between items-center">
          <div>
            <span
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#fde68a",
                textShadow: "0 0 10px rgba(251,191,36,0.6)",
                fontFamily: "Georgia, serif",
                textTransform: "capitalize",
              }}
            >
              {dayName}
            </span>
            <span style={{ fontSize: "11px", color: "#86efac", marginLeft: "6px" }}>
              {day} {month} {year}
            </span>
          </div>
          <div
            style={{
              fontSize: "9px",
              color: "rgba(253,230,138,0.5)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Ghibli Forest
          </div>
        </div>

      </div>
    </div>
  );
}
