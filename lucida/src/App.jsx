import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Workspace from "./components/workspace/Workspace";

/* ─── Inline keyframes injected once ─── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Inter', sans-serif;
    background: #05060f;
    overflow-x: hidden;
  }

  @keyframes floatY {
    0%, 100% { transform: translateY(0px);   }
    50%       { transform: translateY(-18px); }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(36px); filter: blur(8px); }
    to   { opacity: 1; transform: translateY(0);    filter: blur(0);   }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 18px 3px rgba(139,92,246,.45); }
    50%       { box-shadow: 0 0 36px 8px rgba(139,92,246,.75); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  @keyframes blink {
    0%,100% { opacity: 1; } 50% { opacity: 0; }
  }

  .anim-float   { animation: floatY 5s ease-in-out infinite; }
  .anim-fade0   { animation: fadeSlideUp .7s ease both; }
  .anim-fade1   { animation: fadeSlideUp .7s .18s ease both; }
  .anim-fade2   { animation: fadeSlideUp .7s .36s ease both; }
  .anim-fade3   { animation: fadeSlideUp .7s .54s ease both; }
  .anim-fade4   { animation: fadeSlideUp .7s .72s ease both; }

  .card-reveal  { opacity: 0; transform: translateY(40px); transition: opacity .6s ease, transform .6s ease; }
  .card-visible { opacity: 1; transform: translateY(0); }

  /* Blur-to-clear scroll reveal */
  .blur-reveal {
    opacity: 0;
    filter: blur(12px);
    transform: translateY(20px);
    transition: opacity .65s cubic-bezier(.22,1,.36,1),
                filter .65s cubic-bezier(.22,1,.36,1),
                transform .65s cubic-bezier(.22,1,.36,1);
  }
  .blur-reveal.in-view {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0);
  }
  .blur-reveal.out-view {
    opacity: 0;
    filter: blur(10px);
    transform: translateY(16px);
  }

  .btn-primary {
    background: linear-gradient(135deg, #7c3aed, #4f46e5);
    color: #fff;
    border: none;
    border-radius: 14px;
    padding: 14px 36px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: transform .2s, box-shadow .2s;
    animation: pulse-glow 2.8s ease-in-out infinite;
    letter-spacing: .3px;
  }
  .btn-primary:hover {
    transform: scale(1.06);
    box-shadow: 0 0 48px 10px rgba(124,58,237,.6);
    animation: none;
  }

  .btn-ghost {
    background: transparent;
    color: rgba(255,255,255,.75);
    border: 1px solid rgba(255,255,255,.18);
    border-radius: 10px;
    padding: 9px 22px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background .2s, color .2s, border-color .2s;
  }
  .btn-ghost:hover {
    background: rgba(255,255,255,.08);
    color: #fff;
    border-color: rgba(255,255,255,.35);
  }

  /* glass panels */
  .glass {
    background: rgba(255,255,255,.045);
    backdrop-filter: blur(24px) saturate(1.5);
    -webkit-backdrop-filter: blur(24px) saturate(1.5);
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 28px;
  }
  .glass-strong {
    background: rgba(255,255,255,.07);
    backdrop-filter: blur(36px) saturate(1.8);
    -webkit-backdrop-filter: blur(36px) saturate(1.8);
    border: 1px solid rgba(255,255,255,.14);
    border-radius: 24px;
  }

  /* highlighted word shimmer */
  .word-highlight {
    background: linear-gradient(90deg, #7c3aed 30%, #a78bfa 50%, #7c3aed 70%);
    background-size: 800px 100%;
    animation: shimmer 2.5s linear infinite;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
  }

  /* Cursor blink in demo */
  .cursor { animation: blink 1.1s step-end infinite; }

  /* Navbar */
  .navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    transition: background .35s, backdrop-filter .35s, padding .35s, border-color .35s;
    border-bottom: 1px solid transparent;
  }
  .navbar.scrolled {
    background: rgba(5,6,15,.75);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    border-color: rgba(255,255,255,.08);
  }

  /* Feature card */
  .feat-card {
    background: rgba(255,255,255,.045);
    border: 1px solid rgba(255,255,255,.09);
    border-radius: 28px;
    padding: 52px 48px;
    min-height: 260px;
    box-shadow: 0 8px 32px rgba(0,0,0,.35);
    transition: transform .3s ease, border-color .3s ease, background .3s ease, box-shadow .3s ease;
    cursor: default;
    display: flex;
    flex-direction: column;
  }
  .feat-card:hover {
    transform: translateY(-10px);
    border-color: rgba(124,58,237,.5);
    background: rgba(124,58,237,.08);
    box-shadow: 0 24px 64px rgba(0,0,0,.55), 0 0 0 1px rgba(124,58,237,.2);
  }

  /* Demo panel lines */
  .demo-line {
    height: 11px;
    background: rgba(255,255,255,.1);
    border-radius: 6px;
    margin-bottom: 12px;
  }
  .demo-line.w-full  { width: 100%; }
  .demo-line.w-5-6   { width: 83%; }
  .demo-line.w-4-5   { width: 80%; }
  .demo-line.w-2-3   { width: 66%; }
  .demo-line.w-3-4   { width: 75%; }
  .demo-line.w-half  { width: 50%; }

  /* Orb blobs */
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    opacity: .38;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #05060f; }
  ::-webkit-scrollbar-thumb { background: #3b2d6e; border-radius: 6px; }
`;

/* ─── Feature card data ─── */
const FEATURES = [
  {
    icon: "🔡",
    title: "Adaptive Typography",
    desc: "Adjust font size, weight, line-height and letter spacing in real time — tailored to your eyes.",
    delay: 0,
  },
  {
    icon: "🌈",
    title: "Color & Contrast",
    desc: "Choose from curated palettes or build your own. High-contrast and dyslexia-friendly modes included.",
    delay: 120,
  },
  {
    icon: "🎵",
    title: "Text-to-Speech",
    desc: "Natural voice narration with adjustable speed and word-highlighting for guided reading flow.",
    delay: 240,
  },
];

/* ─── Demo reading panel ─── */
function ReadingDemo() {
  const words = ["Reading", "should", "feel", "effortless", "and", "beautiful", "for", "everyone."];
  const [active, setActive] = useState(3);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % words.length), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="anim-float" style={{ maxWidth: 420, width: "100%" }}>
      <div
        className="glass-strong"
        style={{ padding: "32px 30px", boxShadow: "0 28px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.08)" }}
      >
        {/* top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          {["#f87171","#fbbf24","#34d399"].map((c,i) => (
            <span key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c, display: "block" }} />
          ))}
          <span style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,.3)", fontWeight: 500, letterSpacing: 1 }}>
            LUCIDA READER
          </span>
        </div>

        {/* settings strip */}
        <div
          style={{
            display: "flex", gap: 8, marginBottom: 24, padding: "10px 14px",
            background: "rgba(255,255,255,.04)", borderRadius: 12,
            border: "1px solid rgba(255,255,255,.07)",
          }}
        >
          {["Aa", "1.6×", "Sans", "☀"].map((l,i) => (
            <span
              key={i}
              style={{
                fontSize: 11, padding: "4px 10px", borderRadius: 7,
                background: i === 0 ? "rgba(124,58,237,.35)" : "rgba(255,255,255,.05)",
                border: `1px solid ${i === 0 ? "rgba(124,58,237,.6)" : "rgba(255,255,255,.07)"}`,
                color: i === 0 ? "#c4b5fd" : "rgba(255,255,255,.45)",
                cursor: "pointer", fontWeight: 600, userSelect: "none",
              }}
            >
              {l}
            </span>
          ))}
        </div>

        {/* reading text */}
        <p
          style={{
            fontSize: 17, lineHeight: 1.85, color: "rgba(255,255,255,.7)",
            fontWeight: 400, letterSpacing: ".2px", marginBottom: 20,
          }}
        >
          {words.map((w, i) => (
            <span key={i}>
              {i === active ? (
                <span
                  className="word-highlight"
                  style={{
                    padding: "1px 6px", borderRadius: 6,
                    background: "rgba(124,58,237,.18)",
                  }}
                >
                  {w}
                </span>
              ) : (
                <span style={{ color: i < active ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.4)" }}>
                  {w}
                </span>
              )}{" "}
            </span>
          ))}
          <span className="cursor" style={{ color: "#a78bfa", fontWeight: 700 }}>|</span>
        </p>

        {/* mock lines */}
        <div>
          {[100, 83, 75, 66, 80, 50].map((w, i) => (
            <div key={i} className="demo-line" style={{ width: `${w}%`, opacity: .4 - i * .04 }} />
          ))}
        </div>

        {/* progress bar */}
        <div
          style={{
            marginTop: 22, height: 4, background: "rgba(255,255,255,.07)",
            borderRadius: 99, overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "38%", height: "100%",
              background: "linear-gradient(90deg,#7c3aed,#a78bfa)",
              borderRadius: 99,
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "rgba(255,255,255,.28)", fontWeight: 500 }}>
          <span>Page 3 of 8</span>
          <span>38%</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Landing Page Content ─── */
function LandingPage({ onStart }) {
  const [scrolled, setScrolled] = useState(false);
  const cardsRef = useRef([]);
  const blurRefs = useRef([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Card slide-up reveal
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("card-visible");
        }),
      { threshold: 0.15 }
    );
    cardsRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Blur-to-clear text reveal (bidirectional)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            e.target.classList.remove("out-view");
          } else {
            e.target.classList.remove("in-view");
            e.target.classList.add("out-view");
          }
        }),
      { threshold: 0.2 }
    );
    blurRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <style>{STYLES}</style>

      {/* ── NAVBAR ── */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div
          style={{
            maxWidth: 1200, margin: "0 auto",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: scrolled ? "14px 32px" : "22px 32px",
            transition: "padding .35s",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 34, height: 34,
                background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                borderRadius: 10, display: "grid", placeItems: "center",
                fontSize: 16, boxShadow: "0 0 16px rgba(124,58,237,.55)",
              }}
            >✦</span>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-.4px" }}>
              Lucida
            </span>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button className="btn-ghost">Features</button>
            <button className="btn-ghost">Pricing</button>
            <button
              onClick={onStart}
              className="btn-primary"
              style={{ padding: "9px 22px", fontSize: 14, animation: "none",
                       boxShadow: "0 0 18px rgba(124,58,237,.4)" }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          padding: "0 24px",
        }}
      >
        {/* background gradient + orbs */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,46,137,.28) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 60%, rgba(67,56,202,.2) 0%, transparent 60%), #05060f",
          }}
        />
        <div className="orb" style={{ width: 520, height: 520, left: "-120px", top: "-80px",  background: "#4c1d95" }} />
        <div className="orb" style={{ width: 380, height: 380, right: "-60px", bottom: "-60px", background: "#1e1b4b" }} />
        <div className="orb" style={{ width: 260, height: 260, right: "25%",   top: "10%",     background: "#5b21b6", opacity: .22 }} />

        {/* dual pane container */}
        <div
          style={{
            maxWidth: 1200, width: "100%", margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            padding: "120px 0 80px",
            position: "relative", zIndex: 1,
          }}
          className="hero-grid"
        >
          {/* LEFT PANE */}
          <div
            className="glass"
            style={{
              padding: "56px 52px",
              display: "flex", flexDirection: "column",
              justifyContent: "center", gap: 0,
              boxShadow: "0 24px 72px rgba(0,0,0,.45)",
            }}
          >
            <div className="anim-fade0" style={{ marginBottom: 16 }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: 12, fontWeight: 600, letterSpacing: 2,
                  color: "#a78bfa", textTransform: "uppercase",
                  background: "rgba(124,58,237,.12)",
                  border: "1px solid rgba(124,58,237,.3)",
                  padding: "5px 14px", borderRadius: 99,
                }}
              >
                Accessibility · Reading · Focus
              </span>
            </div>

            <h1
              className="anim-fade1"
              style={{
                fontSize: "clamp(36px, 4.5vw, 58px)",
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: "-1.5px",
                color: "#fff",
                marginBottom: 20,
              }}
            >
              Read without
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg,#a78bfa 0%,#6366f1 60%,#818cf8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                boundaries.
              </span>
            </h1>

            <p
              className="anim-fade2"
              style={{
                fontSize: 17, lineHeight: 1.75,
                color: "rgba(255,255,255,.55)",
                maxWidth: 420, marginBottom: 40,
                fontWeight: 400,
              }}
            >
              Lucida adapts every word to your needs — custom typography, guided
              highlighting, and voice narration in one elegant tool.
            </p>

            <div className="anim-fade3" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button 
                onClick={onStart}
                className="btn-primary" 
                style={{ fontSize: 15, padding: "15px 38px" }}
              >
                Start Reading — Free
              </button>
              <button className="btn-ghost" style={{ padding: "15px 28px", fontSize: 15 }}>
                Watch Demo ▶
              </button>
            </div>

            <div
              className="anim-fade4"
              style={{
                display: "flex", gap: 20, alignItems: "center",
                marginTop: 36, paddingTop: 32,
                borderTop: "1px solid rgba(255,255,255,.07)",
              }}
            >
              {[["10k+","Readers"], ["98%","Satisfaction"], ["4.9★","Rating"]].map(([n,l],i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#c4b5fd" }}>{n}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)", fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PANE */}
          <div
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "40px 24px",
            }}
          >
            <ReadingDemo />
          </div>
        </div>

        {/* responsive styles via a style tag */}
        <style>{`
          @media (max-width: 768px) {
            .hero-grid {
              grid-template-columns: 1fr !important;
              padding: 100px 0 60px !important;
            }
          }
        `}</style>
      </section>

      {/* ── FEATURES ── */}
      <section
        style={{
          padding: "120px 32px",
          position: "relative",
          background: "linear-gradient(180deg, #05060f 0%, #080b1a 100%)",
        }}
      >
        {/* Section label */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span
            ref={(el) => (blurRefs.current[0] = el)}
            className="blur-reveal"
            style={{
              fontSize: 12, fontWeight: 600, letterSpacing: 2,
              color: "#a78bfa", textTransform: "uppercase",
              background: "rgba(124,58,237,.12)",
              border: "1px solid rgba(124,58,237,.3)",
              padding: "5px 14px", borderRadius: 99,
              display: "inline-block", marginBottom: 24,
              transitionDelay: "0ms",
            }}
          >
            Features
          </span>
          <h2
            ref={(el) => (blurRefs.current[1] = el)}
            className="blur-reveal"
            style={{
              fontSize: "clamp(32px, 3.5vw, 48px)",
              fontWeight: 800, color: "#fff",
              letterSpacing: "-1.2px", lineHeight: 1.15,
              transitionDelay: "80ms",
            }}
          >
            Built for every reader.
          </h2>
          <p
            ref={(el) => (blurRefs.current[2] = el)}
            className="blur-reveal"
            style={{ color: "rgba(255,255,255,.45)", marginTop: 16, fontSize: 17, maxWidth: 500, margin: "16px auto 0", lineHeight: 1.7, transitionDelay: "160ms" }}
          >
            Powerful accessibility tools wrapped in a calm, distraction-free experience.
          </p>
        </div>

        <div
          style={{
            maxWidth: 960, margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 32,
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="feat-card card-reveal"
              style={{ transitionDelay: `${f.delay}ms`, gridColumn: i === 2 ? "1 / -1" : undefined }}
            >
              <div
                style={{
                  width: 64, height: 64, borderRadius: 18,
                  background: "linear-gradient(135deg,rgba(124,58,237,.3),rgba(79,70,229,.18))",
                  border: "1px solid rgba(124,58,237,.35)",
                  display: "grid", placeItems: "center",
                  fontSize: 28, marginBottom: 28,
                  boxShadow: "0 0 28px rgba(124,58,237,.25)",
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: 22, fontWeight: 700, color: "#fff",
                  marginBottom: 14, letterSpacing: "-.4px",
                }}
              >
                {f.title}
              </h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "rgba(255,255,255,.5)", fontWeight: 400 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 640px) {
            .feat-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,.06)",
          padding: "32px 24px",
          textAlign: "center",
          color: "rgba(255,255,255,.25)",
          fontSize: 13,
          background: "#05060f",
        }}
      >
        © 2025 Lucida · Built for every reader{" "}
        <span style={{ color: "#6d28d9" }}>✦</span>
      </footer>
    </motion.div>
  );
}

/* ─── Main App ─── */
export default function App() {
  const [showWorkspace, setShowWorkspace] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {showWorkspace ? (
        <Workspace key="workspace" />
      ) : (
        <LandingPage key="landing" onStart={() => setShowWorkspace(true)} />
      )}
    </AnimatePresence>
  );
}
