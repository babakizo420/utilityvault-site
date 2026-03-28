import { useState, useEffect } from "react";

const themes = {
  dark: { bg: "#050403", card: "#0E0C08", border: "#1E1A12", accent: "#FFB347", accentLight: "#FFD08A", accentDim: "rgba(255,179,71,0.10)", text: "#F7F3ED", gray: "#8A826E", grain: 0.02 },
  light: { bg: "#FEFAF4", card: "#FFFFFF", border: "#F0E6D4", accent: "#D4891A", accentLight: "#9A6010", accentDim: "rgba(212,137,26,0.06)", text: "#2A2010", gray: "#7A7060", grain: 0.01 },
};

function useTyper(p, s = 50, d = 25, w = 2500) { const [t, setT] = useState(""); const [i, setI] = useState(0); const [dl, setD] = useState(false); useEffect(() => { const c = p[i]; let tm; if (!dl && t === c) tm = setTimeout(() => setD(true), w); else if (dl && t === "") { setD(false); setI(x => (x + 1) % p.length); } else if (dl) tm = setTimeout(() => setT(x => x.slice(0, -1)), d); else tm = setTimeout(() => setT(c.slice(0, t.length + 1)), s); return () => clearTimeout(tm); }, [t, i, dl]); return t; }

function Toggle({ dark, flip, accent }) {
  return <button onClick={flip} style={{ position: "fixed", top: 20, right: 20, zIndex: 100, width: 42, height: 42, borderRadius: "50%", background: `${accent}12`, border: `1px solid ${accent}30`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}>
    {dark ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>}
  </button>;
}

export default function UtilityVaultPage() {
  const [vis, setVis] = useState(false);
  const [dark, setDark] = useState(true);
  const T = dark ? themes.dark : themes.light;
  const typed = useTyper(["SOP Templates.", "Business Systems.", "Automation Playbooks.", "Builder Toolkits."]);
  useEffect(() => { setTimeout(() => setVis(true), 300); }, []);

  const items = ["📋", "⚙️", "📊", "🗂️", "📐", "🔧"];

  return (<>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');*{margin:0;padding:0;box-sizing:border-box}::selection{background:rgba(255,179,71,0.3)}@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.85)}}@keyframes cursorBlink{0%,100%{opacity:1}50%{opacity:0}}@keyframes breathe{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.2}50%{transform:translate(-50%,-50%) scale(1.08);opacity:.4}}@keyframes floatItem{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}@keyframes boltFlash{0%,90%,100%{opacity:0.5}95%{opacity:1;filter:drop-shadow(0 0 12px rgba(255,179,71,0.5))}}@keyframes grain{0%,100%{transform:translate(0,0)}50%{transform:translate(5%,3%)}}`}</style>
    <Toggle dark={dark} flip={() => setDark(!dark)} accent={T.accent} />
    <div style={{ backgroundColor: T.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", padding: "48px 24px", overflow: "hidden", fontFamily: "'Outfit', sans-serif", transition: "background-color 0.4s, color 0.4s" }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 50, opacity: T.grain, background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, animation: "grain 4s steps(5) infinite" }} />

      {/* Floating items */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {items.map((icon, i) => <div key={i} style={{ position: "absolute", left: `${15 + i * 13}%`, top: `${20 + Math.sin(i * 1.2) * 25}%`, fontSize: 20, opacity: dark ? 0.06 : 0.1, animation: `floatItem ${4 + i * 0.8}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}>{icon}</div>)}
      </div>

      <div style={{ position: "absolute", top: "45%", left: "50%", transform: "translate(-50%,-50%)", width: 380, height: 380, borderRadius: "50%", background: `radial-gradient(circle, ${T.accentDim} 0%, transparent 55%)`, animation: "breathe 7s ease infinite" }} />

      <div style={{ maxWidth: 520, textAlign: "center", position: "relative", zIndex: 10 }}>
        <div style={{ opacity: vis ? 1 : 0, transition: "opacity 0.8s ease 0.2s", marginBottom: 28, animation: vis ? "boltFlash 4s ease infinite" : "none" }}>
          <svg width={36} height={52} viewBox="0 0 36 52" fill="none" style={{ display: "block", margin: "0 auto" }}><path d="M20 2L4 24H16L12 50L32 22H18L20 2Z" stroke={T.accent} strokeWidth="1.5" fill={T.accentDim} strokeLinejoin="round" /></svg>
        </div>
        <h1 style={{ fontSize: "clamp(32px, 7vw, 50px)", fontWeight: 700, color: T.text, letterSpacing: 1, lineHeight: 1.05, marginBottom: 8, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s" }}>Utility Vault</h1>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: T.accent, letterSpacing: 5, textTransform: "uppercase", fontWeight: 700, marginBottom: 32, opacity: vis ? 1 : 0, transition: "opacity 0.8s ease 0.5s" }}>Digital Products</p>
        <div style={{ width: vis ? 50 : 0, height: 2, background: `linear-gradient(90deg, transparent, ${T.accent}, transparent)`, margin: "0 auto 32px", transition: "width 0.8s ease 0.6s" }} />
        <div style={{ height: 26, marginBottom: 28, opacity: vis ? 1 : 0, transition: "opacity 0.8s ease 0.7s" }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "clamp(13px, 2.5vw, 17px)", color: T.accentLight }}>{typed}</span>
          <span style={{ display: "inline-block", width: 2, height: 18, backgroundColor: T.accent, marginLeft: 3, animation: "cursorBlink 1s infinite" }} />
        </div>
        <p style={{ fontSize: "clamp(14px, 2vw, 16px)", color: T.gray, lineHeight: 1.8, maxWidth: 420, margin: "0 auto 40px", opacity: vis ? 1 : 0, transition: "all 0.8s ease 0.8s" }}>Templates, SOPs, and tools. Systems packaged for builders who move fast. Available on Gumroad.</p>

        {/* Product tags */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 36, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(16px)", transition: "all 0.8s ease 0.9s" }}>
          {["SOPs", "Templates", "Playbooks"].map(item => (
            <div key={item} style={{ padding: "12px 18px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: T.gray, letterSpacing: 1.5, textTransform: "uppercase", transition: "border-color 0.3s, color 0.3s", cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${T.accent}50`; e.currentTarget.style.color = T.accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.gray; }}
            >{item}</div>
          ))}
        </div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 24px", background: T.card, border: `1px solid ${T.accent}25`, borderRadius: 10, opacity: vis ? 1 : 0, transition: "all 0.8s ease 1s" }}><div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: T.accent, animation: "pulse 2s infinite" }} /><span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: T.accent, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Building</span></div>
        <div style={{ marginTop: 48, opacity: vis ? 1 : 0, transition: "opacity 0.8s ease 1.1s" }}><p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: T.gray, letterSpacing: 3, marginBottom: 8 }}>A DIVISION OF</p><a href="https://blessedops.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Outfit'", fontSize: 14, fontWeight: 600, color: T.gray, textDecoration: "none", letterSpacing: 2, transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = T.accent} onMouseLeave={e => e.target.style.color = T.gray}>BLESSEDOPS GROUP</a></div>
      </div>
    </div>
  </>);
}
