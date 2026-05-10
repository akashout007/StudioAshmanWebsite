/* global React */
/* Ashman Studio — shared components.
   Loaded as <script type="text/babel" src="js/shared.jsx"></script>
   Components are exported to window for cross-script access. */
const { useState, useEffect, useRef } = React;

/* ─────────────── Inline diagram SVGs (architectural ink-drawing vocabulary) ─────────────── */

window.DiagWayfinding = function DiagWayfinding({ caption }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#0e0e0d" />
      {/* faint grid */}
      {Array.from({ length: 13 }).map((_, i) => <line key={'v' + i} x1={i * 32} y1="0" x2={i * 32} y2="300" stroke="#1c1c1a" strokeWidth=".5" />)}
      {Array.from({ length: 10 }).map((_, i) => <line key={'h' + i} x1="0" y1={i * 32} x2="400" y2={i * 32} stroke="#1c1c1a" strokeWidth=".5" />)}
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
      {/* legend ticks */}
      <line x1="20" y1="40" x2="40" y2="40" stroke="#c8502a" strokeWidth="1" />
      <text x="48" y="44" fontFamily="Syne, sans-serif" fontSize="7" letterSpacing="1.2" fill="#7a7670">PRIMARY ROUTE</text>
      {/* ghost wordmark */}
      <text x="200" y="170" fontFamily="Playfair Display, serif" fontSize="42" fontWeight="900" textAnchor="middle" fill="#faf9f6" opacity=".05" fontStyle="italic">wayfinding</text>
      {caption && <text x="20" y="290" fontFamily="Syne, sans-serif" fontSize="7" letterSpacing="1.5" fill="#7a7670">{caption}</text>}
    </svg>);

};

window.DiagSign = function DiagSign({ label }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#0e0e0d" />
      {/* floor reference */}
      <line x1="0" y1="240" x2="400" y2="240" stroke="#3a3530" strokeWidth=".7" />
      {Array.from({ length: 20 }).map((_, i) => <line key={i} x1={i * 22} y1="240" x2={i * 22 - 8} y2="252" stroke="#3a3530" strokeWidth=".4" />)}
      {/* sign post */}
      <rect x="196" y="60" width="8" height="180" fill="none" stroke="#7a7670" strokeWidth=".6" />
      {/* sign blade */}
      <rect x="120" y="80" width="160" height="56" fill="#1c1c1a" stroke="#c8502a" strokeWidth=".8" />
      <text x="200" y="115" fontFamily="Syne, sans-serif" fontSize="14" letterSpacing="3.5" textAnchor="middle" fill="#f2efe8" fontWeight="700">GATE 47A →</text>
      {/* dimension lines */}
      <line x1="60" y1="80" x2="100" y2="80" stroke="#7a7670" strokeWidth=".4" />
      <line x1="60" y1="136" x2="100" y2="136" stroke="#7a7670" strokeWidth=".4" />
      <line x1="80" y1="80" x2="80" y2="136" stroke="#7a7670" strokeWidth=".4" />
      <text x="84" y="112" fontFamily="Syne, sans-serif" fontSize="7" fill="#7a7670">600mm</text>
      {/* nodes */}
      <circle cx="200" cy="240" r="5" fill="#c8502a" />
      {/* ghost wordmark */}
      <text x="200" y="200" fontFamily="Playfair Display, serif" fontSize="40" fontWeight="900" fontStyle="italic" textAnchor="middle" fill="#f2efe8" opacity=".04">signage</text>
      {label && <text x="20" y="284" fontFamily="Syne, sans-serif" fontSize="7" letterSpacing="1.5" fill="#7a7670">{label}</text>}
    </svg>);

};

