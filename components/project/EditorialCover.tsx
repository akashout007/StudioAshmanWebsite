'use client'

import type { ComponentType } from 'react'

// Ashman palette constants
const I = '#0e0e0d'
const P = '#f2efe8'
const P2 = '#ebe7de'
const A = '#c8502a'
const M = '#7a7670'

// Shared background grid overlay
function BgGrid({ dark }: { dark: boolean }) {
  const c = dark ? P : I
  return (
    <>
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`v${i}`} x1={(i + 1) * 80} y1={0} x2={(i + 1) * 80} y2={600}
          stroke={c} strokeOpacity={0.045} strokeWidth={0.5} />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <line key={`h${i}`} x1={0} y1={(i + 1) * 75} x2={800} y2={(i + 1) * 75}
          stroke={c} strokeOpacity={0.045} strokeWidth={0.5} />
      ))}
    </>
  )
}

// Ghost number watermark
function GhostNum({ n, dark }: { n: string; dark: boolean }) {
  return (
    <text x={400} y={380} textAnchor="middle" fontSize={360} fontWeight={700}
      fontFamily="'Playfair Display', Georgia, serif"
      fill={dark ? P : I} opacity={0.035}
      style={{ userSelect: 'none', pointerEvents: 'none' }}>
      {n}
    </text>
  )
}

// Category label (top-left)
function CoverLabel({ text, dark }: { text: string; dark: boolean }) {
  return (
    <text x={44} y={52} fontSize={8} fontWeight={600}
      fontFamily="'Syne', system-ui, sans-serif"
      letterSpacing={2.8} fill={dark ? P : I} opacity={0.45}>
      {text.toUpperCase()}
    </text>
  )
}

// "CASE STUDY IN DEVELOPMENT" band (bottom)
function DevBand() {
  return (
    <g>
      <rect x={0} y={542} width={800} height={58} fill={I} opacity={0.9} />
      <line x1={0} y1={542} x2={800} y2={542} stroke={A} strokeWidth={1} opacity={0.6} />
      <text x={400} y={578} textAnchor="middle" fontSize={8} fontWeight={600}
        fontFamily="'Syne', system-ui, sans-serif"
        letterSpacing={3.5} fill={P} opacity={0.65}>
        CASE STUDY IN DEVELOPMENT
      </text>
    </g>
  )
}

