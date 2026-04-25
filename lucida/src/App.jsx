import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Routes, Route, Navigate, useNavigate, Link } from "react-router-dom";
import Workspace from "./components/workspace/Workspace";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

/* ─── Modern Design System Styles ─── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');


  html { scroll-behavior: smooth; }
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #05060f;
    color: #fff;
    overflow-x: hidden;
  }

  .glass {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  .glass-panel {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(40px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .btn-primary {
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: #fff;
    border: none;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 10px 30px rgba(79, 70, 229, 0.3);
  }
  .btn-primary:active { transform: scale(0.96) !important; }

  .btn-ghost {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .btn-ghost:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.3);
  }

  /* Hardware Accelerated Demo Styles */
  .demo-text-container {
    letter-spacing: var(--letter-spacing, normal);
    line-height: var(--line-height, 1.5);
    font-family: var(--font-family, inherit);
    transition: letter-spacing 0.4s ease-out, line-height 0.4s ease-out, font-family 0.4s ease-out;
  }
  
  .stacked-card {
    transition: all 0.5s ease-out;
  }

  .scroll-progress {
    position: fixed;
    top: 0; left: 0; height: 3px;
    background: linear-gradient(90deg, #6366f1, #a855f7);
    z-index: 1000;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #05060f; }
  ::-webkit-scrollbar-thumb { background: #2e2e42; border-radius: 10px; }
  
  @font-face {
    font-family: 'OpenDyslexic';
    src: url('https://cdn.jsdelivr.net/npm/opendyslexic@1.0.3/font/OpenDyslexic-Regular.otf');
  }
`;

const FEATURES = [
  { icon: "✨", title: "Adaptive Typography", desc: "Auto-calibrates spacing and weight based on your cognitive profile in real time." },
  { icon: "🔍", title: "Focus Mode", desc: "Isolates the current reading zone, completely stripping away peripheral visual noise." },
  { icon: "🧩", title: "Dyslexia Support", desc: "Native integration of heavy-bottomed OpenDyslexic fonts to anchor characters securely." },
  { icon: "⚡", title: "Real-time Customization", desc: "Instantaneous rendering modifications without page reloads or jarring shifts." },
  { icon: "🧭", title: "Guided Reading", desc: "Anchors your optical path with rhythmically paced highlighter progression tracking." }
];

/* ─── Scroll Story Component ─── */
function ScrollStory() {
  const [step, setStep] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const stepsRefs = useRef([]);
  const demoContainerRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      let visibleIndexes = [];
      entries.forEach((e) => {
        if (e.isIntersecting) {
          visibleIndexes.push(parseInt(e.target.dataset.index));
        }
      });
      if (visibleIndexes.length > 0) {
        setStep(Math.max(...visibleIndexes));
      }
    }, { rootMargin: "-10% 0px -25% 0px", threshold: 0.3 });
    stepsRefs.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Hardware Accelerated Variables Injection
  useEffect(() => {
    if (!demoContainerRef.current) return;
    const el = demoContainerRef.current;
    
    let ls = '0px';
    let lh = '1.4';
    let ff = '"Plus Jakarta Sans", sans-serif';

    if (step >= 1) { 
      ls = '0.08em';
      lh = '2.2';
    }
    if (step >= 2) { 
      ls = '0.12em';
      lh = '2.4';
      ff = '"OpenDyslexic", sans-serif';
    }

    el.style.setProperty('--letter-spacing', ls);
    el.style.setProperty('--line-height', lh);
    el.style.setProperty('--font-family', ff);
  }, [step]);

  useEffect(() => {
    if (step !== 4) {
      setCurrentWordIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setCurrentWordIndex(prev => (prev + 1) % 18); 
    }, 380); 
    return () => clearInterval(interval);
  }, [step]);

  const storySteps = [
    { badge: "Step 0 / 4", title: "The Reading Problem", desc: "Standard, dense digital interfaces exhaust cognitive resources rapidly. The text is cramped, and visual noise creates profound strain." },
    { badge: "Step 1 / 4", title: "Adaptive Mechanics", desc: "We deploy real-time hardware acceleration to expand the spatial architecture. Words and lines breathe, reducing tracking effort." },
    { badge: "Step 2 / 4", title: "Dyslexia Foundation", desc: "A seamless switch to heavy-bottomed structural typefaces anchors characters securely, combatting rotational confusion instantly." },
    { badge: "Step 3 / 4", title: "Total Focus Override", desc: "Peripheral light is dimmed. Visual cognitive energy is tunneled explicitly into the active block you are parsing." },
    { badge: "Step 4 / 4", title: "Pacing & Flow", desc: "Our engine tracks your rhythm, generating a temporal anchor that physically guides your eyes sequentially without friction." },
  ];

  const tokenizedDemo = [
    ["Digital", "text", "consumption", "is", "inherently", "flawed."],
    ["Standard,", "dense", "interfaces", "rapidly", "exhaust", "precious", "cognitive", "resources."],
    ["Lucida", "analyzes", "spatial", "structure", "and", "perfects", "it."]
  ];

  let cumulativeWordCount = 0; 

  return (
    <section className="bg-[#05060f] relative w-full pt-10 pb-16 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 relative">
        
        {/* Left Side: Story Triggers - Responsive margins */}
        <div className="space-y-[30vh] lg:space-y-[40vh] pb-[20vh] lg:pb-[25vh] pt-[10vh] lg:pt-[15vh]">
          {storySteps.map((s, i) => (
            <div key={i} data-index={i} ref={el => stepsRefs.current[i] = el} className={`transition-all duration-500 ease-out ${step === i ? 'opacity-100 scale-100 blur-0 translate-y-0' : 'opacity-20 scale-100 blur-sm translate-y-4'}`}>
              <div className="flex items-center gap-4 mb-4 lg:mb-6">
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-indigo-400">{s.badge}</span>
                <div className="h-px w-8 bg-indigo-500/40" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter mb-4 lg:mb-6 leading-[1.05]">{s.title}</h2>
              <p className="text-lg sm:text-xl text-white/40 leading-relaxed font-medium">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Right Side: Simulated Workspace DOM - Static on mobile, Sticky on desktop */}
        <div className="fixed bottom-0 left-0 w-full lg:w-auto lg:relative block lg:sticky lg:top-[20vh] h-[40vh] lg:h-[60vh] z-10 transition-transform duration-1000 ease-out lg:py-6 p-4 lg:p-0 pointer-events-none lg:pointer-events-auto opacity-100">
          <div className="w-full h-full glass-panel rounded-t-[30px] lg:rounded-[40px] flex shadow-[0_-20px_40px_rgba(0,0,0,0.8)] lg:shadow-[0_60px_100px_rgba(0,0,0,0.8)] overflow-hidden border-b-0 lg:border-b">
            
            <div className="w-full h-full bg-[#080914] flex flex-col relative p-6 sm:p-8 lg:p-12 overflow-hidden overflow-y-auto">
              <div className="flex justify-between items-center pb-4 lg:pb-6 mb-4 lg:mb-8 border-b border-white/10 relative z-20">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-red-500/20" />
                  <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-green-500/20" />
                </div>
                <div className="px-3 py-1 lg:px-4 lg:py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-md">
                   <span className="text-[8px] lg:text-[9px] font-black text-indigo-400 uppercase tracking-widest">Workspace Demo Rendering</span>
                </div>
              </div>

              <div ref={demoContainerRef} className="flex-1 demo-text-container text-lg sm:text-xl lg:text-2xl relative z-10">
                {tokenizedDemo.map((para, pIdx) => {
                  return (
                    <div 
                      key={pIdx} 
                      className={`flex flex-wrap items-baseline transition-all duration-500 ease-out mb-6 lg:mb-8 
                        ${step >= 3 && pIdx !== 1 ? 'opacity-30 blur-[1px]' : 'opacity-100 blur-0'}
                      `}
                    >
                      {para.map((word, wIdx) => {
                        const globalIdx = cumulativeWordCount++;
                        const isHighlighted = step === 4 && globalIdx === currentWordIndex;
                        
                        return (
                          <div key={wIdx} className="relative inline-block mr-[var(--word-spacing, 0.3em)] mb-1.5 lg:mb-2">
                            <span 
                              className={`transition-all duration-150 inline-block px-1 rounded-md
                                ${isHighlighted 
                                  ? 'bg-purple-500/20 text-white scale-[1.05] border-b-2 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] z-10' 
                                  : 'text-white/80'}
                              `}
                            >
                              {word}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[120%] h-[50%] bg-[#05060f]/90 blur-[30px] pointer-events-none z-0" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── Stacked Feature Cards Component ─── */
function StackedFeatures() {
  return (
    <section className="py-24 sm:py-32 w-full bg-[#05060f] relative border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full text-center relative z-20 mb-16 sm:mb-32">
          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-4 block">Core Mechanics</span>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tighter italic">Engineered for clarity.</h2>
      </div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 w-full relative space-y-[4vh] sm:space-y-[2vh] pb-[20vh] sm:pb-[40vh]">
        {FEATURES.map((feat, idx) => (
          <div 
            key={idx} 
            className="sticky w-full"
            style={{ top: `calc(10vh + ${idx * 20}px)`, zIndex: idx }}
          >
            <div className="w-full glass-panel stacked-card p-6 sm:p-10 lg:p-12 rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex flex-col sm:flex-row items-start gap-4 sm:gap-8 bg-[#0a0b14]/95 border-white/10 hover:border-indigo-500/30 hover:bg-[#0a0b14]">
              <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl sm:text-3xl shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                {feat.icon}
              </div>
              <div className="pt-1 sm:pt-2">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-2 sm:mb-4 uppercase tracking-tighter">{feat.title}</h3>
                <p className="text-sm sm:text-base lg:text-lg text-white/50 leading-relaxed font-medium">{feat.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Main Landing Page Content ─── */
function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      setScrollY(top);
      setScrolled(top > 40);
      const doc = document.documentElement;
      const pct = (top / (doc.scrollHeight - doc.clientHeight)) * 100;
      setScrollPct(Math.min(pct, 100));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      if (window.innerWidth < 1024) return; // Disable tilt on mobile
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      if(el.classList.contains("hero-tilt")) {
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `perspective(1000px) rotateY(${x / 30}deg) rotateX(${-y / 30}deg) translateY(${scrollY * -0.05}px)`;
      } else if(el.classList.contains("magnetic")) {
        const dx = (e.clientX - rect.left - rect.width / 2) * 0.2;
        const dy = (e.clientY - rect.top - rect.height / 2) * 0.2;
        el.style.transform = `translate(${dx}px, ${dy}px) scale(1.05)`;
      }
    };
    const handleLeave = (e) => {
      e.currentTarget.style.transform = "";
    };
    const elements = document.querySelectorAll(".hero-tilt, .magnetic");
    elements.forEach((el) => {
      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);
    });
    return () => elements.forEach((el) => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    });
  }, [scrollY]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-[#05060f] min-h-screen font-['Plus_Jakarta_Sans',sans-serif]">
      <style>{STYLES}</style>
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-3 sm:py-4 bg-[#05060f]/90 backdrop-blur-2xl border-b border-white/5' : 'py-6 sm:py-8'}`}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 decoration-transparent">
            <span className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white text-xs sm:text-sm shadow-[0_0_20px_rgba(79,70,229,0.5)]">✦</span>
            <span className="text-lg sm:text-xl font-black tracking-tighter uppercase text-white">Lucida</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
             <Link to="/login" className="text-[20px] font-black text-white/40 hover:text-white uppercase tracking-[0.3em] transition-colors decoration-transparent">Login</Link>
             <button onClick={() => navigate('/register')} className="btn-primary magnetic px-6 py-2.5 rounded-xl text-md font-black tracking-wide">Get Started</button>
          </div>

          {/* Mobile Nav Toggle */}
          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
             <div className="space-y-1.5">
               <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
               <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
               <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
             </div>
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-[#05060f]/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden"
            >
              <div className="flex flex-col gap-6 px-6 py-8">
                 <Link to="/login" className="text-sm font-black text-white uppercase tracking-widest decoration-transparent" onClick={() => setMenuOpen(false)}>Login</Link>
                 <Link to="/register" className="text-sm font-black text-indigo-400 uppercase tracking-widest decoration-transparent" onClick={() => setMenuOpen(false)}>Get Started</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section className="min-h-[100svh] flex items-center pt-24 sm:pt-32 pb-20 sm:pb-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(79,70,229,0.1),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 relative z-10 h-full">
          {/* Text Pane - Col 1 to 6 */}
          <div className="col-span-1 lg:col-span-6 flex flex-col justify-center text-center lg:text-left pt-10 sm:pt-0">
            <h1 className="text-5xl sm:text-7xl lg:text-[100px] font-black text-white leading-[0.9] lg:leading-[0.85] tracking-tighter mb-6 sm:mb-10">
              Reading, <br className="hidden sm:block"/>
              <span className="bg-gradient-to-r from-white via-indigo-200 to-indigo-500 bg-clip-text text-transparent">optimized <br className="hidden lg:block"/> for you.</span>
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-white/50 leading-relaxed font-medium mb-10 sm:mb-16 max-w-lg mx-auto lg:mx-0">
              Lucida is an intelligent reading system that actively restructures content to align with your cognitive capacity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-5 w-full sm:w-auto">
              <button onClick={() => navigate('/register')} className="btn-primary magnetic rounded-[16px] sm:rounded-[20px] px-8 sm:px-12 py-4 sm:py-5 text-sm sm:text-base font-black">Get Started</button>
              <button onClick={() => navigate('/login')} className="btn-ghost magnetic rounded-[16px] sm:rounded-[20px] px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-base font-black">Login to Workspace</button>
            </div>
          </div>

          {/* Visual Pane - Col 7 to 12 */}
          <div className="col-span-1 lg:col-span-6 relative flex items-center justify-center mt-8 lg:mt-0 px-2 sm:px-0">
            <div className="w-full max-w-[500px] glass-panel hero-tilt p-2 rounded-[32px] sm:rounded-[56px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] sm:shadow-[0_50px_150px_rgba(0,0,0,1)] transition-transform duration-200 ease-out">
              <div className="bg-[#0a0b16] rounded-[28px] sm:rounded-[50px] p-6 sm:p-10 lg:p-14 h-full relative overflow-hidden flex flex-col justify-between aspect-[4/3]">
                <div className="flex justify-between items-center mb-6 sm:mb-8 relative z-10">
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/20" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/20" />
                  </div>
                  <div className="flex gap-1.5 sm:gap-2 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.6)]" />
                    <span className="text-[8px] sm:text-[10px] font-bold text-emerald-400/80 uppercase tracking-widest">Active System</span>
                  </div>
                </div>
                
                <div className="space-y-4 sm:space-y-6 relative z-10 my-2 sm:my-4">
                  <div className="w-full h-6 sm:h-8 rounded-lg sm:rounded-xl bg-white/5" />
                  <div className="w-5/6 h-6 sm:h-8 rounded-lg sm:rounded-xl bg-white/10" />
                  <div className="w-full h-6 sm:h-8 rounded-lg sm:rounded-xl bg-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.2)]" />
                  <div className="w-4/5 h-6 sm:h-8 rounded-lg sm:rounded-xl bg-white/5" />
                </div>
                
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/5 flex justify-between relative z-10">
                  <div>
                    <div className="text-[8px] sm:text-[10px] font-black text-white/30 tracking-widest uppercase mb-0.5 sm:mb-1">Rhythm</div>
                    <div className="text-xl sm:text-2xl font-black text-white">Adaptive</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] sm:text-[10px] font-black text-indigo-400/50 tracking-widest uppercase mb-0.5 sm:mb-1">Fatigue</div>
                    <div className="text-xl sm:text-2xl font-black text-indigo-400">-40%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* ── SCROLL INTERACTIVE DEMO ── */}
      <ScrollStory />

      {/* ── STACKED FEATURE CARDS ── */}
      <StackedFeatures />

      {/* ── CTA ── */}
      <section className="py-32 sm:py-48 border-t border-white/5 relative overflow-hidden bg-[#05060f]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full text-center relative z-10">
          <h2 className="text-5xl sm:text-8xl lg:text-[110px] font-black text-white leading-[0.9] sm:leading-[0.8] tracking-tighter mb-10 sm:mb-16">
            Ready to read <br/> clearly?
          </h2>
          <button onClick={() => navigate('/register')} className="btn-primary magnetic px-8 sm:px-[60px] py-4 sm:py-[22px] text-base sm:text-lg font-black rounded-[20px] sm:rounded-3xl w-full sm:w-auto">Create Account</button>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-indigo-600/10 blur-[100px] sm:blur-[200px] rounded-full pointer-events-none" />
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full flex flex-col md:flex-row justify-between items-center text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
          <div className="flex items-center gap-3 mb-6 md:mb-0">
            <span className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-lg hover:rotate-12 transition-transform cursor-pointer">✦</span>
            <span>© 2025 Lucida. All rights reserved.</span>
          </div>
          <div className="flex gap-8">
            <span className="cursor-pointer hover:text-white transition">Privacy</span>
            <span className="cursor-pointer hover:text-white transition">Legal</span>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

/* ─── Protected Route Component ─── */
const ProtectedRoute = ({ children }) => {
  const isActive = localStorage.getItem('lucida_active_session');
  if (!isActive) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

/* ─── Main App Router ─── */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/workspace" 
        element={
          <ProtectedRoute>
            <Workspace />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