window.DiagActivation = function DiagActivation({ label }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#0e0e0d" />
      {/* concentric crowd rings */}
      {[60, 100, 140, 180].map((r) =>
      <circle key={r} cx="200" cy="160" r={r} fill="none" stroke={r === 60 ? '#c8502a' : '#3a3530'} strokeWidth=".7" opacity={r === 60 ? 1 : .7} />
      )}
      {/* footprint */}
      <rect x="170" y="130" width="60" height="60" fill="none" stroke="#c8502a" strokeWidth="1.4" />
      <line x1="170" y1="130" x2="230" y2="190" stroke="#c8502a" strokeWidth=".5" opacity=".5" />
      <line x1="230" y1="130" x2="170" y2="190" stroke="#c8502a" strokeWidth=".5" opacity=".5" />
      {/* approach vectors */}
      {[0, 60, 120, 180, 240, 300].map((a) => {
        const rad = a * Math.PI / 180;
        const x1 = 200 + Math.cos(rad) * 200;
        const y1 = 160 + Math.sin(rad) * 200;
        const x2 = 200 + Math.cos(rad) * 145;
        const y2 = 160 + Math.sin(rad) * 145;
        return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7a7670" strokeWidth=".4" strokeDasharray="2 3" />;
      })}
      {/* dot grid */}
      {Array.from({ length: 8 }).map((_, i) => Array.from({ length: 6 }).map((_, j) => <circle key={i + '_' + j} cx={50 + i * 40} cy={50 + j * 38} r=".7" fill="#3a3530" />))}
      {/* ghost wordmark */}
      <text x="200" y="58" fontFamily="Playfair Display, serif" fontSize="20" fontStyle="italic" fontWeight="700" textAnchor="middle" fill="#f2efe8" opacity=".07">activation</text>
      {label && <text x="20" y="284" fontFamily="Syne, sans-serif" fontSize="7" letterSpacing="1.5" fill="#7a7670">{label}</text>}
    </svg>);

};

window.DiagFacade = function DiagFacade({ label }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#0e0e0d" />
      {/* facade module grid */}
      {Array.from({ length: 8 }).map((_, i) => Array.from({ length: 5 }).map((_, j) =>
      <rect key={i + '_' + j} x={40 + i * 42} y={40 + j * 42} width="40" height="40" fill="none" stroke="#2c2925" strokeWidth=".5" />
      ))}
      {/* terracotta accent column */}
      <rect x="124" y="40" width="40" height="210" fill="#c8502a" opacity=".15" />
      <rect x="124" y="40" width="40" height="210" fill="none" stroke="#c8502a" strokeWidth=".7" />
      {/* big serif G */}
      <text x="144" y="190" fontFamily="Playfair Display, serif" fontSize="120" fontStyle="italic" fontWeight="700" textAnchor="middle" fill="#c8502a">G</text>
      {/* ground line */}
      <line x1="20" y1="252" x2="380" y2="252" stroke="#7a7670" strokeWidth=".5" />
      {Array.from({ length: 12 }).map((_, i) => <line key={i} x1={20 + i * 32} y1="252" x2={12 + i * 32} y2="262" stroke="#7a7670" strokeWidth=".4" />)}
      {/* dimension */}
      <line x1="290" y1="40" x2="320" y2="40" stroke="#7a7670" strokeWidth=".4" />
      <line x1="290" y1="250" x2="320" y2="250" stroke="#7a7670" strokeWidth=".4" />
      <line x1="305" y1="40" x2="305" y2="250" stroke="#7a7670" strokeWidth=".4" />
      <text x="312" y="148" fontFamily="Syne, sans-serif" fontSize="7" fill="#7a7670" transform="rotate(90 312 148)">14.2m</text>
      {label && <text x="20" y="284" fontFamily="Syne, sans-serif" fontSize="7" letterSpacing="1.5" fill="#7a7670">{label}</text>}
    </svg>);

};

