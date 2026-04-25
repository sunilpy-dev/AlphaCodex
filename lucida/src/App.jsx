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
    color: #e2e8f0;
    overflow-x: hidden;
  }

  @keyframes floatY {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes breathe {
    0%, 100% { transform: translateY(0px) scale(1); }
    50%       { transform: translateY(-8px) scale(1.01); }
  }
  @keyframes fadeSlideUp {
    0%   { opacity: 0; transform: translateY(40px); filter: blur(15px); }
    100% { opacity: 1; transform: translateY(0);    filter: blur(0);    }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 16px 2px rgba(124,58,237,.3); }
    50%       { box-shadow: 0 0 32px 6px rgba(124,58,237,.5); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  @keyframes blink {
    0%,100% { opacity: 1; } 50% { opacity: 0; }
  }
  @keyframes wordIn {
    0%   { opacity: 0; transform: translateY(30px); filter: blur(20px); }
    100% { opacity: 1; transform: translateY(0);    filter: blur(0);    }
  }
  @keyframes orbDrift {
    0%,100% { transform: translate(0,0) scale(1); }
    33%      { transform: translate(30px,-20px) scale(1.05); }
    66%      { transform: translate(-20px,15px) scale(.95); }
  }
  @keyframes progressFill {
    from { opacity:0; } to { opacity:1; }
  }

  /* Base animation classes */
  .anim-float   { animation: floatY 6s ease-in-out infinite; }
  .anim-breathe { animation: breathe 6s ease-in-out infinite; }

  /* Hero entry animations — stagger 250ms, 1.2s duration, ease-in-out */
  .anim-fade0 { animation: fadeSlideUp 1.2s ease-in-out both; }
  .anim-fade1 { animation: fadeSlideUp 1.2s .25s ease-in-out both; }
  .anim-fade2 { animation: fadeSlideUp 1.2s .5s  ease-in-out both; }
  .anim-fade3 { animation: fadeSlideUp 1.2s .75s ease-in-out both; }
  .anim-fade4 { animation: fadeSlideUp 1.2s 1s   ease-in-out both; }

  /* Word split — per-word stagger, 1s, ease-in-out */
  .word-token {
    display: inline-block;
    opacity: 0;
    animation: wordIn 1s ease-in-out both;
  }

  /* Scroll-reveal: blur + fade + slide — 1s ease-in-out */
  .card-reveal {
    opacity: 0;
    transform: translateY(48px);
    filter: blur(12px);
    transition: opacity 1s ease-in-out,
                transform 1s ease-in-out,
                filter 1s ease-in-out;
  }
  .card-visible {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }

  /* Blur-to-clear text reveal — 1.1s ease-in-out */
  .blur-reveal {
    opacity: 0;
    filter: blur(20px);
    transform: translateY(25px);
    transition: opacity 1.1s ease-in-out,
                filter 1.1s ease-in-out,
                transform 1.1s ease-in-out;
  }
  .blur-reveal.in-view {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0);
  }
  .blur-reveal.out-view {
    opacity: 0;
    filter: blur(15px);
    transform: translateY(20px);
  }

  /* Scroll progress bar */
  .scroll-progress {
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    background: linear-gradient(90deg, #6d28d9, #a78bfa, #6366f1);
    z-index: 999;
    transition: width .2s ease-out;
    box-shadow: 0 0 15px rgba(124,58,237,.6);
    border-radius: 0 2px 2px 0;
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
    transition: all .3s ease-in-out;
    animation: pulse-glow 2.8s ease-in-out infinite;
    letter-spacing: .3px;
    position: relative;
    overflow: hidden;
  }
  .btn-primary::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,.15) 50%, transparent 70%);
    background-size: 200% 100%;
    background-position: 200% 0;
    transition: background-position .6s ease;
  }
  .btn-primary:hover::after {
    background-position: -100% 0;
  }
  .btn-primary:hover {
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 0 50px 10px rgba(124,58,237,.5);
    animation: none;
  }
  .btn-primary:active { transform: scale(.97); }

  .btn-ghost {
    background: transparent;
    color: rgba(255,255,255,.7);
    border: 1px solid rgba(255,255,255,.15);
    border-radius: 10px;
    padding: 9px 22px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all .3s ease-in-out;
  }
  .btn-ghost:hover {
    background: rgba(255,255,255,.07);
    color: #fff;
    border-color: rgba(255,255,255,.3);
    transform: translateY(-1px);
  }
  .btn-ghost:active { transform: scale(.98); }

  /* Dark Glass panel */
  .glass {
    background: rgba(255,255,255,.04);
    backdrop-filter: blur(30px) saturate(1.6);
    -webkit-backdrop-filter: blur(30px) saturate(1.6);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 32px;
  }
  .glass-strong {
    background: rgba(255,255,255,.06);
    backdrop-filter: blur(40px) saturate(1.8);
    -webkit-backdrop-filter: blur(40px) saturate(1.8);
    border: 1px solid rgba(255,255,255,.12);
    border-radius: 28px;
  }

  /* Navbar */
  .navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    transition: all .5s cubic-bezier(0.4, 0, 0.2, 1);
    border-bottom: 1px solid transparent;
  }
  .navbar.scrolled {
    background: rgba(5,6,15,.7);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border-color: rgba(255,255,255,.06);
    padding: 10px 0;
  }

  /* Feature card */
  .feat-card {
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 32px;
    padding: 64px 56px;
    min-height: 340px;
    box-shadow: 0 15px 50px rgba(0,0,0,.3);
    transition: all .6s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: default;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }
  .feat-card::before {
    content: '';
    position: absolute;
    width: 350px; height: 350px;
    background: radial-gradient(circle, rgba(124,58,237,.15) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    opacity: 0;
    transform: translate(-50%,-50%);
    transition: opacity .5s;
    left: var(--gx, 50%); top: var(--gy, 50%);
  }
  .feat-card:hover::before { opacity: 1; }
  .feat-card:hover {
    transform: translateY(-15px) scale(1.02);
    border-color: rgba(124,58,237,.4);
    background: rgba(124,58,237,.05);
    box-shadow: 0 30px 80px rgba(0,0,0,.5);
  }

  /* Orb blobs */
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    opacity: .3;
    animation: orbDrift 20s ease-in-out infinite;
  }
  .orb:nth-child(2) { animation-duration: 25s; animation-delay: -5s; }
  .orb:nth-child(3) { animation-duration: 30s; animation-delay: -10s; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #05060f; }
  ::-webkit-scrollbar-thumb { background: #2e2e42; border-radius: 10px; }
`;


/* ─── Data Sections ─── */
const PROBLEMS = [
  { title: "Digital Eye Strain", desc: "Hours of scrolling leading to fatigue and headaches.", icon: "👁️" },
  { title: "Low Readability", desc: "Cluttered layouts making it hard to focus on content.", icon: "📑" },
  { title: "Dyslexia Hurdles", desc: "Standard fonts and spacing creating reading barriers.", icon: "🧩" },
];

const SOLUTIONS = [
  { title: "Adaptive Comfort", desc: "Lucida shifts text into your ideal visual rhythm effortlessly.", icon: "✨" },
  { title: "Distraction Free", desc: "A clean, glass-morphic interface that puts text first.", icon: "🛡️" },
];

const EXPANDED_FEATURES = [
  { icon: "🔡", title: "Adjustable Typography", desc: "Tailor font size, weight, and line-height. Create your perfect reading environment.", delay: 0 },
  { icon: "🎨", title: "Background Modes", desc: "Switch between high-contrast, dyslexia-friendly, and eye-care color palettes.", delay: 100 },
  { icon: "🎵", title: "Natural Narration", desc: "High-quality text-to-speech with guided word highlighting for focus.", delay: 200 },
  { icon: "🔍", title: "Focus Mode", desc: "Hide distractions and isolate text blocks to maximize your reading speed.", delay: 300 },
  { icon: "🕰️", title: "Time Estimates", desc: "Know exactly how long a section will take to read based on your pace.", delay: 400 },
  { icon: "📖", title: "Dyslexia Fonts", desc: "Specialized typefaces designed to reduce letter confusion and improve flow.", delay: 500 },
];

const STEPS = [
  { num: "01", title: "Paste Text", desc: "Copy any article, book or document link." },
  { num: "02", title: "Customize", desc: "Set your ideal contrast, font and speed." },
  { num: "03", title: "Read", desc: "Experience focus like never before." },
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
    <div className="anim-breathe" style={{ maxWidth: 540, width: "100%" }}>
      <div
        className="glass-strong"
        style={{ padding: "44px 42px", boxShadow: "0 36px 100px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.09)" }}
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
  const [scrollPct, setScrollPct] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const cardsRef = useRef([]);
  const blurRefs = useRef([]);

  // Scroll: navbar + progress bar + parallax
  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      setScrollY(top);
      setScrolled(top > 40);
      const doc = document.documentElement;
      const pct = (top / (doc.scrollHeight - doc.clientHeight)) * 100;
      setScrollPct(Math.min(pct, 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Card slide-up + scale + blur reveal
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("card-visible");
        }),
      { threshold: 0.12 }
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

  // Card glow-follow cursor
  useEffect(() => {
    const handleMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--gx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--gy", `${e.clientY - rect.top}px`);
    };
    const cards = document.querySelectorAll(".feat-card");
    cards.forEach((c) => c.addEventListener("mousemove", handleMove));
    return () => cards.forEach((c) => c.removeEventListener("mousemove", handleMove));
  }, []);

  // Magnetic button effect
  useEffect(() => {
    const buttons = document.querySelectorAll(".btn-primary, .btn-ghost");
    const onMove = (e) => {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) * 0.18;
      const dy = (e.clientY - rect.top - rect.height / 2) * 0.18;
      btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.05)`;
    };
    const onLeave = (e) => { e.currentTarget.style.transform = ""; };
    buttons.forEach((b) => {
      b.addEventListener("mousemove", onMove);
      b.addEventListener("mouseleave", onLeave);
    });
    return () => buttons.forEach((b) => {
      b.removeEventListener("mousemove", onMove);
      b.removeEventListener("mouseleave", onLeave);
    });
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <style>{STYLES}</style>

      {/* ── SCROLL PROGRESS ── */}
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

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
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />
        <div className="orb" style={{ width: 520, height: 520, left: "-120px", top: "-80px",  background: "#4c1d95", transform: `translateY(${scrollY * 0.15}px)` }} />
        <div className="orb" style={{ width: 380, height: 380, right: "-60px", bottom: "-60px", background: "#1e1b4b", transform: `translateY(${scrollY * 0.2}px)` }} />
        <div className="orb" style={{ width: 260, height: 260, right: "25%",   top: "10%",     background: "#5b21b6", opacity: .22, transform: `translateY(${scrollY * 0.05}px)` }} />

        {/* dual pane container */}
        <div
          style={{
            maxWidth: 1400, width: "100%", margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            padding: "140px 0 100px",
            position: "relative", zIndex: 1,
          }}
          className="hero-grid"
        >
          {/* LEFT PANE */}
          <div
            className="glass"
            style={{
              padding: "80px 72px",
              display: "flex", flexDirection: "column",
              justifyContent: "center", gap: 0,
              boxShadow: "0 32px 96px rgba(0,0,0,.5)",
              transform: `translateY(${scrollY * -0.05}px)`,
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
              {["Read", "without"].map((w, i) => (
                <span
                  key={i}
                  className="word-token"
                  style={{
                    animationDelay: `${i * 200 + 100}ms`,
                    marginRight: "0.28em",
                  }}
                >
                  {w}
                </span>
              ))}
              <br />
              {["boundaries."].map((w, i) => (
                <span
                  key={i}
                  className="word-token"
                  style={{
                    animationDelay: `500ms`,
                    background: "linear-gradient(135deg,#a78bfa 0%,#6366f1 60%,#818cf8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {w}
                </span>
              ))}
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
      {/* ── PROBLEM SECTION ── */}
      <section style={{ padding: "140px 24px", background: "#05060f" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="mobile-stack">
          <div ref={(el) => (blurRefs.current[3] = el)} className="blur-reveal">
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#ef4444", textTransform: "uppercase", marginBottom: 12, display: "block" }}>The Challenge</span>
            <h2 style={{ fontSize: "clamp(32px, 3.5vw, 44px)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: 24 }}>Reading shouldn't be painful.</h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,.5)", lineHeight: 1.7, marginBottom: 32 }}>Millions of readers struggle with digital interfaces that aren't built for human eyes or cognitive diversity.</p>
          </div>
          <div style={{ display: "grid", gap: 24 }}>
            {PROBLEMS.map((p, i) => (
              <div
                key={i}
                ref={(el) => (cardsRef.current[10+i] = el)}
                className="glass card-reveal p-8 flex gap-5"
                style={{ transitionDelay: `${i*150}ms` }}
              >                <span style={{ fontSize: 32 }}>{p.icon}</span>
                <div>
                  <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 6, fontSize: 18 }}>{p.title}</h4>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,.4)" }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION SECTION ── */}
      <section style={{ padding: "140px 24px", background: "linear-gradient(180deg, #05060f 0%, #0c0d21 100%)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center", marginBottom: 64 }}>
          <h2 ref={(el) => (blurRefs.current[4] = el)} className="blur-reveal" style={{ fontSize: "clamp(32px, 3.5vw, 44px)", fontWeight: 800, color: "#fff", marginBottom: 20 }}>The Lucida Solution</h2>
          <p ref={(el) => (blurRefs.current[5] = el)} className="blur-reveal" style={{ fontSize: 18, color: "rgba(255,255,255,.45)", transitionDelay: "100ms" }}>We bridge the gap between complex text and comfortable reading.</p>
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="mobile-stack">
          {SOLUTIONS.map((s, i) => (
            <div key={i} ref={(el) => (cardsRef.current[20+i] = el)} className="glass-strong card-reveal" style={{ padding: "48px", textAlign: "center", transitionDelay: `${i*200}ms` }}>
               <div style={{ width: 64, height: 64, background: "rgba(124,58,237,.15)", borderRadius: "50%", display: "grid", placeItems: "center", margin: "0 auto 24px", fontSize: 24, border: "1px solid rgba(124,58,237,.3)" }}>{s.icon}</div>
               <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginBottom: 16 }}>{s.title}</h3>
               <p style={{ color: "rgba(255,255,255,.45)", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES SECTION (UPDATED) ── */}
      <section style={{ padding: "140px 24px", background: "#0c0d21", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <h2 ref={(el) => (blurRefs.current[6] = el)} className="blur-reveal" style={{ fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px" }}>Premium Reading Toolkit</h2>
          <p ref={(el) => (blurRefs.current[7] = el)} className="blur-reveal" style={{ color: "rgba(255,255,255,.4)", marginTop: 16, fontSize: 17, transitionDelay: "100ms" }}>Every feature is designed to put you back in the flow.</p>
        </div>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 40 }} className="feat-grid mobile-stack">
          {EXPANDED_FEATURES.map((f, i) => (
            <div key={i} ref={(el) => (cardsRef.current[30+i] = el)} className="feat-card card-reveal" style={{ transitionDelay: `${f.delay}ms` }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(124,58,237,.1)", border: "1px solid rgba(124,58,237,.2)", display: "grid", placeItems: "center", fontSize: 28, marginBottom: 28 }}>{f.icon}</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{f.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,.45)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "140px 24px", background: "#05060f" }}>
        <h2 ref={(el) => (blurRefs.current[8] = el)} className="blur-reveal" style={{ textAlign: "center", color: "#fff", fontSize: 36, fontWeight: 800, marginBottom: 64 }}>Simple. Fast. Focused.</h2>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="mobile-stack">
          {STEPS.map((s, i) => (
            <div key={i} ref={(el) => (cardsRef.current[40+i] = el)} className="card-reveal" style={{ textAlign: "center", transitionDelay: `${i*150}ms` }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: "rgba(124,58,237,.1)", marginBottom: -20, userSelect: "none" }}>{s.num}</div>
              <h4 style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 12, position: "relative" }}>{s.title}</h4>
              <p style={{ color: "rgba(255,255,255,.4)", padding: "0 20px" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section style={{ padding: "160px 24px", background: "radial-gradient(circle at 50% 50%, rgba(124,58,237,.1) 0%, transparent 70%)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }} ref={(el) => (blurRefs.current[9] = el)} className="blur-reveal">
           <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, color: "#fff", marginBottom: 32, lineHeight: 1.1 }}>Start your focused reading experience today.</h2>
           <p style={{ fontSize: 19, color: "rgba(255,255,255,.5)", marginBottom: 48 }}>Join thousands of readers who have rediscovered the joy of reading.</p>
           <button className="btn-primary" style={{ padding: "20px 56px", fontSize: 18 }}>Get Lucida Now — It's Free</button>
           <div style={{ marginTop: 24, fontSize: 14, color: "rgba(124,58,237,.6)", fontWeight: 500 }}>No credit card required. No distractions.</div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,.06)", padding: "80px 24px 40px", background: "#05060f" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48 }} className="mobile-stack">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>Lucida <span style={{ color: "#7c3aed" }}>✦</span></div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.3)", lineHeight: 1.6 }}>The world's most adaptive reading tool, built for accessibility and human focus.</p>
          </div>
          {["Product", "Company", "Resources"].map((t, i) => (
            <div key={i}>
              <h5 style={{ color: "#fff", fontWeight: 700, marginBottom: 20, fontSize: 14 }}>{t}</h5>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["Link Alpha", "Beta Access", "Changelog"].map((l, j) => (
                  <span key={j} style={{ fontSize: 13, color: "rgba(255,255,255,.25)", cursor: "pointer" }}>{l}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1200, margin: "64px auto 0", paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.03)", textAlign: "center", color: "rgba(255,255,255,.15)", fontSize: 12 }}>
          © 2025 Lucida Accessibility. All rights reserved.
        </div>
      </footer>
<<<<<<< Updated upstream
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
=======

      <style>{`
        .mobile-stack {
          transition: all 0.5s ease;
        }
        @media (max-width: 768px) {
          .mobile-stack { grid-template-columns: 1fr !important; gap: 32px !important; text-align: center !important; }
          .mobile-stack > div { margin: 0 auto; }
        }
        .feat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        @media (max-width: 900px) {
          .feat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
>>>>>>> Stashed changes
  );
}
