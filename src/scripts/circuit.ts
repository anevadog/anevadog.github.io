/*
 * Circuito del Hero (ADR-016): un chip «AN» del que salen pistas a 45°, con
 * pulsos que las recorren. El trazado es determinista (misma semilla en cada
 * visita). Las pistas se pintan una vez en un lienzo auxiliar; cada fotograma
 * solo dibuja los pulsos. Se detiene fuera de pantalla, con la pestaña oculta
 * y con movimiento reducido (queda la imagen estática).
 */
type Point = [number, number];

interface Trace {
  points: Point[];
  cumulative: number[];
  length: number;
  /** Índice en `DIRS` de la dirección de salida del pin. */
  direction: number;
}

interface Pulse {
  trace: Trace;
  distance: number;
  speed: number;
}

interface Chip {
  x: number;
  y: number;
  size: number;
  pins: number;
}

const GRID = 22;
const WIDE = 860;
const TAIL = 70;
const TAU = Math.PI * 2;
const DIRS: Point[] = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];
const TURNS = [-1, 0, 1];
const COLOR_KEYS = ["trace", "pad", "chip", "silk", "pulse", "bg"] as const;

type ColorKey = (typeof COLOR_KEYS)[number];

export function initCircuit(canvas: HTMLCanvasElement) {
  const host = canvas.parentElement;
  const ctx = canvas.getContext("2d");
  const layer = document.createElement("canvas");
  const layerCtx = layer.getContext("2d");
  if (!host || !ctx || !layerCtx) return;

  const root = document.documentElement;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const colors = {} as Record<ColorKey, string>;

  let width = 0;
  let height = 0;
  let ratio = 1;
  let chip: Chip | null = null;
  let traces: Trace[] = [];
  let pulses: Pulse[] = [];
  let frameId = 0;
  let last = 0;
  let onScreen = true;
  let seed = 7;

  // Generador con semilla (mulberry32): el dibujo no cambia entre visitas.
  const random = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const randomInt = (max: number) => Math.floor(random() * max);

  function readColors() {
    const styles = getComputedStyle(root);
    for (const key of COLOR_KEYS) {
      colors[key] = styles.getPropertyValue(`--color-${key}`).trim();
    }
  }

  function walk(
    startX: number,
    startY: number,
    direction: number,
    occupied: Set<string>,
    columns: number,
    rows: number,
  ): Trace | null {
    const cells: Point[] = [[startX, startY]];
    let x = startX;
    let y = startY;
    let heading = direction;
    let blocked = false;
    const segments = 3 + randomInt(5);

    for (let segment = 0; segment < segments && !blocked; segment++) {
      const steps = segment === 0 ? 2 + randomInt(3) : 2 + randomInt(8);
      const [dx, dy] = DIRS[heading]!;
      for (let step = 0; step < steps; step++) {
        const nextX = x + dx;
        const nextY = y + dy;
        const key = `${nextX},${nextY}`;
        if (
          nextX < -1 ||
          nextY < -1 ||
          nextX > columns + 1 ||
          nextY > rows + 1 ||
          occupied.has(key)
        ) {
          blocked = true;
          break;
        }
        x = nextX;
        y = nextY;
        occupied.add(key);
      }
      const previous = cells[cells.length - 1]!;
      if (x !== previous[0] || y !== previous[1]) cells.push([x, y]);
      heading = (direction + TURNS[randomInt(3)]! + 8) % 8;
    }

    if (cells.length < 2) return null;

    const points = cells.map(([cx, cy]): Point => [cx * GRID, cy * GRID]);
    const cumulative = [0];
    for (let i = 1; i < points.length; i++) {
      const [ax, ay] = points[i - 1]!;
      const [bx, by] = points[i]!;
      cumulative.push(cumulative[i - 1]! + Math.hypot(bx - ax, by - ay));
    }
    return {
      points,
      cumulative,
      length: cumulative[cumulative.length - 1]!,
      direction,
    };
  }

  function build() {
    const rect = host!.getBoundingClientRect();
    width = Math.round(rect.width);
    height = Math.round(rect.height);
    if (!width || !height) return;

    ratio = Math.min(window.devicePixelRatio || 1, 2);
    for (const target of [canvas, layer]) {
      target.width = width * ratio;
      target.height = height * ratio;
    }

    seed = 7;
    traces = [];
    pulses = [];

    const wide = width >= WIDE;
    const pins = wide ? 6 : 4;
    const columns = Math.ceil(width / GRID);
    const rows = Math.ceil(height / GRID);
    // En pantallas estrechas el chip queda fuera, a la derecha: solo entran
    // sus pistas, para no competir con el texto.
    const gridX = wide
      ? Math.round((width * 0.78) / GRID) - Math.floor((pins + 1) / 2)
      : columns + 2;
    const gridY =
      Math.round((height * (wide ? 0.42 : 0.4)) / GRID) -
      Math.floor((pins + 1) / 2);
    chip = { x: gridX * GRID, y: gridY * GRID, size: (pins + 1) * GRID, pins };

    const occupied = new Set<string>();
    for (let cx = gridX - 1; cx <= gridX + pins + 2; cx++) {
      for (let cy = gridY - 1; cy <= gridY + pins + 2; cy++) {
        occupied.add(`${cx},${cy}`);
      }
    }

    const starts: [number, number, number][] = [];
    for (let pin = 1; pin <= pins; pin++) {
      starts.push(
        [gridX + pins + 2, gridY + pin, 0],
        [gridX + pin, gridY + pins + 2, 2],
        [gridX - 1, gridY + pin, 4],
        [gridX + pin, gridY - 1, 6],
      );
    }
    for (const [startX, startY, direction] of starts) {
      occupied.delete(`${startX},${startY}`);
      const trace = walk(startX, startY, direction, occupied, columns, rows);
      if (trace) traces.push(trace);
    }

    paint();
  }

  /** Pinta la capa estática: pistas, pads y chip. */
  function paint() {
    if (!chip || !layerCtx || !width) return;
    readColors();
    const c = layerCtx;
    c.setTransform(ratio, 0, 0, ratio, 0, 0);
    c.clearRect(0, 0, width, height);
    c.lineJoin = "round";
    c.lineCap = "round";

    c.lineWidth = 1.4;
    c.strokeStyle = colors.trace;
    for (const trace of traces) {
      const [dx, dy] = DIRS[trace.direction]!;
      const [startX, startY] = trace.points[0]!;
      c.beginPath();
      // Tramo del pin hasta el cuerpo del chip.
      c.moveTo(startX - dx * GRID, startY - dy * GRID);
      for (const [px, py] of trace.points) c.lineTo(px, py);
      c.stroke();
    }

    c.lineWidth = 1.6;
    c.strokeStyle = colors.pad;
    c.fillStyle = colors.bg;
    for (const trace of traces) {
      const [endX, endY] = trace.points[trace.points.length - 1]!;
      c.beginPath();
      c.arc(endX, endY, 4, 0, TAU);
      c.fill();
      c.stroke();
    }

    const { x, y, size, pins } = chip;
    const pinLength = GRID * 0.55;
    c.fillStyle = colors.pad;
    for (let pin = 1; pin <= pins; pin++) {
      const offset = pin * GRID - 3;
      c.fillRect(x + size - 2, y + offset, pinLength, 6);
      c.fillRect(x - pinLength + 2, y + offset, pinLength, 6);
      c.fillRect(x + offset, y + size - 2, 6, pinLength);
      c.fillRect(x + offset, y - pinLength + 2, 6, pinLength);
    }

    c.beginPath();
    if (c.roundRect) c.roundRect(x, y, size, size, 8);
    else c.rect(x, y, size, size);
    c.fillStyle = colors.chip;
    c.fill();
    c.lineWidth = 1.2;
    c.strokeStyle = colors.pad;
    c.stroke();

    // Marca del pin 1 y serigrafía.
    c.beginPath();
    c.arc(x + 14, y + 14, 3, 0, TAU);
    c.fillStyle = colors.pad;
    c.fill();
    c.fillStyle = colors.silk;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.font = `800 ${Math.round(size * 0.3)}px "Archivo Variable", sans-serif`;
    c.fillText("AN", x + size / 2, y + size / 2 - 2);
    c.font = `500 ${Math.max(8, Math.round(size * 0.075))}px "Geist Mono Variable", monospace`;
    c.fillText("SVQ · 2026", x + size / 2, y + size * 0.78);

    draw();
  }

  /** Puntos de la pista entre dos distancias medidas desde su origen. */
  function slice(trace: Trace, from: number, to: number): Point[] | null {
    const a = Math.max(0, from);
    const b = Math.min(trace.length, to);
    if (b <= a) return null;

    const result: Point[] = [];
    for (let i = 1; i < trace.points.length; i++) {
      const c0 = trace.cumulative[i - 1]!;
      const c1 = trace.cumulative[i]!;
      if (c1 < a || c0 > b) continue;
      const [px, py] = trace.points[i - 1]!;
      const [qx, qy] = trace.points[i]!;
      const f0 = (Math.max(a, c0) - c0) / (c1 - c0);
      const f1 = (Math.min(b, c1) - c0) / (c1 - c0);
      if (result.length === 0) {
        result.push([px + (qx - px) * f0, py + (qy - py) * f0]);
      }
      result.push([px + (qx - px) * f1, py + (qy - py) * f1]);
    }
    return result.length > 1 ? result : null;
  }

  function draw() {
    if (!ctx || !width) return;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(layer, 0, 0, width, height);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2;
    ctx.strokeStyle = colors.pulse;
    ctx.fillStyle = colors.pulse;
    ctx.shadowColor = colors.pulse;
    for (const pulse of pulses) {
      const segment = slice(pulse.trace, pulse.distance - TAIL, pulse.distance);
      if (!segment) continue;
      ctx.globalAlpha = 0.85;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(segment[0]![0], segment[0]![1]);
      for (const [px, py] of segment.slice(1)) ctx.lineTo(px, py);
      ctx.stroke();
      if (pulse.distance <= pulse.trace.length) {
        const [headX, headY] = segment[segment.length - 1]!;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(headX, headY, 2.6, 0, TAU);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }

  function tick(now: number) {
    const delta = Math.min(0.05, (now - last) / 1000);
    last = now;

    const max = width >= WIDE ? 7 : 2;
    const candidates = traces.filter((trace) => trace.length > 90);
    if (pulses.length < max && candidates.length > 0 && Math.random() < 0.035) {
      pulses.push({
        trace: candidates[Math.floor(Math.random() * candidates.length)]!,
        distance: 0,
        speed: 110 + Math.random() * 110,
      });
    }
    for (const pulse of pulses) pulse.distance += pulse.speed * delta;
    pulses = pulses.filter(
      (pulse) => pulse.distance - TAIL < pulse.trace.length,
    );

    draw();
    frameId = requestAnimationFrame(tick);
  }

  function play() {
    cancelAnimationFrame(frameId);
    frameId = 0;
    if (reduceMotion.matches || !onScreen || document.hidden) {
      pulses = [];
      draw();
      return;
    }
    last = performance.now();
    frameId = requestAnimationFrame(tick);
  }

  let resizeTimer = 0;
  new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      const rect = host.getBoundingClientRect();
      if (
        Math.round(rect.width) === width &&
        Math.round(rect.height) === height
      ) {
        return;
      }
      build();
      play();
    }, 120);
  }).observe(host);

  new IntersectionObserver((entries) => {
    onScreen = entries.some((entry) => entry.isIntersecting);
    play();
  }).observe(host);

  document.addEventListener("visibilitychange", play);
  reduceMotion.addEventListener("change", play);
  // Cambio de tema: se repinta la capa estática con los tokens nuevos.
  new MutationObserver(paint).observe(root, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  build();
  play();
  // La serigrafía del chip necesita la fuente de títulos ya cargada.
  void document.fonts.ready.then(paint);
}