// ─── Cover 01 — Regency Hospital ────────────────────────────────────────────
// Hospital corridor plan: H-plan abstraction, healthcare wayfinding
export function CoverRegency() {
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width={800} height={600} fill={I} />
      <BgGrid dark />
      <GhostNum n="01" dark />

      {/* Main horizontal corridor */}
      <rect x={150} y={260} width={500} height={80} fill="none" stroke={P} strokeWidth={1} strokeOpacity={0.25} />
      {/* Vertical spine — cross form */}
      <rect x={355} y={140} width={90} height={320} fill="none" stroke={P} strokeWidth={1} strokeOpacity={0.25} />

      {/* Room pods — left side */}
      <rect x={104} y={240} width={50} height={40} fill="none" stroke={P} strokeWidth={0.75} strokeOpacity={0.18} />
      <rect x={104} y={292} width={50} height={40} fill="none" stroke={P} strokeWidth={0.75} strokeOpacity={0.18} />
      <rect x={104} y={344} width={50} height={40} fill="none" stroke={P} strokeWidth={0.75} strokeOpacity={0.18} />

      {/* Room pods — right side */}
      <rect x={646} y={240} width={50} height={40} fill="none" stroke={P} strokeWidth={0.75} strokeOpacity={0.18} />
      <rect x={646} y={292} width={50} height={40} fill="none" stroke={P} strokeWidth={0.75} strokeOpacity={0.18} />
      <rect x={646} y={344} width={50} height={40} fill="none" stroke={P} strokeWidth={0.75} strokeOpacity={0.18} />

      {/* Room pods — top */}
      <rect x={318} y={96} width={56} height={46} fill="none" stroke={P} strokeWidth={0.75} strokeOpacity={0.18} />
      <rect x={426} y={96} width={56} height={46} fill="none" stroke={P} strokeWidth={0.75} strokeOpacity={0.18} />

      {/* Room pods — bottom */}
      <rect x={318} y={458} width={56} height={46} fill="none" stroke={P} strokeWidth={0.75} strokeOpacity={0.18} />
      <rect x={426} y={458} width={56} height={46} fill="none" stroke={P} strokeWidth={0.75} strokeOpacity={0.18} />

      {/* Zone divider lines inside corridor */}
      <line x1={260} y1={260} x2={260} y2={340} stroke={P} strokeWidth={0.5} strokeOpacity={0.12} />
      <line x1={355} y1={260} x2={355} y2={340} stroke={P} strokeWidth={0.5} strokeOpacity={0.12} />
      <line x1={445} y1={260} x2={445} y2={340} stroke={P} strokeWidth={0.5} strokeOpacity={0.12} />
      <line x1={540} y1={260} x2={540} y2={340} stroke={P} strokeWidth={0.5} strokeOpacity={0.12} />

      {/* Wayfinding path — accent */}
      <polyline points="154,300 260,300 400,300 400,196" fill="none" stroke={A} strokeWidth={1.5} strokeOpacity={0.9} />
      {/* Arrow head up */}
      <polygon points="400,186 394,200 406,200" fill={A} opacity={0.9} />
      {/* Wayfinding node dots */}
      <circle cx={260} cy={300} r={4} fill={A} opacity={0.9} />
      <circle cx={400} cy={300} r={4} fill={A} opacity={0.9} />

      {/* Cross symbol (healthcare) — top right */}
      <line x1={696} y1={84} x2={696} y2={116} stroke={P} strokeWidth={1.5} strokeOpacity={0.3} />
      <line x1={680} y1={100} x2={712} y2={100} stroke={P} strokeWidth={1.5} strokeOpacity={0.3} />

      <CoverLabel text="Wayfinding · Healthcare" dark />
    </svg>
  )
}

// ─── Cover 02 — ArtNest Studio ──────────────────────────────────────────────
// Abstract nest mark: concentric arcs radiating from a lower center point
export function CoverArtNest() {
  const cx = 400
  const cy = 440

  const arcs = [
    { r: 110, op: 0.55 },
    { r: 175, op: 0.35 },
    { r: 240, op: 0.2 },
  ]

  // Arc from -155° to -25° (opening upward) in radians
  const startAngle = (-155 * Math.PI) / 180
  const endAngle = (-25 * Math.PI) / 180

  const arcPath = (r: number) => {
    const x1 = cx + r * Math.cos(startAngle)
    const y1 = cy + r * Math.sin(startAngle)
    const x2 = cx + r * Math.cos(endAngle)
    const y2 = cy + r * Math.sin(endAngle)
    return `M ${x1.toFixed(1)},${y1.toFixed(1)} A ${r},${r} 0 0,1 ${x2.toFixed(1)},${y2.toFixed(1)}`
  }

  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width={800} height={600} fill={P} />
      <BgGrid dark={false} />
      <GhostNum n="02" dark={false} />

      {/* Concentric arcs — nest form */}
      {arcs.map(({ r, op }, i) => (
        <path key={i} d={arcPath(r)} fill="none" stroke={I} strokeWidth={1.2} opacity={op} />
      ))}

      {/* Endpoint dots on each arc */}
      {arcs.map(({ r, op }, i) => (
        <g key={`dots-${i}`} opacity={op}>
          <circle cx={cx + r * Math.cos(startAngle)} cy={cy + r * Math.sin(startAngle)} r={3} fill={I} />
          <circle cx={cx + r * Math.cos(endAngle)} cy={cy + r * Math.sin(endAngle)} r={3} fill={I} />
        </g>
      ))}

      {/* Central point */}
      <circle cx={cx} cy={cy} r={5} fill="none" stroke={I} strokeWidth={1.2} opacity={0.6} />
      <circle cx={cx} cy={cy} r={1.5} fill={I} opacity={0.6} />

      {/* Accent mark — small horizontal line above nest centre */}
      <line x1={370} y1={cy - 260} x2={430} y2={cy - 260} stroke={A} strokeWidth={1.5} opacity={0.7} />

      {/* Fine register marks */}
      <line x1={48} y1={540} x2={120} y2={540} stroke={I} strokeWidth={0.5} opacity={0.2} />
      <line x1={680} y1={540} x2={752} y2={540} stroke={I} strokeWidth={0.5} opacity={0.2} />

      <CoverLabel text="Brand Identity · Visual Communication" dark={false} />
    </svg>
  )
}