window.DiagFloorplan = function DiagFloorplan({ label }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#0e0e0d" />
      {/* outer wall */}
      <rect x="40" y="40" width="320" height="220" fill="none" stroke="#3a3530" strokeWidth="1" />
      {/* internal partitions */}
      <line x1="160" y1="40" x2="160" y2="180" stroke="#3a3530" strokeWidth=".7" />
      <line x1="40" y1="180" x2="280" y2="180" stroke="#3a3530" strokeWidth=".7" />
      <line x1="280" y1="100" x2="360" y2="100" stroke="#3a3530" strokeWidth=".7" />
      <line x1="280" y1="100" x2="280" y2="260" stroke="#3a3530" strokeWidth=".7" />
      {/* circulation atrium circle */}
      <circle cx="100" cy="220" r="32" fill="none" stroke="#7a7670" strokeWidth=".5" strokeDasharray="2 3" />
      <circle cx="220" cy="130" r="22" fill="none" stroke="#7a7670" strokeWidth=".5" strokeDasharray="2 3" />
      {/* terracotta route */}
      <path d="M 60 250 L 100 220 L 160 200 L 220 130 L 300 130 L 340 100" fill="none" stroke="#c8502a" strokeWidth="1.4" />
      <circle cx="60" cy="250" r="4" fill="#c8502a" />
      <circle cx="340" cy="100" r="4" fill="none" stroke="#c8502a" strokeWidth="1.2" />
      <circle cx="340" cy="100" r="1.8" fill="#c8502a" />
      {/* ghost wordmark */}
      <text x="200" y="68" fontFamily="Playfair Display, serif" fontSize="22" fontWeight="700" fontStyle="italic" textAnchor="middle" fill="#f2efe8" opacity=".07">plan north ↑</text>
      {label && <text x="20" y="284" fontFamily="Syne, sans-serif" fontSize="7" letterSpacing="1.5" fill="#7a7670">{label}</text>}
    </svg>);

};

window.DiagSection = function DiagSection({ label }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#0e0e0d" />
      {/* section cut */}
      <line x1="20" y1="240" x2="380" y2="240" stroke="#3a3530" strokeWidth=".7" />
      {/* building section profile */}
      <path d="M 40 240 L 40 100 L 80 60 L 200 60 L 200 100 L 320 100 L 360 80 L 360 240" fill="none" stroke="#3a3530" strokeWidth=".8" />
      {/* floor lines */}
      <line x1="40" y1="180" x2="200" y2="180" stroke="#3a3530" strokeWidth=".5" strokeDasharray="2 2" />
      <line x1="40" y1="140" x2="200" y2="140" stroke="#3a3530" strokeWidth=".5" strokeDasharray="2 2" />
      <line x1="200" y1="180" x2="360" y2="180" stroke="#3a3530" strokeWidth=".5" strokeDasharray="2 2" />
      {/* terracotta sign on facade */}
      <rect x="280" y="120" width="60" height="40" fill="#c8502a" opacity=".15" />
      <rect x="280" y="120" width="60" height="40" fill="none" stroke="#c8502a" strokeWidth=".8" />
      <text x="310" y="146" fontFamily="Syne, sans-serif" fontSize="10" letterSpacing="2.5" textAnchor="middle" fill="#e8b49e" fontWeight="700">LIBRARY</text>
      {/* people scale */}
      <line x1="60" y1="240" x2="60" y2="220" stroke="#7a7670" strokeWidth=".5" />
      <circle cx="60" cy="216" r="2.5" fill="none" stroke="#7a7670" strokeWidth=".5" />
      <line x1="80" y1="240" x2="80" y2="220" stroke="#7a7670" strokeWidth=".5" />
      <circle cx="80" cy="216" r="2.5" fill="none" stroke="#7a7670" strokeWidth=".5" />
      {/* dimension N–S */}
      <text x="20" y="62" fontFamily="Syne, sans-serif" fontSize="7" letterSpacing="2" fill="#7a7670">NORTH ELEVATION</text>
      <text x="20" y="252" fontFamily="Syne, sans-serif" fontSize="7" letterSpacing="2" fill="#7a7670">G.F. +0.000</text>
      {/* ghost ornament */}
      <text x="380" y="88" fontFamily="Playfair Display, serif" fontSize="10" textAnchor="end" fill="#7a7670" opacity=".5">A–A'</text>
      {label && <text x="20" y="284" fontFamily="Syne, sans-serif" fontSize="7" letterSpacing="1.5" fill="#7a7670">{label}</text>}
    </svg>);

};

