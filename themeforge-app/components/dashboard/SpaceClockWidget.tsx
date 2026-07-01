"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "nebula" | "matrix" | "aurora";

const PHRASES = [
  "Te espero en el próximo Big Bang",
  "En alguna galaxia, te estoy buscando",
  "El universo conspiró para que existieras",
  "Eres mi estrella más cercana",
  "Te encontraré en cada vida paralela",
  "Mi amor viaja a la velocidad de la luz",
  "Hasta el fin del universo y el siguiente",
  "Eres el centro de mi galaxia",
  "Entre millones de estrellas, elegiría la tuya",
  "El tiempo se detiene cuando pienso en ti",
  "Eres la constante en mi universo en expansión",
  "Nuestras almas se conocen desde el Big Bang",
  "Te busqué en cada constelación",
  "Eres la razón por la que el universo existe",
  "Mi corazón orbita alrededor del tuyo",
  "En el silencio del espacio, te escucho",
  "Cada estrella es una palabra que no pude decirte",
  "El universo entero cabe en tus ojos",
  "Somos polvo de estrellas que se encontró",
  "Te amaré más allá del último átomo",
  "Saturno toca su guitarra pensando en ti",
  "Eres mi coordenada en el cosmos",
  "Dos almas perdidas en el mismo universo",
  "Nos vemos en el próximo Big Bang, amor",
];

const MODES = {
  nebula: {
    bg: "#000008",
    star: "#e0e7ff",
    nebCols: ["rgba(139,92,246,", "rgba(99,102,241,", "rgba(167,139,250,"],
  },
  matrix: {
    bg: "#000510",
    star: "#bfdbfe",
    nebCols: ["rgba(37,99,235,", "rgba(59,130,246,", "rgba(96,165,250,"],
  },
  aurora: {
    bg: "#000c08",
    star: "#d1fae5",
    nebCols: ["rgba(16,185,129,", "rgba(52,211,153,", "rgba(6,182,212,"],
  },
};

