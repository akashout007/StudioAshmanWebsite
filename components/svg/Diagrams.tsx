/* Architectural ink-drawing SVG diagrams — ported from original HTML prototype */

interface DiagProps {
  label?: string
  caption?: string
}

export function DiagWayfinding({ caption, label }: DiagProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#0e0e0d" />
      {/* faint grid */}
      {Array.from({ length: 13 }).map((_, i) => (
        <line key={'v' + i} x1={i * 32} y1="0" x2={i * 32} y2="300" stroke="#1c1c1a" strokeWidth=".5" />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={'h' + i} x1="0" y1={i * 32} x2="400" y2={i * 32} stroke="#1c1c1a" strokeWidth=".5" />
      ))}
      {/* terminal floorplate */}
      <rect x="40" y="80" width="320" height="140" fill="none" stroke="#3a3530" strokeWidth=".7" />
      <line x1="40" y1="120" x2="360" y2="120" stroke="#3a3530" strokeWidth=".5" strokeDasharray="2 3" />
      <line x1="40" y1="180" x2="360" y2="180" stroke="#3a3530" strokeWidth=".5" strokeDasharray="2 3" />
      <line x1="120" y1="80" x2="120" y2="220" stroke="#3a3530" strokeWidth=".5" strokeDasharray="2 3" />
      <line x1="280" y1="80" x2="280" y2="220" stroke="#3a3530" strokeWidth=".5" strokeDasharray="2 3" />
      {/* main wayfinding path */}
      <path d="M 60 270 L 60 200 L 180 200 L 180 100 L 340 100" fill="none" stroke="#c8502a" strokeWidth="1.6" />
      {/* nodes */}
      <circle cx="60" cy="270" r="4" fill="#c8502a" />
      <circle cx="180" cy="200" r="3" fill="none" stroke="#c8502a" strokeWidth="1" />
      <circle cx="180" cy="100" r="3" fill="none" stroke="#c8502a" strokeWidth="1" />
      <circle cx="340" cy="100" r="6" fill="none" stroke="#c8502a" strokeWidth="1.2" />
      <circle cx="340" cy="100" r="2" fill="#c8502a" />
      {/* arrowhead */}
      <path d="M 332 96 L 340 100 L 332 104" fill="none" stroke="#c8502a" strokeWidth="1.2" />
      {/* legend */}
      <line x1="20" y1="40" x2="40" y2="40" stroke="#c8502a" strokeWidth="1" />
      <text x="48" y="44" fontFamily="sans-serif" fontSize="7" letterSpacing="1.2" fill="#7a7670">PRIMARY ROUTE</text>
      {/* ghost wordmark */}
      <text x="200" y="170" fontFamily="serif" fontSize="42" fontWeight="900" textAnchor="middle" fill="#faf9f6" opacity=".05" fontStyle="italic">wayfinding</text>
      {(caption || label) && <text x="20" y="290" fontFamily="sans-serif" fontSize="7" letterSpacing="1.5" fill="#7a7670">{caption || label}</text>}
    </svg>
  )
}

export function DiagSign({ label }: DiagProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#0e0e0d" />
      {/* floor reference */}
      <line x1="0" y1="240" x2="400" y2="240" stroke="#3a3530" strokeWidth=".7" />
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={i} x1={i * 22} y1="240" x2={i * 22 - 8} y2="252" stroke="#3a3530" strokeWidth=".4" />
      ))}
      {/* sign post */}
      <rect x="196" y="60" width="8" height="180" fill="none" stroke="#7a7670" strokeWidth=".6" />
      {/* sign blade */}
      <rect x="120" y="80" width="160" height="56" fill="#1c1c1a" stroke="#c8502a" strokeWidth=".8" />
      <text x="200" y="115" fontFamily="sans-serif" fontSize="13" letterSpacing="3" textAnchor="middle" fill="#f2efe8" fontWeight="700">GATE 47A →</text>
      {/* dimension lines */}
      <line x1="60" y1="80" x2="100" y2="80" stroke="#7a7670" strokeWidth=".4" />
      <line x1="60" y1="136" x2="100" y2="136" stroke="#7a7670" strokeWidth=".4" />
      <line x1="80" y1="80" x2="80" y2="136" stroke="#7a7670" strokeWidth=".4" />
      <text x="84" y="112" fontFamily="sans-serif" fontSize="7" fill="#7a7670">600mm</text>
      <circle cx="200" cy="240" r="5" fill="#c8502a" />
      <text x="200" y="200" fontFamily="serif" fontSize="38" fontWeight="900" fontStyle="italic" textAnchor="middle" fill="#f2efe8" opacity=".04">signage</text>
      {label && <text x="20" y="284" fontFamily="sans-serif" fontSize="7" letterSpacing="1.5" fill="#7a7670">{label}</text>}
    </svg>
  )
}