// ─── Cover 03 — Mall of Expressway ──────────────────────────────────────────
// Mixed-use site plan: mall footprint with signage system abstraction
export function CoverMallExpressway() {
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width={800} height={600} fill={I} />
      <BgGrid dark />
      <GhostNum n="03" dark />

      {/* Main building footprint */}
      <rect x={120} y={160} width={560} height={240} fill="none" stroke={P} strokeWidth={1.2} strokeOpacity={0.3} />

      {/* Internal grid — shop divisions (vertical lines) */}
      {[200, 280, 360, 440, 520, 600].map((x) => (
        <line key={x} x1={x} y1={160} x2={x} y2={400} stroke={P} strokeWidth={0.5} strokeOpacity={0.1} />
      ))}
      {/* Internal horizontal divider */}
      <line x1={120} y1={280} x2={680} y2={280} stroke={P} strokeWidth={0.5} strokeOpacity={0.1} />

      {/* Atrium — central void */}
      <rect x={325} y={180} width={150} height={200} fill="none" stroke={P} strokeWidth={0.75} strokeOpacity={0.2} />
      <line x1={325} y1={180} x2={475} y2={380} stroke={P} strokeWidth={0.4} strokeOpacity={0.08} />
      <line x1={475} y1={180} x2={325} y2={380} stroke={P} strokeWidth={0.4} strokeOpacity={0.08} />

      {/* Entry drive — below building */}
      <line x1={120} y1={440} x2={680} y2={440} stroke={P} strokeWidth={1} strokeOpacity={0.2} />
      <line x1={120} y1={470} x2={680} y2={470} stroke={P} strokeWidth={1} strokeOpacity={0.2} />
      {/* Centre line dashes */}
      {[140, 200, 260, 320, 380, 440, 500, 560, 620].map((x) => (
        <line key={x} x1={x} y1={455} x2={x + 40} y2={455} stroke={P} strokeWidth={0.5} strokeOpacity={0.12} strokeDasharray="10 6" />
      ))}

      {/* Sign posts — pylons */}
      {[200, 400, 600].map((x) => (
        <g key={x}>
          <line x1={x} y1={400} x2={x} y2={440} stroke={A} strokeWidth={2} opacity={0.85} />
          <rect x={x - 22} y={388} width={44} height={14} fill="none" stroke={A} strokeWidth={1} opacity={0.85} />
        </g>
      ))}

      {/* Entry nodes */}
      <circle cx={200} cy={160} r={5} fill={A} opacity={0.8} />
      <circle cx={400} cy={160} r={5} fill={A} opacity={0.8} />
      <circle cx={600} cy={160} r={5} fill={A} opacity={0.8} />

      <CoverLabel text="Wayfinding · Mixed-Use" dark />
    </svg>
  )
}

