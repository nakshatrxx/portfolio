import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Flame, RotateCcw, Sparkles, Trophy, Target, Moon, Volume2, ShieldAlert, Award } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const BasketballEasterEgg = () => {
  const canvasRef = useRef(null);

  // Scoreboard & stats state
  const [score, setScore] = useState(0);
  const [shotsMade, setShotsMade] = useState(0);
  const [shotsAttempted, setShotsAttempted] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [controlMode, setControlMode] = useState("CLICK_AIM"); // "CLICK_AIM" | "METER"
  const [difficulty, setDifficulty] = useState("ALL_STAR"); // "ROOKIE" | "ALL_STAR" | "HOF"
  const [shotQuality, setShotQuality] = useState(null);
  const [nightNightModal, setNightNightModal] = useState(false);

  // Meter charge state
  const [meterCharge, setMeterCharge] = useState(0);
  const [isCharging, setIsCharging] = useState(false);

  // Difficulty configurations
  const diffConfigs = {
    ROOKIE: {
      label: "Rookie",
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
      meterSpeed: 1.8,
      greenMin: 72,
      greenMax: 100,
      movingHoop: false,
      hoopSpeed: 0,
      ptsMultiplier: 1,
      swishTolerance: 45
    },
    ALL_STAR: {
      label: "All-Star",
      color: "text-curry-gold",
      border: "border-curry-gold/30",
      bg: "bg-curry-gold/10",
      meterSpeed: 2.3,
      greenMin: 80,
      greenMax: 95,
      movingHoop: false,
      hoopSpeed: 1.2,
      ptsMultiplier: 1,
      swishTolerance: 34
    },
    HOF: {
      label: "Hall of Fame",
      color: "text-red-400",
      border: "border-red-500/40",
      bg: "bg-red-500/10",
      meterSpeed: 3.2,
      greenMin: 88,
      greenMax: 94,
      movingHoop: true,
      hoopSpeed: 2.2,
      ptsMultiplier: 2,
      swishTolerance: 24
    }
  };

  const currentDiff = diffConfigs[difficulty];

  // Unified Physics Engine Ref
  const G = useRef({
    canvasW: 800,
    canvasH: 420,
    ball: {
      x: 120,
      y: 315,
      startX: 120,
      startY: 315,
      vx: 0,
      vy: 0,
      radius: 16,
      inAir: false,
      rotation: 0,
      scored: false,
      isGreen: false,
      trail: []
    },
    hoop: {
      x: 680,
      y: 155,
      baseY: 155,
      vy: 1.2,
      rimRadius: 32,
      backboardX: 720,
      backboardY: 85,
      backboardH: 110
    },
    aim: {
      x: 680,
      y: 155,
      isHovering: false
    },
    meter: {
      active: false,
      val: 0,
      dir: 1,
      speed: 2.3
    },
    screenShake: 0,
    netSwishTimer: 0
  });

  const triggerConfetti = (isSuper = false) => {
    confetti({
      particleCount: isSuper ? 120 : 60,
      spread: isSuper ? 100 : 70,
      origin: { y: 0.6 },
      colors: ['#FDB927', '#1D428A', '#00E5FF', '#FFFFFF']
    });
  };

  const showQualityBadge = (text, type = "green") => {
    setShotQuality({ text, type, id: Date.now() });
    setTimeout(() => {
      setShotQuality(prev => (prev?.text === text ? null : prev));
    }, 1800);
  };

  // Reset ball position
  const resetBall = (customX = 120) => {
    const s = G.current;
    s.ball = {
      x: customX,
      y: 315,
      startX: customX,
      startY: 315,
      vx: 0,
      vy: 0,
      radius: 16,
      inAir: false,
      rotation: 0,
      scored: false,
      isGreen: false,
      trail: []
    };
  };

  // Guaranteed Perfect Swish Launch Calculation
  const launchGuaranteedSwish = () => {
    const s = G.current;
    if (s.ball.inAir) return;

    sounds.playBounce();
    setShotsAttempted(prev => prev + 1);

    const hoop = s.hoop;
    const ball = s.ball;

    const targetX = hoop.x - 10;
    const targetY = hoop.y;
    const gravity = 0.46;
    
    const apexY = 55;
    const vy = -Math.sqrt(2 * gravity * (ball.y - apexY));
    const timeToApex = Math.abs(vy) / gravity;
    const timeFromApexToHoop = Math.sqrt(2 * (targetY - apexY) / gravity);
    const totalTime = timeToApex + timeFromApexToHoop;
    const vx = (targetX - ball.x) / totalTime;

    ball.vx = vx;
    ball.vy = vy;
    ball.inAir = true;
    ball.isGreen = true;
    ball.scored = false;

    sounds.playNightNight();
    showQualityBadge("PERFECT GREEN LIGHT 🟢 100% SWISH!", "green");
  };

  // Launch Ball Physics
  const launchBall = (vx, vy, isGreen = false) => {
    const s = G.current;
    if (s.ball.inAir) return;

    sounds.playBounce();
    setShotsAttempted(prev => prev + 1);

    s.ball.vx = vx;
    s.ball.vy = vy;
    s.ball.inAir = true;
    s.ball.isGreen = isGreen;
    s.ball.scored = false;

    if (isGreen) {
      sounds.playNightNight();
      showQualityBadge("PERFECT GREEN LIGHT 🟢", "green");
    }
  };

  // Click / Tap To Shoot
  const shootTowardsPoint = (targetX, targetY) => {
    const s = G.current;
    if (s.ball.inAir) return;

    const ball = s.ball;
    const gravity = 0.46;

    const dx = targetX - ball.x;
    const dy = targetY - ball.y;

    const dist = Math.hypot(dx, dy);
    const time = Math.max(28, Math.min(48, dist * 0.075));

    const vx = dx / time;
    const vy = (dy - 0.5 * gravity * time * time) / time;

    const isNearHoop = Math.hypot(targetX - (s.hoop.x - 10), targetY - s.hoop.y) < currentDiff.swishTolerance;
    
    if (isNearHoop) {
      launchGuaranteedSwish();
    } else {
      launchBall(vx, vy, false);
    }
  };

  // Curry Night Night Action & Celebration
  const triggerNightNightCelebration = () => {
    sounds.playNightNight();
    setNightNightModal(true);
    triggerConfetti(true);
    
    resetBall(90);
    setTimeout(() => {
      launchGuaranteedSwish();
    }, 200);

    setTimeout(() => {
      setNightNightModal(false);
    }, 3800);
  };

  // Spacebar Shot Meter Listener with strict preventDefault
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === ' ' || e.keyCode === 32) {
        if (controlMode === "METER") {
          e.preventDefault();
          e.stopPropagation();
          if (!G.current.ball.inAir && !G.current.meter.active) {
            startMeter();
          }
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space' || e.key === ' ' || e.keyCode === 32) {
        if (controlMode === "METER") {
          e.preventDefault();
          e.stopPropagation();
          if (G.current.meter.active) {
            releaseMeter();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp, { passive: false });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [controlMode, difficulty]);

  // Start Shot Meter
  const startMeter = () => {
    if (G.current.ball.inAir) return;
    G.current.meter.active = true;
    G.current.meter.val = 0;
    G.current.meter.dir = 1;
    G.current.meter.speed = currentDiff.meterSpeed;
    setIsCharging(true);
  };

  // Release Shot Meter
  const releaseMeter = () => {
    if (!G.current.meter.active) return;
    G.current.meter.active = false;
    setIsCharging(false);

    const val = G.current.meter.val;
    const { greenMin, greenMax } = currentDiff;

    if (val >= greenMin && val <= greenMax) {
      launchGuaranteedSwish();
    } else if (val >= greenMin - 15) {
      // Slightly Early
      const hoop = G.current.hoop;
      const ball = G.current.ball;
      const dx = hoop.x - ball.startX;
      const vx = (dx / 48.5) + ((val - greenMin) * 0.035);
      const vy = -15.2;
      launchBall(vx, vy, false);
      showQualityBadge("SLIGHTLY EARLY 🟡", "yellow");
    } else {
      // Missed timing
      const hoop = G.current.hoop;
      const ball = G.current.ball;
      const dx = hoop.x - ball.startX;
      const vx = (dx / 48.5) - 1.2;
      const vy = -13.8;
      launchBall(vx, vy, false);
      showQualityBadge("LATE / EARLY 🔴", "red");
    }
  };

  // Main Canvas Render & Physics Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = 400;
      G.current.canvasW = canvas.width;
      G.current.canvasH = canvas.height;
      G.current.hoop.x = canvas.width - 110;
      G.current.hoop.backboardX = canvas.width - 70;
      resetBall(G.current.ball.startX);
    };

    resize();
    window.addEventListener('resize', resize);

    const loop = () => {
      const s = G.current;
      const { ball, hoop, meter, aim } = s;

      if (s.screenShake > 0) s.screenShake *= 0.88;

      ctx.save();
      if (s.screenShake > 0.5) {
        const shakeX = (Math.random() - 0.5) * s.screenShake;
        const shakeY = (Math.random() - 0.5) * s.screenShake;
        ctx.translate(shakeX, shakeY);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Moving Hoop Physics (Enabled on HOF or toggle)
      const isMoving = currentDiff.movingHoop;
      if (isMoving) {
        hoop.y += hoop.vy * (currentDiff.hoopSpeed / 1.2);
        if (hoop.y > hoop.baseY + 45 || hoop.y < hoop.baseY - 45) {
          hoop.vy *= -1;
        }
        hoop.backboardY = hoop.y - 70;
      }

      // 1. HARDWOOD COURT
      ctx.fillStyle = '#0a0a0e';
      ctx.fillRect(0, 360, canvas.width, 40);

      const courtGrad = ctx.createLinearGradient(0, 360, canvas.width, 360);
      courtGrad.addColorStop(0, difficulty === 'HOF' ? 'rgba(239, 68, 68, 0.7)' : 'rgba(253, 185, 39, 0.7)');
      courtGrad.addColorStop(1, 'rgba(29, 66, 138, 0.7)');
      ctx.strokeStyle = courtGrad;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 360);
      ctx.lineTo(canvas.width, 360);
      ctx.stroke();

      // 3-Point Arc
      ctx.strokeStyle = streak >= 3 ? 'rgba(253, 185, 39, 0.5)' : 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(hoop.x, hoop.y + 190, 360, Math.PI * 0.9, Math.PI * 1.55);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.font = 'bold 36px "Space Grotesk", sans-serif';
      ctx.fillText(`CURRY #30 • ${currentDiff.label.toUpperCase()}`, 50, 345);

      // 2. HOOP, BACKBOARD & NET
      ctx.fillStyle = '#1f1f24';
      ctx.fillRect(hoop.backboardX + 12, hoop.backboardY + 20, 14, 250);

      // Backboard
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.strokeStyle = difficulty === 'HOF' ? '#ef4444' : streak >= 3 ? '#FDB927' : '#ffffff';
      ctx.lineWidth = 3.5;
      ctx.fillRect(hoop.backboardX, hoop.backboardY, 8, hoop.backboardH);
      ctx.strokeRect(hoop.backboardX, hoop.backboardY, 8, hoop.backboardH);

      // Target Box
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(hoop.backboardX - 2, hoop.backboardY + 38, 8, 38);

      // Orange Steel Rim
      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(hoop.x - hoop.rimRadius, hoop.y);
      ctx.lineTo(hoop.backboardX, hoop.y);
      ctx.stroke();

      // Dynamic Net
      ctx.strokeStyle = streak >= 3 ? '#FDB927' : 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 1.8;
      
      const rimLeft = hoop.x - hoop.rimRadius;
      const rimRight = hoop.backboardX;
      const netBottomY = hoop.y + 44;
      const netSway = s.netSwishTimer > 0 ? Math.sin(s.netSwishTimer * 0.4) * 10 : 0;
      if (s.netSwishTimer > 0) s.netSwishTimer--;

      ctx.beginPath();
      ctx.moveTo(rimLeft, hoop.y);
      ctx.quadraticCurveTo(rimLeft + 6 + netSway, hoop.y + 25, hoop.x - 4 + netSway, netBottomY);
      ctx.lineTo(hoop.x + 18 + netSway, netBottomY);
      ctx.quadraticCurveTo(rimRight - 6 + netSway, hoop.y + 25, rimRight, hoop.y);
      ctx.stroke();

      // Net Mesh
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        const ny = hoop.y + i * 11;
        ctx.moveTo(rimLeft + i * 3 + netSway * 0.4, ny);
        ctx.lineTo(rimRight - i * 3 + netSway * 0.4, ny);
        ctx.stroke();
      }

      // 3. POINT-AND-AIM TRAJECTORY
      if (controlMode === "CLICK_AIM" && !ball.inAir && aim.isHovering) {
        const gravity = 0.46;
        const dx = aim.x - ball.x;
        const dy = aim.y - ball.y;
        const dist = Math.hypot(dx, dy);
        const time = Math.max(28, Math.min(48, dist * 0.075));

        const simVx = dx / time;
        const simVy = (dy - 0.5 * gravity * time * time) / time;

        let curX = ball.x;
        let curY = ball.y;
        let cVy = simVy;

        ctx.strokeStyle = difficulty === 'HOF' ? 'rgba(239, 68, 68, 0.85)' : 'rgba(253, 185, 39, 0.85)';
        ctx.fillStyle = difficulty === 'HOF' ? '#ef4444' : '#FDB927';

        for (let i = 0; i < 28; i++) {
          curX += simVx;
          curY += cVy;
          cVy += gravity;

          if (i % 2 === 0) {
            ctx.beginPath();
            ctx.arc(curX, curY, Math.max(1.5, 4.5 - i * 0.1), 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.strokeStyle = '#00E5FF';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(aim.x, aim.y, 9, 0, Math.PI * 2);
        ctx.moveTo(aim.x - 14, aim.y);
        ctx.lineTo(aim.x + 14, aim.y);
        ctx.moveTo(aim.x, aim.y - 14);
        ctx.lineTo(aim.x, aim.y + 14);
        ctx.stroke();
      }

      // 4. SHOT METER (NBA 2K STYLE)
      if (meter.active && controlMode === "METER" && !ball.inAir) {
        meter.val += meter.speed * meter.dir;
        if (meter.val >= 100) {
          meter.val = 100;
          meter.dir = -1;
        } else if (meter.val <= 0) {
          meter.val = 0;
          meter.dir = 1;
        }

        setMeterCharge(meter.val);

        const meterRadius = 40;
        const meterAngleStart = Math.PI * 0.8;
        const meterAngleEnd = Math.PI * 1.8;
        const totalAngle = meterAngleEnd - meterAngleStart;

        ctx.save();
        ctx.translate(ball.x, ball.y - 45);

        // Background
        ctx.strokeStyle = 'rgba(39, 39, 42, 0.9)';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(0, 0, meterRadius, meterAngleStart, meterAngleEnd);
        ctx.stroke();

        // Green Zone Arc based on Difficulty
        const { greenMin, greenMax } = currentDiff;
        const greenStart = meterAngleStart + totalAngle * (greenMin / 100);
        const greenEnd = meterAngleStart + totalAngle * (greenMax / 100);
        
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(0, 0, meterRadius, greenStart, greenEnd);
        ctx.stroke();

        // Fill Arc
        const fillAngle = meterAngleStart + totalAngle * (meter.val / 100);
        const isCurrentlyGreen = meter.val >= greenMin && meter.val <= greenMax;

        ctx.strokeStyle = isCurrentlyGreen ? '#00E5FF' : '#FDB927';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(0, 0, meterRadius, meterAngleStart, fillAngle);
        ctx.stroke();

        // Needle
        const needleX = Math.cos(fillAngle) * meterRadius;
        const needleY = Math.sin(fillAngle) * meterRadius;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(needleX, needleY, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = isCurrentlyGreen ? '#34d399' : '#ffffff';
        ctx.font = 'bold 12px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.round(meter.val)}%`, 0, -8);

        ctx.restore();
      }

      // 5. BALL TRAIL
      if (ball.inAir) {
        ball.trail.push({ x: ball.x, y: ball.y, alpha: 1.0, isGreen: ball.isGreen });
      }

      for (let i = ball.trail.length - 1; i >= 0; i--) {
        const t = ball.trail[i];
        t.alpha -= 0.045;
        if (t.alpha <= 0) {
          ball.trail.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(t.x, t.y, ball.radius * (t.alpha * 0.8), 0, Math.PI * 2);
          ctx.fillStyle = t.isGreen 
            ? `rgba(0, 229, 255, ${t.alpha * 0.5})` 
            : difficulty === 'HOF'
              ? `rgba(239, 68, 68, ${t.alpha * 0.6})`
              : streak >= 3 
                ? `rgba(253, 185, 39, ${t.alpha * 0.6})` 
                : `rgba(255, 133, 51, ${t.alpha * 0.4})`;
          ctx.fill();
        }
      }

      // 6. BALL PHYSICS
      if (ball.inAir) {
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.vy += 0.46;
        ball.rotation += ball.vx * 0.04;

        // Backboard
        if (
          ball.x + ball.radius >= hoop.backboardX &&
          ball.x - ball.radius <= hoop.backboardX + 10 &&
          ball.y >= hoop.backboardY &&
          ball.y <= hoop.backboardY + hoop.backboardH
        ) {
          ball.vx = -Math.abs(ball.vx) * 0.6;
          ball.x = hoop.backboardX - ball.radius;
          sounds.playBounce();
          s.screenShake = 4;
        }

        // Rim
        if (!ball.isGreen) {
          const leftRimX = hoop.x - hoop.rimRadius;
          const distRim = Math.hypot(ball.x - leftRimX, ball.y - hoop.y);
          if (distRim < ball.radius + 3) {
            ball.vy = -ball.vy * 0.65;
            ball.vx = (ball.x < leftRimX ? -Math.abs(ball.vx) : Math.abs(ball.vx)) * 0.7;
            sounds.playRimClank();
            s.screenShake = 6;
          }
        }

        // Swish
        if (
          ball.y >= hoop.y - 6 &&
          ball.y <= hoop.y + 20 &&
          ball.x > hoop.x - hoop.rimRadius &&
          ball.x < hoop.backboardX &&
          ball.vy > 0 &&
          !ball.scored
        ) {
          ball.scored = true;
          s.netSwishTimer = 30;
          s.screenShake = 12;
          sounds.playSwish();

          const pts = 3 * currentDiff.ptsMultiplier;
          setScore(prev => prev + pts);
          setShotsMade(prev => prev + 1);

          setStreak(prev => {
            const next = prev + 1;
            if (next > bestStreak) setBestStreak(next);

            if (next === 2) {
              showQualityBadge("HEAT CHECK! 🔥", "yellow");
            } else if (next >= 3) {
              sounds.playNightNight();
              triggerConfetti(true);
              showQualityBadge("BANG! BANG! 🎙️ NIGHT NIGHT 😴", "green");
            } else {
              showQualityBadge(`SPLASH! 💦 +${pts} PTS`, "green");
            }

            return next;
          });
        }

        // Floor
        if (ball.y + ball.radius >= 360) {
          ball.y = 360 - ball.radius;
          ball.vy = -ball.vy * 0.52;
          ball.vx *= 0.75;
          sounds.playBounce();

          if (Math.abs(ball.vy) < 1.2) {
            if (!ball.scored) {
              setStreak(0);
            }
            setTimeout(() => resetBall(ball.startX), 350);
          }
        }

        // Out of bounds
        if (ball.x > canvas.width + 60 || ball.x < -60) {
          if (!ball.scored) setStreak(0);
          setTimeout(() => resetBall(ball.startX), 250);
        }
      }

      // 7. DRAW BASKETBALL
      ctx.save();
      ctx.translate(ball.x, ball.y);
      ctx.rotate(ball.rotation);

      if (ball.isGreen || streak >= 3) {
        ctx.beginPath();
        ctx.arc(0, 0, ball.radius + 6, 0, Math.PI * 2);
        ctx.fillStyle = ball.isGreen ? 'rgba(0, 229, 255, 0.35)' : 'rgba(253, 185, 39, 0.35)';
        ctx.fill();
      }

      const bGrad = ctx.createRadialGradient(-4, -4, 2, 0, 0, ball.radius);
      bGrad.addColorStop(0, '#ff9944');
      bGrad.addColorStop(0.7, '#d94b00');
      bGrad.addColorStop(1, '#9e3200');

      ctx.beginPath();
      ctx.arc(0, 0, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = bGrad;
      ctx.fill();

      // Seams
      ctx.strokeStyle = '#1a0b02';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(-ball.radius, 0);
      ctx.lineTo(ball.radius, 0);
      ctx.moveTo(0, -ball.radius);
      ctx.lineTo(0, ball.radius);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, ball.radius * 0.65, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      ctx.restore();
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, [streak, bestStreak, difficulty, controlMode]);

  // Pointer Handlers
  const handlePointerDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || G.current.ball.inAir) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (controlMode === "METER") {
      startMeter();
    } else {
      shootTowardsPoint(x, y);
    }
  };

  const handlePointerMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    G.current.aim.x = e.clientX - rect.left;
    G.current.aim.y = e.clientY - rect.top;
    G.current.aim.isHovering = true;
  };

  const handlePointerLeave = () => {
    G.current.aim.isHovering = false;
  };

  const handlePointerUp = () => {
    if (controlMode === "METER") {
      releaseMeter();
    }
  };

  const fgPct = shotsAttempted > 0 ? Math.round((shotsMade / shotsAttempted) * 100) : 0;

  return (
    <div className="w-full rounded-3xl glass-panel p-6 sm:p-8 border border-curry-gold/40 shadow-2xl relative overflow-hidden my-12">
      
      {/* 😴 STEPH CURRY "NIGHT NIGHT" CELEBRATION MODAL OVERLAY */}
      <AnimatePresence>
        {nightNightModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/90 backdrop-blur-lg p-6 text-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, -6, 6, -4, 0],
                y: [0, -8, 0]
              }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="relative w-40 h-40 rounded-full bg-gradient-to-tr from-curry-blue via-surface to-curry-gold/40 border-2 border-curry-gold p-4 flex items-center justify-center shadow-2xl shadow-curry-gold/30"
            >
              <div className="text-center select-none">
                <span className="text-6xl block">😴</span>
                <span className="text-xs font-mono font-bold text-curry-gold mt-1 block">
                  WARRIORS #30
                </span>
              </div>
              
              <motion.span
                animate={{ y: [-10, -35], x: [10, 25], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute top-2 right-4 font-display font-extrabold text-curry-gold text-2xl"
              >
                z
              </motion.span>
              <motion.span
                animate={{ y: [-5, -45], x: [15, 35], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                className="absolute top-0 right-2 font-display font-extrabold text-white text-3xl"
              >
                Z
              </motion.span>
            </motion.div>

            <h3 className="text-4xl sm:text-6xl font-extrabold font-display uppercase tracking-tight text-curry-gold mt-5 curry-glow">
              Night Night! 😴
            </h3>
            <p className="font-mono text-sm sm:text-lg text-zinc-300 mt-2 max-w-md">
              Steph Curry puts the game to sleep with an ice-cold buzzer beater splash!
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-950/60 px-4 py-1.5 rounded-full border border-cyan-500/40">
              <Sparkles className="w-4 h-4 text-curry-gold animate-spin" />
              <span>Drained from 35 Feet • 100% Perfect Green Release</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* On-Screen Feedback Badge */}
      <AnimatePresence>
        {shotQuality && (
          <motion.div
            key={shotQuality.id}
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -15 }}
            className={`absolute top-6 left-1/2 -translate-x-1/2 z-30 px-6 py-2 rounded-full glass-pill border shadow-2xl flex items-center gap-2 font-display ${
              shotQuality.type === 'green'
                ? 'border-cyan-400 bg-cyan-950/90 text-cyan-300'
                : shotQuality.type === 'yellow'
                  ? 'border-curry-gold bg-amber-950/90 text-curry-gold'
                  : 'border-red-500 bg-red-950/90 text-red-300'
            }`}
          >
            <Sparkles className="w-4 h-4 text-curry-gold" />
            <span className="font-extrabold text-sm sm:text-base tracking-wide uppercase">
              {shotQuality.text}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header & Live Stat Dashboard */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-curry-gold uppercase tracking-widest">
            <Flame className="w-4 h-4 text-curry-gold animate-pulse" />
            <span>Steph Curry #30 Shootout Arena</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
            The Splash Zone 🏀
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            {controlMode === "CLICK_AIM" 
              ? "🎯 Aim with cursor/touch & click anywhere to fire directly into the rim!" 
              : "🟢 Press & HOLD [SPACE] or click court — release in the Green Zone!"}
          </p>
        </div>

        {/* Live Score Counters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-black/60 border border-white/10 text-center min-w-[70px]">
            <div className="text-[10px] font-mono text-zinc-500 uppercase">Score</div>
            <div className="text-xl font-bold font-display text-curry-gold">{score} PTS</div>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-black/60 border border-curry-gold/30 text-center min-w-[70px]">
            <div className="text-[10px] font-mono text-zinc-500 uppercase flex items-center justify-center gap-1">
              <Flame className="w-3 h-3 text-curry-gold" /> Streak
            </div>
            <div className="text-xl font-bold font-display text-white">{streak}x</div>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-black/60 border border-white/10 text-center min-w-[70px]">
            <div className="text-[10px] font-mono text-zinc-500 uppercase">FG%</div>
            <div className="text-xl font-bold font-mono text-emerald-400">{fgPct}%</div>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-black/60 border border-white/10 text-center min-w-[70px]">
            <div className="text-[10px] font-mono text-zinc-500 uppercase">3PM / ATT</div>
            <div className="text-sm font-bold font-mono text-zinc-300 mt-1">{shotsMade}/{shotsAttempted}</div>
          </div>
        </div>
      </div>

      {/* Controls: Difficulty + Aim Mode + Night Night */}
      <div className="flex flex-wrap items-center justify-between gap-3 my-4">
        
        {/* Difficulty Level Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-zinc-400">Difficulty:</span>
          {Object.entries(diffConfigs).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => {
                sounds.playClick();
                setDifficulty(key);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                difficulty === key
                  ? `${cfg.bg} ${cfg.color} ${cfg.border} font-bold shadow-md`
                  : 'bg-white/5 text-zinc-400 hover:text-white border-white/10'
              }`}
            >
              {key === "ROOKIE" ? "🟢 Rookie" : key === "ALL_STAR" ? "🟡 All-Star" : "🔥 Hall of Fame (2x)"}
            </button>
          ))}
        </div>

        {/* Shooting Mechanics Toggle & Curry Night Night */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-2xl border border-white/10">
            <button
              onClick={() => {
                sounds.playClick();
                setControlMode("CLICK_AIM");
              }}
              className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
                controlMode === "CLICK_AIM"
                  ? 'bg-curry-gold text-black font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              🎯 Click Aim
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setControlMode("METER");
              }}
              className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
                controlMode === "METER"
                  ? 'bg-cyan-400 text-black font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              🟢 2K Meter
            </button>
          </div>

          {/* 😴 CURRY NIGHT NIGHT CELEBRATION */}
          <button
            onClick={triggerNightNightCelebration}
            className="group flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-curry-gold via-amber-400 to-yellow-300 text-black font-display font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl hover:shadow-curry-gold/40 hover:scale-105"
          >
            <span className="text-base group-hover:rotate-12 transition-transform">😴</span>
            <span>Curry Night Night!</span>
            <Moon className="w-3.5 h-3.5" />
          </button>

          {/* Reset */}
          <button
            onClick={() => {
              sounds.playClick();
              setScore(0);
              setStreak(0);
              setShotsMade(0);
              setShotsAttempted(0);
              resetBall();
            }}
            title="Reset Scoreboard"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Court Canvas */}
      <div 
        className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#08080b] cursor-crosshair select-none touch-none shadow-inner"
      >
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerUp}
          className="w-full h-[400px] block"
        />

        {/* Dynamic Instructional Helper Badge */}
        <div className="absolute bottom-4 left-4 pointer-events-none text-[11px] font-mono text-zinc-300 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-curry-gold" />
          <span>
            {difficulty === "HOF" 
              ? "🔥 Hall of Fame: Fast moving rim + 2x Score Multiplier!" 
              : controlMode === "CLICK_AIM" 
                ? "Move cursor over the hoop or court & click to drain the shot!" 
                : "Press & HOLD on the court or SPACEBAR, release in the Green Zone!"}
          </span>
        </div>
      </div>

    </div>
  );
};