export function DiagActivation({ label }: DiagProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#0e0e0d" />
      {[60, 100, 140, 180].map((r) => (
        <circle key={r} cx="200" cy="160" r={r} fill="none"
          stroke={r === 60 ? '#c8502a' : '#3a3530'} strokeWidth=".7"
          opacity={r === 60 ? 1 : .7} />
      ))}
      <rect x="170" y="130" width="60" height="60" fill="none" stroke="#c8502a" strokeWidth="1.4" />
      <line x1="170" y1="130" x2="230" y2="190" stroke="#c8502a" strokeWidth=".5" opacity=".5" />
      <line x1="230" y1="130" x2="170" y2="190" stroke="#c8502a" strokeWidth=".5" opacity=".5" />
      {[0, 60, 120, 180, 240, 300].map((a) => {
        const rad = a * Math.PI / 180
        const x1 = 200 + Math.cos(rad) * 200
        const y1 = 160 + Math.sin(rad) * 200
        const x2 = 200 + Math.cos(rad) * 145
        const y2 = 160 + Math.sin(rad) * 145
        return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7a7670" strokeWidth=".4" strokeDasharray="2 3" />
      })}
      {Array.from({ length: 8 }).map((_, i) =>
        Array.from({ length: 6 }).map((_, j) => (
          <circle key={i + '_' + j} cx={50 + i * 40} cy={50 + j * 38} r=".7" fill="#3a3530" />
        ))
      )}
      <text x="200" y="58" fontFamily="serif" fontSize="20" fontStyle="italic" fontWeight="700" textAnchor="middle" fill="#f2efe8" opacity=".07">activation</text>
      {label && <text x="20" y="284" fontFamily="sans-serif" fontSize="7" letterSpacing="1.5" fill="#7a7670">{label}</text>}
    </svg>
  )
}

export function DiagFacade({ label }: DiagProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#0e0e0d" />
      {Array.from({ length: 8 }).map((_, i) =>
        Array.from({ length: 5 }).map((_, j) => (
          <rect key={i + '_' + j} x={40 + i * 42} y={40 + j * 42} width="40" height="40" fill="none" stroke="#2c2925" strokeWidth=".5" />
        ))
      )}
      <rect x="124" y="40" width="40" height="210" fill="#c8502a" opacity=".15" />
      <rect x="124" y="40" width="40" height="210" fill="none" stroke="#c8502a" strokeWidth=".7" />
      <text x="144" y="190" fontFamily="serif" fontSize="120" fontStyle="italic" fontWeight="700" textAnchor="middle" fill="#c8502a">G</text>
      <line x1="20" y1="252" x2="380" y2="252" stroke="#7a7670" strokeWidth=".5" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1={20 + i * 32} y1="252" x2={12 + i * 32} y2="262" stroke="#7a7670" strokeWidth=".4" />
      ))}
      <line x1="290" y1="40" x2="320" y2="40" stroke="#7a7670" strokeWidth=".4" />
      <line x1="290" y1="250" x2="320" y2="250" stroke="#7a7670" strokeWidth=".4" />
      <line x1="305" y1="40" x2="305" y2="250" stroke="#7a7670" strokeWidth=".4" />
      <text x="312" y="148" fontFamily="sans-serif" fontSize="7" fill="#7a7670" transform="rotate(90 312 148)">14.2m</text>
      {label && <text x="20" y="284" fontFamily="sans-serif" fontSize="7" letterSpacing="1.5" fill="#7a7670">{label}</text>}
    </svg>
  )
}