// ─── Cover 04 — Sikka Kaamya Greens ─────────────────────────────────────────
// Residential site plan: tower blocks, green spaces, internal roads
export function CoverSikkaKaamya() {
  // 3×3 grid of blocks
  const blocks = [
    [140, 140], [340, 140], [540, 140],
    [140, 270], [340, 270], [540, 270],
    [140, 400], [340, 400], [540, 400],
  ]
  const junctions = [
    [290, 200], [490, 200],
    [290, 330], [490, 330],
    [290, 460], [490, 460],
  ]

  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width={800} height={600} fill={I} />
      <BgGrid dark />
      <GhostNum n="04" dark />

      {/* Internal roads */}
      <line x1={120} y1={214} x2={660} y2={214} stroke={P} strokeWidth={0.6} strokeOpacity={0.15} />
      <line x1={120} y1={346} x2={660} y2={346} stroke={P} strokeWidth={0.6} strokeOpacity={0.15} />
      <line x1={290} y1={120} x2={290} y2={490} stroke={P} strokeWidth={0.6} strokeOpacity={0.15} />
      <line x1={510} y1={120} x2={510} y2={490} stroke={P} strokeWidth={0.6} strokeOpacity={0.15} />

      {/* Residential blocks */}
      {blocks.map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width={130} height={56} fill="none" stroke={P} strokeWidth={1} strokeOpacity={0.25} />
          {/* Internal block divisions */}
          <line x1={x + 43} y1={y} x2={x + 43} y2={y + 56} stroke={P} strokeWidth={0.4} strokeOpacity={0.1} />
          <line x1={x + 87} y1={y} x2={x + 87} y2={y + 56} stroke={P} strokeWidth={0.4} strokeOpacity={0.1} />
        </g>
      ))}

      {/* Green spaces — circles at block corners */}
      {[
        [122, 122], [520, 122], [122, 456], [520, 456],
        [290, 215], [510, 215],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={16} fill="none" stroke={P} strokeWidth={0.5} strokeOpacity={0.15} />
      ))}
      {[
        [122, 122], [520, 122], [122, 456], [520, 456],
      ].map(([cx, cy], i) => (
        <circle key={`fill-${i}`} cx={cx} cy={cy} r={8} fill={P} opacity={0.07} />
      ))}

      {/* Wayfinding nodes at road junctions */}
      <circle cx={290} cy={214} r={5} fill={A} opacity={0.85} />
      <circle cx={510} cy={214} r={5} fill={A} opacity={0.85} />
      <circle cx={290} cy={346} r={5} fill={A} opacity={0.85} />
      <circle cx={510} cy={346} r={5} fill={A} opacity={0.85} />

      {/* Main entrance arrow */}
      <polyline points="700,300 660,300" fill="none" stroke={A} strokeWidth={1.5} opacity={0.8} />
      <polygon points="660,296 660,304 650,300" fill={A} opacity={0.8} />

      <CoverLabel text="Wayfinding · Residential" dark />
    </svg>
  )
}

