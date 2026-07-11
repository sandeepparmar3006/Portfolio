// Ambient data-graph field: slow-drifting nodes, distance-based connecting lines, pointer brightens nearby links.
import { getThemeColors } from './colors';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  radius: number;
}

const DESKTOP_COUNT = 70;
const MOBILE_COUNT = 40;
const CONNECT_DIST = 130;
const POINTER_RADIUS = 150;
const POINTER_REPEL = 0.035;
const JITTER = 0.02;
const DAMPING = 0.98;
const MAX_SPEED = 0.35;

function withAlpha(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function distTo(p: { x: number; y: number }, q: { x: number; y: number }) {
  return Math.hypot(p.x - q.x, p.y - q.y);
}

export class ParticleField {
  private ctx: CanvasRenderingContext2D;
  private colors = getThemeColors();
  private count: number;
  private particles: Particle[] = [];
  private width = 0;
  private height = 0;
  private dpr = 1;
  private pointer: { x: number; y: number } | null = null;

  constructor(ctx: CanvasRenderingContext2D, opts: { isMobile?: boolean } = {}) {
    this.ctx = ctx;
    this.count = opts.isMobile ? MOBILE_COUNT : DESKTOP_COUNT;
  }

  private createParticle(): Particle {
    const roll = Math.random();
    const color = roll < 0.08 ? this.colors.data : roll < 0.16 ? this.colors.signal : this.colors.dim;
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      color,
      radius: Math.random() < 0.16 ? 2.2 : 1.4,
    };
  }

  resize(cssWidth: number, cssHeight: number, dpr: number) {
    this.width = cssWidth;
    this.height = cssHeight;
    this.dpr = dpr;
    if (this.particles.length === 0) {
      for (let i = 0; i < this.count; i++) this.particles.push(this.createParticle());
    } else {
      for (const p of this.particles) {
        p.x = Math.min(p.x, cssWidth);
        p.y = Math.min(p.y, cssHeight);
      }
    }
  }

  setPointer(x: number | null, y: number | null) {
    this.pointer = x === null || y === null ? null : { x, y };
  }

  step(dt: number) {
    const scale = Math.min(dt, 1 / 20) * 60;
    for (const p of this.particles) {
      p.vx += (Math.random() - 0.5) * JITTER;
      p.vy += (Math.random() - 0.5) * JITTER;

      if (this.pointer) {
        const dx = p.x - this.pointer.x;
        const dy = p.y - this.pointer.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < POINTER_RADIUS * POINTER_RADIUS && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / POINTER_RADIUS) * POINTER_REPEL;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      p.vx *= DAMPING;
      p.vy *= DAMPING;
      const speed = Math.hypot(p.vx, p.vy);
      if (speed > MAX_SPEED) {
        p.vx = (p.vx / speed) * MAX_SPEED;
        p.vy = (p.vy / speed) * MAX_SPEED;
      }

      p.x += p.vx * scale;
      p.y += p.vy * scale;

      if (p.x < 0) { p.x = 0; p.vx *= -1; }
      if (p.x > this.width) { p.x = this.width; p.vx *= -1; }
      if (p.y < 0) { p.y = 0; p.vy *= -1; }
      if (p.y > this.height) { p.y = this.height; p.vy *= -1; }
    }
  }

  render() {
    const ctx = this.ctx;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.width, this.height);

    // O(n^2) pairwise check; fine at this.count <= 70, revisit with a spatial grid if count grows.
    for (let i = 0; i < this.particles.length; i++) {
      const a = this.particles[i];
      for (let j = i + 1; j < this.particles.length; j++) {
        const b = this.particles[j];
        const dist = distTo(a, b);
        if (dist > CONNECT_DIST) continue;
        const nearPointer = this.pointer
          ? Math.min(distTo(a, this.pointer), distTo(b, this.pointer)) < POINTER_RADIUS
          : false;
        const alpha = (1 - dist / CONNECT_DIST) * (nearPointer ? 0.5 : 0.14);
        ctx.strokeStyle = nearPointer ? withAlpha(this.colors.pulse, alpha) : withAlpha(this.colors.ink, alpha);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    for (const p of this.particles) {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  dispose() {
    this.particles = [];
  }
}