export function DiagFloorplan({ label }: DiagProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#0e0e0d" />
      <rect x="40" y="40" width="320" height="220" fill="none" stroke="#3a3530" strokeWidth="1" />
      <line x1="160" y1="40" x2="160" y2="180" stroke="#3a3530" strokeWidth=".7" />
      <line x1="40" y1="180" x2="280" y2="180" stroke="#3a3530" strokeWidth=".7" />
      <line x1="280" y1="100" x2="360" y2="100" stroke="#3a3530" strokeWidth=".7" />
      <line x1="280" y1="100" x2="280" y2="260" stroke="#3a3530" strokeWidth=".7" />
      <circle cx="100" cy="220" r="32" fill="none" stroke="#7a7670" strokeWidth=".5" strokeDasharray="2 3" />
      <circle cx="220" cy="130" r="22" fill="none" stroke="#7a7670" strokeWidth=".5" strokeDasharray="2 3" />
      <path d="M 60 250 L 100 220 L 160 200 L 220 130 L 300 130 L 340 100" fill="none" stroke="#c8502a" strokeWidth="1.4" />
      <circle cx="60" cy="250" r="4" fill="#c8502a" />
      <circle cx="340" cy="100" r="4" fill="none" stroke="#c8502a" strokeWidth="1.2" />
      <circle cx="340" cy="100" r="1.8" fill="#c8502a" />
      <text x="200" y="68" fontFamily="serif" fontSize="22" fontWeight="700" fontStyle="italic" textAnchor="middle" fill="#f2efe8" opacity=".07">plan north ↑</text>
      {label && <text x="20" y="284" fontFamily="sans-serif" fontSize="7" letterSpacing="1.5" fill="#7a7670">{label}</text>}
    </svg>
  )
}

export function DiagSection({ label }: DiagProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#0e0e0d" />
      <line x1="20" y1="240" x2="380" y2="240" stroke="#3a3530" strokeWidth=".7" />
      <path d="M 40 240 L 40 100 L 80 60 L 200 60 L 200 100 L 320 100 L 360 80 L 360 240" fill="none" stroke="#3a3530" strokeWidth=".8" />
      <line x1="40" y1="180" x2="200" y2="180" stroke="#3a3530" strokeWidth=".5" strokeDasharray="2 2" />
      <line x1="40" y1="140" x2="200" y2="140" stroke="#3a3530" strokeWidth=".5" strokeDasharray="2 2" />
      <line x1="200" y1="180" x2="360" y2="180" stroke="#3a3530" strokeWidth=".5" strokeDasharray="2 2" />
      <rect x="280" y="120" width="60" height="40" fill="#c8502a" opacity=".15" />
      <rect x="280" y="120" width="60" height="40" fill="none" stroke="#c8502a" strokeWidth=".8" />
      <text x="310" y="146" fontFamily="sans-serif" fontSize="9" letterSpacing="2" textAnchor="middle" fill="#e8b49e" fontWeight="700">LIBRARY</text>
      <line x1="60" y1="240" x2="60" y2="220" stroke="#7a7670" strokeWidth=".5" />
      <circle cx="60" cy="216" r="2.5" fill="none" stroke="#7a7670" strokeWidth=".5" />
      <line x1="80" y1="240" x2="80" y2="220" stroke="#7a7670" strokeWidth=".5" />
      <circle cx="80" cy="216" r="2.5" fill="none" stroke="#7a7670" strokeWidth=".5" />
      <text x="20" y="62" fontFamily="sans-serif" fontSize="7" letterSpacing="2" fill="#7a7670">NORTH ELEVATION</text>
      <text x="20" y="252" fontFamily="sans-serif" fontSize="7" letterSpacing="2" fill="#7a7670">G.F. +0.000</text>
      <text x="380" y="88" fontFamily="serif" fontSize="10" textAnchor="end" fill="#7a7670" opacity=".5">A–A&apos;</text>
      {label && <text x="20" y="284" fontFamily="sans-serif" fontSize="7" letterSpacing="1.5" fill="#7a7670">{label}</text>}
    </svg>
  )
}