const DAYS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export default function SpaceClockWidget({ compact = false }: { compact?: boolean }) {
  const bgRef = useRef<HTMLCanvasElement>(null);
  const fxRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const stateRef = useRef<any>({ stars: [], shooters: [], nebulas: [], explosions: [], lastHour: -1, mode: "nebula" });
  const [time, setTime] = useState(new Date());
  const [message, setMessage] = useState(PHRASES[new Date().getHours()]);
  const [msgVisible, setMsgVisible] = useState(true);

  const W = compact ? 260 : 320;
  const H = compact ? 64 : 190;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now);
      const h = now.getHours();
      if (h !== stateRef.current.lastHour) {
        stateRef.current.lastHour = h;
        setMsgVisible(false);
        setTimeout(() => {
          setMessage(PHRASES[h]);
          setMsgVisible(true);
          addShooters();
        }, 400);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function initStars() {
    const stars = [];
    for (let i = 0; i < (compact ? 40 : 90); i++) {
      stars.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.4 + 0.2,
        a: Math.random() * 0.8 + 0.2,
        tw: Math.random() * Math.PI * 2,
        spd: Math.random() * 0.025 + 0.008,
      });
    }
    stateRef.current.stars = stars;
  }

  function initNebulas() {
    const nebulas = [];
    const m = MODES[stateRef.current.mode as Mode];
    for (let i = 0; i < 4; i++) {
      nebulas.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 60 + 40,
        a: Math.random() * 0.08 + 0.03,
        col: m.nebCols[Math.floor(Math.random() * m.nebCols.length)],
        drift: Math.random() * 0.003 - 0.0015,
        t: Math.random() * Math.PI * 2,
      });
    }
    stateRef.current.nebulas = nebulas;
  }

  function addShooter() {
    const fromTop = Math.random() < 0.6;
    const x = fromTop ? Math.random() * W : -10;
    const y = fromTop ? -10 : Math.random() * H * 0.5;
    const angle = fromTop ? Math.PI / 4 + Math.random() * 0.4 : Math.random() * 0.3 - 0.15;
    const spd = Math.random() * 4 + 5;
    stateRef.current.shooters.push({
      x, y, vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd,
      trail: [], life: 0, max: Math.random() * 40 + 30,
      col: Math.random() < 0.5 ? "#fbbf24" : "#e0e7ff",
    });
  }

  function addShooters() {
    for (let i = 0; i < 3; i++) setTimeout(() => addShooter(), i * 300);
  }

  function spawnExplosion(x: number, y: number) {
    const cols = ["#a78bfa", "#fbbf24", "#e0e7ff", "#7c3aed", "#f59e0b"];
    for (let i = 0; i < 50; i++) {
      const a = Math.random() * Math.PI * 2;
      const spd = Math.random() * 3 + 0.5;
      stateRef.current.explosions.push({
        x, y, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd,
        r: Math.random() * 2 + 0.5, life: 0, max: Math.random() * 40 + 20,
        col: cols[Math.floor(Math.random() * cols.length)],
      });
    }
  }

  useEffect(() => {
    const bgCanvas = bgRef.current;
    const fxCanvas = fxRef.current;
    if (!bgCanvas || !fxCanvas) return;
    const bg = bgCanvas.getContext("2d")!;
    const fx = fxCanvas.getContext("2d")!;

    initStars();
    initNebulas();

    function drawBg() {
      const m = MODES[stateRef.current.mode as Mode];
      bg.fillStyle = m.bg;
      bg.fillRect(0, 0, W, H);
      stateRef.current.nebulas.forEach((n: any) => {
        n.t += n.drift; n.x += Math.sin(n.t) * 0.1;
        const g = bg.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        g.addColorStop(0, n.col + n.a + ")");
        g.addColorStop(1, n.col + "0)");
        bg.beginPath(); bg.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        bg.fillStyle = g; bg.fill();
      });
      stateRef.current.stars.forEach((s: any) => {
        s.tw += s.spd;
        const a = s.a * (0.4 + 0.6 * Math.sin(s.tw));
        bg.save(); bg.globalAlpha = a;
        bg.beginPath(); bg.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        bg.fillStyle = m.star;
        if (s.r > 0.9) { bg.shadowBlur = 4; bg.shadowColor = m.star; }
        bg.fill(); bg.restore();
      });
    }

    function drawFx() {
      fx.clearRect(0, 0, W, H);
      if (Math.random() < 0.015) addShooter();
      stateRef.current.shooters = stateRef.current.shooters.filter((s: any) => s.life < s.max);
      stateRef.current.shooters.forEach((s: any) => {
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 18) s.trail.shift();
        s.x += s.vx; s.y += s.vy; s.life++;
        if (s.life >= s.max) spawnExplosion(s.x, s.y);
        s.trail.forEach((p: any, i: number) => {
          const a = (i / s.trail.length) * 0.9 * (1 - s.life / s.max);
          fx.save(); fx.globalAlpha = a;
          fx.beginPath(); fx.arc(p.x, p.y, (i / s.trail.length) * 1.5, 0, Math.PI * 2);
          fx.fillStyle = s.col; fx.shadowBlur = 8; fx.shadowColor = s.col;
          fx.fill(); fx.restore();
        });
        fx.save(); fx.globalAlpha = 1 - s.life / s.max;
        fx.beginPath(); fx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
        fx.fillStyle = "#ffffff"; fx.shadowBlur = 10; fx.shadowColor = s.col;
        fx.fill(); fx.restore();
      });
      stateRef.current.explosions = stateRef.current.explosions.filter((p: any) => p.life < p.max);
      stateRef.current.explosions.forEach((p: any) => {
        p.life++; p.x += p.vx; p.y += p.vy; p.vx *= 0.92; p.vy *= 0.92;
        const a = (1 - p.life / p.max) * 0.85;
        fx.save(); fx.globalAlpha = a;
        fx.beginPath(); fx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        fx.fillStyle = p.col; fx.shadowBlur = 6; fx.shadowColor = p.col;
        fx.fill(); fx.restore();
      });
    }

    function loop() { drawBg(); drawFx(); rafRef.current = requestAnimationFrame(loop); }
    loop();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();
  const dateStr = `${DAYS[time.getDay()]}, ${time.getDate()} ${MONTHS[time.getMonth()]}`;

  if (compact) {
    return (
      <div className="relative w-full rounded-xl overflow-hidden" style={{ height: "64px", background: "#000008" }}>
        <canvas ref={bgRef} width={260} height={64} className="absolute inset-0 w-full h-full" />
        <canvas ref={fxRef} width={260} height={64} className="absolute inset-0 w-full h-full" />
        <div className="relative z-10 flex items-center justify-between px-3 h-full">
          <div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: "24px", fontWeight: 700, color: "#fff", textShadow: "0 0 20px rgba(167,139,250,0.9)", letterSpacing: "-0.02em" }}>
              {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}
            </div>
            <div style={{ fontSize: "9px", color: "rgba(167,139,250,0.6)" }}>:{String(s).padStart(2, "0")} {h < 12 ? "AM" : "PM"}</div>
          </div>
          <div className="text-right">
            <div style={{ fontSize: "9px", color: "rgba(167,139,250,0.8)" }}>{dateStr}</div>
            <div style={{ fontSize: "8px", color: "rgba(251,191,36,0.8)", fontStyle: "italic", maxWidth: "140px", lineHeight: 1.3, opacity: msgVisible ? 1 : 0, transition: "opacity 0.8s" }}>
              {message}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ width: "320px", height: "190px", border: "1px solid rgba(139,92,246,0.4)" }}>
      <canvas ref={bgRef} width={320} height={190} className="absolute inset-0 w-full h-full" />
      <canvas ref={fxRef} width={320} height={190} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 flex flex-col justify-center h-full px-5">
        <div className="flex items-end gap-2 mb-1">
          <div style={{ fontFamily: "Georgia,serif", fontSize: "50px", fontWeight: 700, lineHeight: 1, color: "#fff", textShadow: "0 0 30px rgba(167,139,250,1),0 0 60px rgba(139,92,246,0.6)", letterSpacing: "-0.02em" }}>
            {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}
          </div>
          <div className="flex flex-col gap-0.5 mb-1">
            <span style={{ fontFamily: "Georgia,serif", fontSize: "16px", color: "#a78bfa", textShadow: "0 0 10px #a78bfa" }}>:{String(s).padStart(2, "0")}</span>
            <span style={{ fontSize: "9px", color: "rgba(167,139,250,0.5)", letterSpacing: "0.1em" }}>{h < 12 ? "AM" : "PM"}</span>
          </div>
        </div>
        <div style={{ height: "1px", background: "linear-gradient(to right,transparent,rgba(139,92,246,0.6),rgba(251,191,36,0.4),transparent)", margin: "5px 0" }} />
        <div className="flex justify-between items-center">
          <div style={{ fontSize: "11px", color: "rgba(167,139,250,0.8)" }}>{dateStr}</div>
          <div style={{ fontSize: "9px", color: "rgba(251,191,36,0.85)", maxWidth: "155px", textAlign: "right", lineHeight: 1.4, fontStyle: "italic", opacity: msgVisible ? 1 : 0, transition: "opacity 0.8s" }}>
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}