window.DiagTransit = function DiagTransit({ label }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#0e0e0d" />
      {/* spider lines */}
      <line x1="200" y1="150" x2="40" y2="50" stroke="#3a3530" strokeWidth=".5" />
      <line x1="200" y1="150" x2="360" y2="50" stroke="#3a3530" strokeWidth=".5" />
      <line x1="200" y1="150" x2="40" y2="250" stroke="#3a3530" strokeWidth=".5" />
      <line x1="200" y1="150" x2="360" y2="250" stroke="#3a3530" strokeWidth=".5" />
      <line x1="200" y1="150" x2="200" y2="20" stroke="#3a3530" strokeWidth=".5" />
      <line x1="200" y1="150" x2="200" y2="280" stroke="#3a3530" strokeWidth=".5" />
      <line x1="200" y1="150" x2="20" y2="150" stroke="#3a3530" strokeWidth=".5" />
      <line x1="200" y1="150" x2="380" y2="150" stroke="#3a3530" strokeWidth=".5" />
      {/* outer interchange ring */}
      <circle cx="200" cy="150" r="100" fill="none" stroke="#3a3530" strokeWidth=".5" strokeDasharray="3 4" />
      {/* nodes */}
      {[[40, 50], [360, 50], [40, 250], [360, 250], [200, 20], [200, 280], [20, 150], [380, 150]].map(([x, y], i) =>
      <circle key={i} cx={x} cy={y} r="3" fill="none" stroke="#7a7670" strokeWidth=".7" />
      )}
      {/* terracotta primary line */}
      <path d="M 20 150 L 200 150 L 360 50" fill="none" stroke="#c8502a" strokeWidth="1.6" />
      <circle cx="200" cy="150" r="6" fill="#0e0e0d" stroke="#c8502a" strokeWidth="1.4" />
      <circle cx="200" cy="150" r="2" fill="#c8502a" />
      <circle cx="20" cy="150" r="4" fill="#c8502a" />
      <circle cx="360" cy="50" r="4" fill="#c8502a" />
      {/* ghost wordmark */}
      <text x="200" y="100" fontFamily="Playfair Display, serif" fontSize="16" fontStyle="italic" fontWeight="700" textAnchor="middle" fill="#f2efe8" opacity=".07">interchange</text>
      {label && <text x="20" y="284" fontFamily="Syne, sans-serif" fontSize="7" letterSpacing="1.5" fill="#7a7670">{label}</text>}
    </svg>);

};