export function DiagTransit({ label }: DiagProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#0e0e0d" />
      <line x1="200" y1="150" x2="40" y2="50" stroke="#3a3530" strokeWidth=".5" />
      <line x1="200" y1="150" x2="360" y2="50" stroke="#3a3530" strokeWidth=".5" />
      <line x1="200" y1="150" x2="40" y2="250" stroke="#3a3530" strokeWidth=".5" />
      <line x1="200" y1="150" x2="360" y2="250" stroke="#3a3530" strokeWidth=".5" />
      <line x1="200" y1="150" x2="200" y2="20" stroke="#3a3530" strokeWidth=".5" />
      <line x1="200" y1="150" x2="200" y2="280" stroke="#3a3530" strokeWidth=".5" />
      <line x1="200" y1="150" x2="20" y2="150" stroke="#3a3530" strokeWidth=".5" />
      <line x1="200" y1="150" x2="380" y2="150" stroke="#3a3530" strokeWidth=".5" />
      <circle cx="200" cy="150" r="100" fill="none" stroke="#3a3530" strokeWidth=".5" strokeDasharray="3 4" />
      {([[40, 50], [360, 50], [40, 250], [360, 250], [200, 20], [200, 280], [20, 150], [380, 150]] as [number,number][]).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="none" stroke="#7a7670" strokeWidth=".7" />
      ))}
      <path d="M 20 150 L 200 150 L 360 50" fill="none" stroke="#c8502a" strokeWidth="1.6" />
      <circle cx="200" cy="150" r="6" fill="#0e0e0d" stroke="#c8502a" strokeWidth="1.4" />
      <circle cx="200" cy="150" r="2" fill="#c8502a" />
      <circle cx="20" cy="150" r="4" fill="#c8502a" />
      <circle cx="360" cy="50" r="4" fill="#c8502a" />
      <text x="200" y="100" fontFamily="serif" fontSize="16" fontStyle="italic" fontWeight="700" textAnchor="middle" fill="#f2efe8" opacity=".07">interchange</text>
      {label && <text x="20" y="284" fontFamily="sans-serif" fontSize="7" letterSpacing="1.5" fill="#7a7670">{label}</text>}
    </svg>
  )
}

export function DiagRetail({ label }: DiagProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#0e0e0d" />
      <rect x="40" y="40" width="320" height="200" fill="none" stroke="#3a3530" strokeWidth="1" />
      <line x1="40" y1="80" x2="360" y2="80" stroke="#3a3530" strokeWidth=".5" />
      <line x1="40" y1="200" x2="360" y2="200" stroke="#3a3530" strokeWidth=".5" />
      <text x="200" y="160" fontFamily="serif" fontSize="60" fontStyle="italic" fontWeight="700" textAnchor="middle" fill="#c8502a" letterSpacing="-2">Halden</text>
      <line x1="120" y1="80" x2="120" y2="200" stroke="#3a3530" strokeWidth=".5" />
      <line x1="200" y1="80" x2="200" y2="200" stroke="#3a3530" strokeWidth=".5" />
      <line x1="280" y1="80" x2="280" y2="200" stroke="#3a3530" strokeWidth=".5" />
      <rect x="120" y="60" width="160" height="20" fill="#1c1c1a" stroke="#c8502a" strokeWidth=".5" />
      <text x="200" y="74" fontFamily="sans-serif" fontSize="7" letterSpacing="2.5" textAnchor="middle" fill="#e8b49e" fontWeight="700">ESPRESSO BAR</text>
      <circle cx="100" cy="220" r="4" fill="none" stroke="#7a7670" strokeWidth=".5" />
      <circle cx="320" cy="222" r="4" fill="none" stroke="#7a7670" strokeWidth=".5" />
      <line x1="40" y1="240" x2="360" y2="240" stroke="#3a3530" strokeWidth=".5" />
      {label && <text x="20" y="284" fontFamily="sans-serif" fontSize="7" letterSpacing="1.5" fill="#7a7670">{label}</text>}
    </svg>
  )
}
