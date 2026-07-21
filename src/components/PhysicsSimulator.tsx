import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Sliders, Info } from 'lucide-react';

interface PhysicsSimulatorProps {
  simType: 'projectile' | 'rotation' | 'circuit' | 'optics' | 'wave_interference';
}

export const PhysicsSimulator: React.FC<PhysicsSimulatorProps> = ({ simType }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);

  // Parameter Controls
  const [param1, setParam1] = useState(30); // Angle or Mass or Resistance
  const [param2, setParam2] = useState(15); // Velocity or Radius or Inductance
  const [param3, setParam3] = useState(5);  // Friction or Capacitance or Focal length

  const requestRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      if (isRunning) {
        timeRef.current += 0.05;
      }
      const t = timeRef.current;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Dark Canvas Grid Background
      ctx.strokeStyle = '#1e1e24';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (simType === 'rotation') {
        // Pure Rolling & Torque Simulator
        const R = param2 * 2 + 20; // Radius
        const slopeAngle = (param1 * Math.PI) / 180; // Incline Angle
        const friction = param3 / 10;

        // Draw Inclined Plane
        const startX = 50;
        const startY = 80;
        const inclineLen = 420;
        const endX = startX + inclineLen * Math.cos(slopeAngle);
        const endY = startY + inclineLen * Math.sin(slopeAngle);

        ctx.strokeStyle = '#52525b';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Calculate Position on Incline
        const acc = 9.8 * Math.sin(slopeAngle) / (1 + 0.5); // Cylinder rolling
        const s = Math.min((0.5 * acc * t * t * 10) % inclineLen, inclineLen - R - 10);
        const cx = startX + (s + R) * Math.cos(slopeAngle) - R * Math.sin(slopeAngle);
        const cy = startY + (s + R) * Math.sin(slopeAngle) + R * Math.cos(slopeAngle);

        const theta = (s / R) % (2 * Math.PI); // Pure rolling angle

        // Draw Rolling Solid Cylinder
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(slopeAngle + theta);

        // Cylinder Body
        ctx.fillStyle = '#18181b';
        ctx.strokeStyle = '#f59e0b'; // Amber
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, R, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        // Cross Lines to show rotation
        ctx.strokeStyle = '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(-R, 0);
        ctx.lineTo(R, 0);
        ctx.moveTo(0, -R);
        ctx.lineTo(0, R);
        ctx.stroke();

        ctx.restore();

        // Vectors (CM Velocity & Friction)
        ctx.strokeStyle = '#3b82f6'; // Blue for v_cm
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(slopeAngle) * 40, cy + Math.sin(slopeAngle) * 40);
        ctx.stroke();

        ctx.fillStyle = '#f59e0b';
        ctx.font = '12px Orbitron';
        ctx.fillText(`a_cm = ${(acc).toFixed(2)} m/s²`, 30, height - 30);
        ctx.fillText(`v_cm = ${(acc * t).toFixed(2)} m/s`, 30, height - 12);
      } else if (simType === 'circuit') {
        // LCR Resonance Simulator
        const R = param1; // Resistance
        const L = param2 / 1000; // Inductance in H
        const C = param3 / 1000000; // Capacitance in F
        const w0 = 1 / Math.sqrt(L * C); // Resonance Frequency

        // Draw LCR Resonance Curve
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();

        const startX = 60;
        const endX = width - 40;
        const centerY = height - 60;

        for (let x = startX; x <= endX; x++) {
          const freq = (x - startX) * 20; // 0 to 8000 rad/s
          const w = freq;
          const Z = Math.sqrt(R * R + Math.pow(w * L - 1 / (w * C || 0.0001), 2));
          const I = 220 / (Z || 1); // Current

          const y = centerY - Math.min(I * 8, 160);
          if (x === startX) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Resonance Peak Line
        const resX = startX + w0 / 20;
        if (resX >= startX && resX <= endX) {
          ctx.strokeStyle = '#f59e0b';
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(resX, 30);
          ctx.lineTo(resX, centerY);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = '#f59e0b';
          ctx.font = '11px Orbitron';
          ctx.fillText(`ω_0 = ${w0.toFixed(0)} rad/s`, resX + 5, 45);
        }

        ctx.fillStyle = '#9ca3af';
        ctx.font = '12px Gowun Dodum';
        ctx.fillText(`LCR Resonance Quality Factor Q = ${((w0 * L) / R).toFixed(2)}`, 30, height - 12);
      } else if (simType === 'optics') {
        // Lens Ray Tracer
        const f = param3 * 10; // Focal length
        const u = -(param1 * 10); // Object distance
        const v = (f * u) / (u + f); // Lens formula 1/v - 1/u = 1/f => v = fu / (u+f)

        const lensX = width / 2;
        const lensY = height / 2;

        // Optical Axis
        ctx.strokeStyle = '#52525b';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(20, lensY);
        ctx.lineTo(width - 20, lensY);
        ctx.stroke();

        // Convex Lens
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(lensX, lensY, 12, 90, 0, 0, 2 * Math.PI);
        ctx.stroke();

        // Object Arrow
        const objX = lensX + u;
        const objH = 50;
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(objX, lensY);
        ctx.lineTo(objX, lensY - objH);
        ctx.stroke();

        // Rays
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 1.5;
        // Ray 1: Parallel then through focus
        ctx.beginPath();
        ctx.moveTo(objX, lensY - objH);
        ctx.lineTo(lensX, lensY - objH);
        ctx.lineTo(lensX + v, lensY + (objH * v) / u);
        ctx.stroke();

        // Ray 2: Through optical center
        ctx.beginPath();
        ctx.moveTo(objX, lensY - objH);
        ctx.lineTo(lensX + v, lensY + (objH * v) / u);
        ctx.stroke();

        ctx.fillStyle = '#f59e0b';
        ctx.font = '12px Orbitron';
        ctx.fillText(`u = ${u / 10} cm | f = ${f / 10} cm | v = ${(v / 10).toFixed(1)} cm`, 30, height - 12);
      } else {
        // Projectile Motion
        const angle = (param1 * Math.PI) / 180;
        const v0 = param2 * 3;
        const g = 9.8;

        const vx = v0 * Math.cos(angle);
        const vy = v0 * Math.sin(angle);

        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.beginPath();

        const startX = 40;
        const startY = height - 40;

        for (let pt = 0; pt <= 20; pt += 0.2) {
          const px = startX + vx * pt;
          const py = startY - (vy * pt - 0.5 * g * pt * pt);
          if (py > startY) break;
          if (pt === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Projectile Ball
        const currT = t % (2 * vy / g);
        const ballX = startX + vx * currT;
        const ballY = startY - (vy * currT - 0.5 * g * currT * currT);

        if (ballY <= startY) {
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(ballX, ballY, 8, 0, 2 * Math.PI);
          ctx.fill();
        }

        ctx.fillStyle = '#9ca3af';
        ctx.font = '12px Orbitron';
        ctx.fillText(`Angle: ${param1}° | Velocity: ${param2} m/s | Max Height: ${((vy * vy) / (2 * g)).toFixed(1)} m`, 30, height - 12);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isRunning, param1, param2, param3, simType]);

  return (
    <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div className="space-y-1">
          <h3 className="font-barrio text-2xl text-amber-400">
            {simType === 'rotation' && 'RIGID BODY PURE ROLLING SIMULATOR'}
            {simType === 'circuit' && 'SERIES LCR AC RESONANCE ENGINE'}
            {simType === 'optics' && 'RAY OPTICS CONVEX LENS TRACER'}
            {simType === 'projectile' && 'PROJECTILE MOTION WITH GRAVITY'}
          </h3>
          <p className="font-gowun text-xs text-neutral-400">
            Adjust physical variables below to observe real-time 2D physics dynamics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-orbitron text-amber-400 transition-all"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isRunning ? 'PAUSE' : 'RESUME'}
          </button>
          <button
            onClick={() => {
              timeRef.current = 0;
            }}
            className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white transition-all"
            title="Reset Simulation Time"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Canvas */}
      <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-black flex justify-center">
        <canvas
          ref={canvasRef}
          width={700}
          height={320}
          className="w-full max-w-[700px] h-[320px] object-contain"
        />
      </div>

      {/* Control Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
        {simType === 'rotation' && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-orbitron text-neutral-300">
                <span>Incline Angle (θ)</span>
                <span className="text-amber-400">{param1}°</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                value={param1}
                onChange={(e) => setParam1(Number(e.target.value))}
                className="w-full accent-amber-400 bg-neutral-800 rounded cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-orbitron text-neutral-300">
                <span>Cylinder Radius (R)</span>
                <span className="text-amber-400">{param2} cm</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                value={param2}
                onChange={(e) => setParam2(Number(e.target.value))}
                className="w-full accent-amber-400 bg-neutral-800 rounded cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-orbitron text-neutral-300">
                <span>Friction Coeff (μ)</span>
                <span className="text-amber-400">{(param3 / 10).toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={param3}
                onChange={(e) => setParam3(Number(e.target.value))}
                className="w-full accent-amber-400 bg-neutral-800 rounded cursor-pointer"
              />
            </div>
          </>
        )}

        {simType === 'circuit' && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-orbitron text-neutral-300">
                <span>Resistance (R)</span>
                <span className="text-amber-400">{param1} Ω</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                value={param1}
                onChange={(e) => setParam1(Number(e.target.value))}
                className="w-full accent-amber-400 bg-neutral-800 rounded cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-orbitron text-neutral-300">
                <span>Inductance (L)</span>
                <span className="text-amber-400">{param2} mH</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={param2}
                onChange={(e) => setParam2(Number(e.target.value))}
                className="w-full accent-amber-400 bg-neutral-800 rounded cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-orbitron text-neutral-300">
                <span>Capacitance (C)</span>
                <span className="text-amber-400">{param3} μF</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={param3}
                onChange={(e) => setParam3(Number(e.target.value))}
                className="w-full accent-amber-400 bg-neutral-800 rounded cursor-pointer"
              />
            </div>
          </>
        )}

        {(simType === 'optics' || simType === 'projectile') && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-orbitron text-neutral-300">
                <span>{simType === 'optics' ? 'Object Distance (u)' : 'Launch Angle (θ)'}</span>
                <span className="text-amber-400">{param1}{simType === 'optics' ? ' cm' : '°'}</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={param1}
                onChange={(e) => setParam1(Number(e.target.value))}
                className="w-full accent-amber-400 bg-neutral-800 rounded cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-orbitron text-neutral-300">
                <span>{simType === 'optics' ? 'Lens Aperture' : 'Initial Velocity'}</span>
                <span className="text-amber-400">{param2}{simType === 'optics' ? ' mm' : ' m/s'}</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={param2}
                onChange={(e) => setParam2(Number(e.target.value))}
                className="w-full accent-amber-400 bg-neutral-800 rounded cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-orbitron text-neutral-300">
                <span>{simType === 'optics' ? 'Focal Length (f)' : 'Gravity (g)'}</span>
                <span className="text-amber-400">{param3}{simType === 'optics' ? ' cm' : ' m/s²'}</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                value={param3}
                onChange={(e) => setParam3(Number(e.target.value))}
                className="w-full accent-amber-400 bg-neutral-800 rounded cursor-pointer"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