window.DiagRetail = function DiagRetail({ label }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#0e0e0d" />
      {/* shopfront elevation */}
      <rect x="40" y="40" width="320" height="200" fill="none" stroke="#3a3530" strokeWidth="1" />
      <line x1="40" y1="80" x2="360" y2="80" stroke="#3a3530" strokeWidth=".5" />
      <line x1="40" y1="200" x2="360" y2="200" stroke="#3a3530" strokeWidth=".5" />
      {/* big italic wordmark */}
      <text x="200" y="160" fontFamily="Playfair Display, serif" fontSize="60" fontStyle="italic" fontWeight="700" textAnchor="middle" fill="#c8502a" letterSpacing="-2">Halden</text>
      {/* mullions */}
      <line x1="120" y1="80" x2="120" y2="200" stroke="#3a3530" strokeWidth=".5" />
      <line x1="200" y1="80" x2="200" y2="200" stroke="#3a3530" strokeWidth=".5" />
      <line x1="280" y1="80" x2="280" y2="200" stroke="#3a3530" strokeWidth=".5" />
      {/* awning detail */}
      <rect x="120" y="60" width="160" height="20" fill="#1c1c1a" stroke="#c8502a" strokeWidth=".5" />
      <text x="200" y="74" fontFamily="Syne, sans-serif" fontSize="7" letterSpacing="2.5" textAnchor="middle" fill="#e8b49e" fontWeight="700">ESPRESSO BAR</text>
      {/* people */}
      <circle cx="100" cy="220" r="4" fill="none" stroke="#7a7670" strokeWidth=".5" />
      <circle cx="320" cy="222" r="4" fill="none" stroke="#7a7670" strokeWidth=".5" />
      <line x1="40" y1="240" x2="360" y2="240" stroke="#3a3530" strokeWidth=".5" />
      {label && <text x="20" y="284" fontFamily="Syne, sans-serif" fontSize="7" letterSpacing="1.5" fill="#7a7670">{label}</text>}
    </svg>);

};

const DIAGS = ['DiagWayfinding', 'DiagSign', 'DiagActivation', 'DiagFacade', 'DiagFloorplan', 'DiagSection', 'DiagTransit', 'DiagRetail'];

/* ─────────────── Nav ─────────────── */

const NAV_ITEMS = [
{ id: 'work', label: 'Work', href: 'case-studies.html', mega: 'work' },
{ id: 'services', label: 'What we do', href: 'services.html', mega: 'services' },
{ id: 'studio', label: 'Studio', href: 'about.html', mega: 'studio' }];


window.Nav = function Nav({ current }) {
  const [openMega, setOpenMega] = useState(null);
  const wrapRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => {if (e.key === 'Escape') setOpenMega(null);};
    const onClick = (e) => {if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenMega(null);};
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {document.removeEventListener('keydown', onKey);document.removeEventListener('click', onClick);};
  }, []);
  return (
    <nav className="ash-nav" ref={wrapRef}>
      <div className="ash-nav-inner">
        <a href="index.html" className="ash-nav-logo" style={{ height: "25px" }}>
          Ashman<span className="dot">.</span>Studio
        </a>
        <ul className="ash-nav-links">
          {NAV_ITEMS.map((item) =>
          <li key={item.id}>
              <button
              className={'ash-nav-link ' + (current === item.id ? 'on' : '')}
              aria-expanded={openMega === item.id}
              onClick={(e) => {e.stopPropagation();setOpenMega(openMega === item.id ? null : item.id);}}
              onMouseEnter={() => item.mega && setOpenMega(item.id)}>
              {item.label}</button>
            </li>
          )}
          <li><a href="contact.html" className={'ash-nav-link ' + (current === 'contact' ? 'on' : '')}>Contact</a></li>
          <li><a href="contact.html" className="ash-nav-cta">Start a project <span>→</span></a></li>
        </ul>
      </div>
      {openMega && <MegaMenu kind={openMega} close={() => setOpenMega(null)} />}
    </nav>);

};