// ─── Cover 05 — Bollywood Kabab ──────────────────────────────────────────────
// F&B brand abstraction: medallion mark + kabab element. In development.
export function CoverBollywoodKabab() {
  const cx = 400
  const cy = 280

  // 8-pointed star polygon points
  const outerR = 130
  const innerR = 68
  const points8 = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * Math.PI) / 8 - Math.PI / 2
    const r = i % 2 === 0 ? outerR : innerR
    return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`
  }).join(' ')

  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width={800} height={600} fill={P} />
      <BgGrid dark={false} />
      <GhostNum n="05" dark={false} />

      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={160} fill="none" stroke={I} strokeWidth={0.75} opacity={0.12} />
      <circle cx={cx} cy={cy} r={155} fill="none" stroke={I} strokeWidth={0.5} opacity={0.08} />

      {/* 8-pointed medallion */}
      <polygon points={points8} fill="none" stroke={I} strokeWidth={1} opacity={0.35} />

      {/* Inner circles */}
      <circle cx={cx} cy={cy} r={58} fill="none" stroke={I} strokeWidth={0.75} opacity={0.25} />
      <circle cx={cx} cy={cy} r={30} fill="none" stroke={I} strokeWidth={0.75} opacity={0.2} />

      {/* Accent mark — kabab vertical element */}
      <line x1={cx} y1={cy - 25} x2={cx} y2={cy + 25} stroke={A} strokeWidth={1.5} opacity={0.7} />
      {[-18, 0, 18].map((dy, i) => (
        <circle key={i} cx={cx} cy={cy + dy} r={4.5} fill="none" stroke={A} strokeWidth={1.2} opacity={0.7} />
      ))}

      {/* Decorative dot ring */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 2 * Math.PI) / 12 - Math.PI / 2
        return (
          <circle key={i} cx={cx + 85 * Math.cos(a)} cy={cy + 85 * Math.sin(a)} r={2}
            fill={I} opacity={0.15} />
        )
      })}

      {/* Corner star accents */}
      {[[96, 80], [704, 80], [96, 488], [704, 488]].map(([x, y], i) => (
        <g key={i} opacity={0.2}>
          <line x1={x - 8} y1={y} x2={x + 8} y2={y} stroke={I} strokeWidth={0.75} />
          <line x1={x} y1={y - 8} x2={x} y2={y + 8} stroke={I} strokeWidth={0.75} />
        </g>
      ))}

      <CoverLabel text="Brand Identity · F&B" dark={false} />
      <DevBand />
    </svg>
  )
}

// ─── Cover 08 — Swetafilms ───────────────────────────────────────────────────
// Film brand abstraction: film frames + lens element. In development.
export function CoverSwetafilms() {
  const frames = [170, 310, 450]
  const fW = 110
  const fH = 82
  const fy = 220

  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width={800} height={600} fill={I} />
      <BgGrid dark />
      <GhostNum n="08" dark />

      {/* Film strip track lines */}
      <line x1={120} y1={fy - 18} x2={680} y2={fy - 18} stroke={P} strokeWidth={0.6} strokeOpacity={0.15} />
      <line x1={120} y1={fy + fH + 18} x2={680} y2={fy + fH + 18} stroke={P} strokeWidth={0.6} strokeOpacity={0.15} />

      {/* Sprocket holes */}
      {frames.flatMap((x) =>
        [fy - 30, fy + fH + 14].flatMap((y) =>
          [x + 12, x + 50, x + 88].map((sx, i) => (
            <rect key={`${x}-${y}-${i}`} x={sx - 6} y={y} width={12} height={8}
              rx={2} fill="none" stroke={P} strokeWidth={0.5} strokeOpacity={0.2} />
          ))
        )
      )}

      {/* Film frames */}
      {frames.map((x, i) => (
        <g key={i}>
          <rect x={x} y={fy} width={fW} height={fH} fill="none" stroke={P} strokeWidth={1} strokeOpacity={i === 1 ? 0.5 : 0.25} />
          {/* Crosshatch inside middle frame */}
          {i === 1 && (
            <>
              <line x1={x} y1={fy} x2={x + fW} y2={fy + fH} stroke={P} strokeWidth={0.4} strokeOpacity={0.12} />
              <line x1={x + fW} y1={fy} x2={x} y2={fy + fH} stroke={P} strokeWidth={0.4} strokeOpacity={0.12} />
            </>
          )}
        </g>
      ))}

      {/* Film continuation indicators */}
      <text x={668} y={fy + 46} fontSize={18} fill={P} opacity={0.2}
        fontFamily="'Syne', sans-serif" fontWeight={300}>···</text>

      {/* Lens element — below strip */}
      <circle cx={400} cy={430} r={56} fill="none" stroke={A} strokeWidth={1} opacity={0.6} />
      <circle cx={400} cy={430} r={38} fill="none" stroke={A} strokeWidth={0.6} opacity={0.35} />
      <circle cx={400} cy={430} r={16} fill="none" stroke={A} strokeWidth={0.5} opacity={0.25} />
      <circle cx={400} cy={430} r={4} fill={A} opacity={0.5} />
      {/* Lens aperture blades */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i * Math.PI) / 3
        const x1 = 400 + 20 * Math.cos(a)
        const y1 = 430 + 20 * Math.sin(a)
        const x2 = 400 + 36 * Math.cos(a + Math.PI / 6)
        const y2 = 430 + 36 * Math.sin(a + Math.PI / 6)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={A} strokeWidth={0.5} opacity={0.3} />
      })}

      <CoverLabel text="Brand Identity · Film" dark />
      <DevBand />
    </svg>
  )
}

// ─── Export map keyed by slug ────────────────────────────────────────────────
export const EDITORIAL_COVERS: Record<string, ComponentType> = {
  'regency-hospital':    CoverRegency,
  'artnest-studio':      CoverArtNest,
  'mall-of-expressway':  CoverMallExpressway,
  'sikka-kaamya-greens': CoverSikkaKaamya,
  'bollywood-kabab':     CoverBollywoodKabab,
  'swetafilms':          CoverSwetafilms,
}
