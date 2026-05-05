export default function StudioSVG() {
  return (
    <svg
      viewBox="0 0 480 580"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="480" height="580" fill="#111110" />
      <line x1="0" y1="290" x2="480" y2="290" stroke="#1e1e1c" strokeWidth="0.5" />
      <line x1="240" y1="0" x2="240" y2="580" stroke="#1e1e1c" strokeWidth="0.5" />
      <rect x="60" y="80" width="360" height="420" fill="#161614" />
      <text x="80" y="220" fontFamily="serif" fontSize="88" fill="#f2efe8" opacity="0.03" fontWeight="bold" letterSpacing="-4">STUDIO</text>
      <circle cx="240" cy="290" r="130" fill="none" stroke="#c8502a" strokeWidth="0.8" opacity="0.3" />
      <circle cx="240" cy="290" r="80" fill="none" stroke="#c8502a" strokeWidth="0.5" opacity="0.2" />
      <line x1="110" y1="290" x2="370" y2="290" stroke="#c8502a" strokeWidth="0.5" opacity="0.25" />
      <line x1="240" y1="160" x2="240" y2="420" stroke="#c8502a" strokeWidth="0.5" opacity="0.25" />
      <rect x="60" y="450" width="3" height="50" fill="#c8502a" opacity="0.6" />
      <text x="75" y="478" fontFamily="sans-serif" fontSize="8" fill="#7a7670" letterSpacing="2.5">LONDON — EST. 2012</text>
    </svg>
  )
}