window.MegaMenu = function MegaMenu({ kind, close }) {
  const data = {
    work: {
      colA: {
        title: 'Practice areas',
        items: [
        { name: 'Wayfinding', meta: '24 projects', href: 'services.html#wayfinding' },
        { name: 'Sign Design', meta: '18 projects', href: 'services.html#signage' },
        { name: 'Environmental Graphics', meta: '15 projects', href: 'services.html#egd' },
        { name: 'Brand Activation', meta: '12 projects', href: 'services.html#activation' },
        { name: 'Spatial Identity', meta: '9 projects', href: 'services.html#identity' }]

      },
      colB: {
        title: 'Sectors',
        items: [
        { name: 'Aviation', meta: 'Terminals · airports', href: 'case-studies.html#aviation' },
        { name: 'Retail & Hospitality', meta: 'Flagship · F&B', href: 'case-studies.html#retail' },
        { name: 'Civic & Cultural', meta: 'Libraries · museums', href: 'case-studies.html#culture' },
        { name: 'Sport & Arena', meta: 'Stadia · venues', href: 'case-studies.html#sport' },
        { name: 'Workplace', meta: 'HQ · campus', href: 'case-studies.html#workplace' }]

      },
      feature: {
        eyebrow: 'Featured case study',
        title: <>Naviga <em>International</em> — Terminal 4 Wayfinding.</>,
        meta: ['Aviation', 'Mumbai · 2024'],
        href: 'case-studies.html'
      }
    },
    services: {
      colA: {
        title: 'Spatial',
        items: [
        { name: 'Wayfinding strategy', meta: 'Audit → masterplan', href: 'services.html#wayfinding' },
        { name: 'Sign design', meta: 'Family · spec · supply', href: 'services.html#signage' },
        { name: 'Environmental graphics', meta: 'Surface · facade', href: 'services.html#egd' }]

      },
      colB: {
        title: 'Brand',
        items: [
        { name: 'Brand activation', meta: 'Pop-ups · live', href: 'services.html#activation' },
        { name: 'Retail environments', meta: 'Flagship · concept', href: 'services.html#retail' },
        { name: 'Spatial identity', meta: 'Architecture-led', href: 'services.html#identity' }]

      },
      feature: {
        eyebrow: 'How we work',
        title: <>Six disciplines, <em>one</em> studio.</>,
        meta: ['Capabilities', 'Read more →'],
        href: 'services.html'
      }
    },
    studio: {
      colA: {
        title: 'About us',
        items: [
        { name: 'Our story', meta: 'Twelve years', href: 'about.html#story' },
        { name: 'Team', meta: '24 people', href: 'about.html#team' },
        { name: 'Awards & press', meta: '38 honours', href: 'about.html#awards' }]

      },
      colB: {
        title: 'Connect',
        items: [
        { name: 'Get in touch', meta: 'New projects', href: 'contact.html' },
        { name: 'Studios', meta: '3 cities', href: 'contact.html#studios' },
        { name: 'Careers', meta: 'Currently 4 roles', href: 'about.html#careers' }]

      },
      feature: {
        eyebrow: 'In the studio',
        title: <>A practice that's stayed <em>independent</em>.</>,
        meta: ['Hauz Khas, New Delhi', 'Since 2024'],
        href: 'about.html'
      }
    }
  }[kind];

  if (!data) return null;
  return (
    <div className="ash-megamenu" onClick={(e) => e.stopPropagation()} onMouseLeave={close}>
      <div className="ash-mm-col">
        <h4>{data.colA.title}</h4>
        <ul className="ash-mm-list">
          {data.colA.items.map((it) =>
          <li key={it.name}><a href={it.href}>{it.name} <span className="meta">{it.meta}</span></a></li>
          )}
        </ul>
      </div>
      <div className="ash-mm-col">
        <h4>{data.colB.title}</h4>
        <ul className="ash-mm-list">
          {data.colB.items.map((it) =>
          <li key={it.name}><a href={it.href}>{it.name} <span className="meta">{it.meta}</span></a></li>
          )}
        </ul>
      </div>
      <a className="ash-mm-feature" href={data.feature.href}>
        <div>
          <div className="ash-eyebrow"><span className="dash"></span>{data.feature.eyebrow}</div>
          <h3>{data.feature.title}</h3>
        </div>
        <div className="meta-row">
          <div>{data.feature.meta.map((m, i) => <div key={i}>{m}</div>)}</div>
          <span className="arrow">↗</span>
        </div>
      </a>
    </div>);

};

/* ─────────────── Ticker ─────────────── */

window.Ticker = function Ticker({ items, paper }) {
  const list = items || ['Wayfinding', 'Sign Design', 'Environmental Graphics', 'Brand Activation', 'Spatial Identity', 'Retail Environments', 'Exhibition Design'];
  const seq = [...list, ...list, ...list, ...list];
  return (
    <div className={'ash-ticker' + (paper ? ' paper' : '')}>
      <div className="ash-ticker-track">
        {seq.map((it, i) =>
        <React.Fragment key={i}>
            <span className="ash-ticker-item">{it}</span>
            <span className="ash-ticker-dot">✦</span>
          </React.Fragment>
        )}
      </div>
    </div>);

};

/* ─────────────── Footer ─────────────── */

window.Footer = function Footer() {
  return (
    <footer className="ash-footer">
      <div className="ash-footer-mark">ASHMAN</div>
      <div className="ash-footer-inner">
        <div className="ash-footer-top">
          <div>
            <div className="ash-footer-brand">Ashman<span className="dot">.</span>Studio</div>
            <div className="ash-footer-tag">We design the physical world of <em>your brand</em> — where space becomes experience.</div>
            <div className="ash-footer-tag-sub">Independent practice. Founded New Delhi 2024. Studios in New Delhi, Chandigarh and Dubai.</div>
          </div>
          <div>
            <div className="ash-footer-col-title">What we do</div>
            <ul>
              <li><a href="services.html#wayfinding">Wayfinding</a></li>
              <li><a href="services.html#signage">Sign Design</a></li>
              <li><a href="services.html#egd">Environmental Graphics</a></li>
              <li><a href="services.html#activation">Brand Activation</a></li>
              <li><a href="services.html#retail">Retail Environments</a></li>
              <li><a href="services.html#identity">Spatial Identity</a></li>
            </ul>
          </div>
          <div>
            <div className="ash-footer-col-title">Studio</div>
            <ul>
              <li><a href="about.html#story">Our story</a></li>
              <li><a href="about.html#team">Team</a></li>
              <li><a href="case-studies.html">Selected work</a></li>
              <li><a href="about.html#awards">Awards & press</a></li>
              <li><a href="about.html#careers">Careers</a></li>
            </ul>
          </div>
          <div>
            <div className="ash-footer-col-title">Studios</div>
            <ul>
              <li><a href="contact.html#delhi">New Delhi · HQ <span className="ext">↗</span></a></li>
              <li><a href="contact.html#chandigarh">Chandigarh <span className="ext">↗</span></a></li>
              <li><a href="contact.html#dubai">Dubai <span className="ext">↗</span></a></li>
            </ul>
          </div>
          <div>
            <div className="ash-footer-col-title">Get in touch</div>
            <ul>
              <li><a href="mailto:hello@ashman.studio">hello@ashman.studio</a></li>
              <li><a href="mailto:press@ashman.studio">press@ashman.studio</a></li>
              <li><a href="mailto:careers@ashman.studio">careers@ashman.studio</a></li>
              <li><a href="#">Instagram <span className="ext">↗</span></a></li>
              <li><a href="#">LinkedIn <span className="ext">↗</span></a></li>
            </ul>
          </div>
        </div>
        <div className="ash-footer-bottom">
          <span>© 2024–2026 Ashman Studio · Founded by Akash Manna</span>
          <span className="center">✦ Designing the physical world of your brand</span>
          <span className="right"><a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Colophon</a></span>
        </div>
      </div>
    </footer>);

};

/* ─────────────── Reusable: CTA strip ─────────────── */

window.CtaStrip = function CtaStrip({ title, sub, label, href }) {
  return (
    <section className="ash-cta-strip">
      <div className="ash-wrap">
        <div>
          <h2 dangerouslySetInnerHTML={{ __html: title || 'Have a <em>space</em> in mind?' }} />
          <p>{sub || 'Tell us about your project — share as much or as little as you like and we\'ll be in touch within two working days.'}</p>
        </div>
        <a className="btn-primary" href={href || 'contact.html'}>{label || 'Start a project'} →</a>
      </div>
    </section>);

};