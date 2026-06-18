import { useState, useEffect, useRef } from "react";
import {
  MapPin, Mail, Phone, Smartphone, Linkedin, Facebook,
  Send, Menu, X, GraduationCap, Briefcase,
  Cpu, BarChart2, FileText, Database, FolderOpen,
  Globe, Users, Target, Zap, RefreshCw, Award, Star, CheckCircle,
  ChevronLeft, ChevronRight
} from "lucide-react";
import './App.css'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Jost:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  :root {
    --navy:#0b1622; --navy2:#152035; --gold:#c9a84c; --gold2:#e8c96a;
    --white:#f4efe6; --gray:#7a8fa8; --card:rgba(21,32,53,0.72);
  }
  html { scroll-behavior:smooth; }
  body { font-family:'Jost',sans-serif; background:var(--navy); color:var(--white); overflow-x:hidden; cursor:none; }
  .cur  { position:fixed;width:10px;height:10px;background:var(--gold);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:difference; }
  .cur2 { position:fixed;width:32px;height:32px;border:1.5px solid var(--gold);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);opacity:.4;transition:left .1s ease,top .1s ease; }
  ::-webkit-scrollbar{width:3px} ::-webkit-scrollbar-track{background:var(--navy)} ::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px}
  .grid-bg { position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.08;background-image:linear-gradient(rgba(201,168,76,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.4) 1px,transparent 1px);background-size:52px 52px;animation:gridMove 28s linear infinite; }
  @keyframes gridMove { to { background-position:52px 52px; } }
  .ptcl { position:fixed;border-radius:50%;pointer-events:none;z-index:1;background:var(--gold);opacity:0;animation:floatUp linear infinite; }
  @keyframes floatUp { 0%{transform:translateY(100vh) scale(0);opacity:0} 8%{opacity:.3} 92%{opacity:.1} 100%{transform:translateY(-8vh) scale(.7);opacity:0} }

  /* NAV */
  nav { position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:1rem 3rem;background:rgba(11,22,34,.85);backdrop-filter:blur(20px);border-bottom:1px solid rgba(201,168,76,.12); }
  .logo { font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:900;color:var(--gold);cursor:pointer;letter-spacing:.04em; }
  .nav-ul { display:flex;gap:2.2rem;list-style:none; }
  .nav-ul a { font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gray);text-decoration:none;position:relative;padding-bottom:3px;transition:color .25s; }
  .nav-ul a::after { content:'';position:absolute;bottom:0;left:0;width:0;height:2px;background:var(--gold);transition:width .3s; }
  .nav-ul a:hover { color:var(--gold); }
  .nav-ul a:hover::after { width:100%; }
  .burger { display:none;background:none;border:none;cursor:pointer;color:var(--gold); }
  .mob-menu { position:fixed;inset:0;background:rgba(11,22,34,.97);z-index:300;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2.5rem;transform:translateX(100%);transition:transform .4s cubic-bezier(.77,0,.18,1); }
  .mob-menu.open { transform:translateX(0); }
  .mob-menu a { font-size:1.4rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gray);text-decoration:none;transition:color .25s; }
  .mob-menu a:hover { color:var(--gold); }
  .mob-close { position:absolute;top:1.5rem;right:2rem;background:none;border:none;cursor:pointer;color:var(--gold); }

  /* HERO */
  #hero {
    position:relative;
    z-index:2;
  }
  #hero .section-inner { display:grid; grid-template-columns:1fr 1fr; align-items:center; gap:3rem; max-width:1400px; margin:0 auto; padding:175px 4rem 3rem; }
  .hero-left { display:flex;flex-direction:column;align-items:flex-start; }
  .hero-badge { display:inline-flex;align-items:center;gap:.5rem;padding:.38rem 1.1rem;border:1px solid rgba(201,168,76,.4);border-radius:100px;font-size:.75rem;letter-spacing:.15em;text-transform:uppercase;color:var(--gold);margin-bottom:1.4rem;animation:badgePulse 3.5s ease-in-out infinite; }
  @keyframes badgePulse { 0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,.3)} 50%{box-shadow:0 0 0 10px rgba(201,168,76,0)} }
  .hero-suname { font-family:'Playfair Display',serif;font-size:clamp(7.4rem,6vw,5rem);font-weight:900;line-height:.9;letter-spacing:-.02em;background:linear-gradient(135deg,var(--white) 30%,var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:.3rem; }
  .hero-name { font-family:'Playfair Display',serif;font-size:clamp(4rem,3.2vw,2.6rem);font-weight:700;line-height:1;letter-spacing:-.01em;background:linear-gradient(135deg,var(--white) 30%,var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:1rem; }
  .hero-sub { font-size:clamp(.72rem,1.2vw,.88rem);color:var(--gray);letter-spacing:.12em;text-transform:uppercase;font-weight:300;margin-bottom:1.2rem; }
  .hero-bio { font-size:0.99rem;color:rgba(244,239,230,.65);line-height:1.8;font-style:italic;margin-bottom:2rem;max-width:420px; }
  .hero-btns { display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:2.2rem; }
  .hero-stats { display:flex;gap:2rem;flex-wrap:wrap;border-top:1px solid rgba(201,168,76,.15);padding-top:1.6rem; }
  .stat-n { font-family:'Playfair Display',serif;font-size:2rem;font-weight:900;color:var(--gold);display:block; }
  .stat-l { font-size:.68rem;letter-spacing:.12em;color:var(--gray);text-transform:uppercase; }

  /* SLIDESHOW */
  .hero-right {
    position:relative;
    height:75vh;
    max-height:620px;
    min-height:380px;
    overflow:hidden;
  }
  .hero-right img { width:100%;height:100%;object-fit:cover;object-position:center;display:block;filter:brightness(.72) saturate(.9); }
  .hero-img-overlay { position:absolute;inset:0;background:linear-gradient(135deg,rgba(11,22,34,.45) 0%,rgba(201,168,76,.04) 100%);pointer-events:none; }
  .slide-badge { position:absolute;bottom:1rem;left:1rem;background:rgba(11,22,34,.88);border:1px solid rgba(201,168,76,.35);border-radius:8px;padding:.5rem .9rem;font-size:.72rem;letter-spacing:.1em;color:var(--gold);backdrop-filter:blur(8px);display:flex;align-items:center;gap:.55rem; }
  .pulse-dot { width:7px;height:7px;border-radius:50%;background:var(--gold);animation:badgePulse 2s ease-in-out infinite;flex-shrink:0; }
  .slide-dots { position:absolute;bottom:1rem;right:1rem;display:flex;gap:.4rem; }
  .slide-dot { width:6px;height:6px;border-radius:50%;background:rgba(201,168,76,.35);border:none;cursor:pointer;padding:0;transition:all .3s; }
  .slide-dot.on { background:var(--gold);transform:scale(1.3); }
  .slide-arrow { position:absolute;top:50%;transform:translateY(-50%);background:rgba(11,22,34,.6);border:1px solid rgba(201,168,76,.3);border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;color:var(--gold);cursor:pointer;transition:all .25s;backdrop-filter:blur(6px); }
  .slide-arrow:hover { background:rgba(201,168,76,.2);border-color:rgba(201,168,76,.6); }
  .slide-prev { left:.7rem; }
  .slide-next { right:.7rem; }

  /* SECTIONS */
  section { position:relative;z-index:2; }
  .section-inner { max-width:1100px;margin:0 auto;padding:5rem 2rem; }
  .s-label { display:inline-flex;align-items:center;gap:.5rem;font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem; }
  .s-label::before { content:'';display:block;width:24px;height:1.5px;background:var(--gold); }
  .s-title { font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;color:var(--white);line-height:1.1;margin-bottom:.8rem; }
  .s-title em { color:var(--gold);font-style:normal; }
  .s-line { width:52px;height:3px;background:var(--gold);border-radius:2px;margin-bottom:2.5rem; }

  /* ABOUT */
  #about { background:linear-gradient(180deg,var(--navy) 0%,var(--navy2) 100%); }
  .about-grid { display:grid;grid-template-columns:1fr 1.7fr;gap:4rem;align-items:center; }
  .avatar-wrap { position:relative;max-width:280px;margin:0 auto; }
  .avatar-box { width:100%;aspect-ratio:1;border-radius:16px;background:linear-gradient(135deg,rgba(201,168,76,.08),rgba(30,47,72,.9));border:1px solid rgba(201,168,76,.3);display:flex;align-items:center;justify-content:center;font-size:5rem;animation:floatAvatar 5s ease-in-out infinite;box-shadow:0 0 80px rgba(201,168,76,.08); }
  @keyframes floatAvatar { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(1.5deg)} }
  .av-deco1 { position:absolute;top:-14px;left:-14px;width:46px;height:46px;border-top:2.5px solid var(--gold);border-left:2.5px solid var(--gold);border-radius:4px; }
  .av-deco2 { position:absolute;bottom:-14px;right:-14px;width:46px;height:46px;border-bottom:2.5px solid var(--gold);border-right:2.5px solid var(--gold);border-radius:4px; }
  .about-text p { color:rgba(244,239,230,.72);line-height:1.9;margin-bottom:1.2rem; }
  .tag-row { display:flex;flex-wrap:wrap;gap:.6rem;margin-top:1.2rem; }
  .tag { display:inline-flex;align-items:center;gap:.35rem;padding:.32rem .85rem;border-radius:100px;font-size:.75rem;letter-spacing:.06em;font-weight:500; }
  .tg { background:rgba(201,168,76,.13);color:var(--gold);border:1px solid rgba(201,168,76,.28); }
  .tb { background:rgba(30,47,72,.7);color:var(--gray);border:1px solid rgba(122,143,168,.2); }

  /* SKILLS */
  #skills { background:var(--navy); }
  .skills-grid { display:grid;grid-template-columns:1fr 1fr;gap:4rem; }
  .skill-item { margin-bottom:1.4rem; }
  .sk-head { display:flex;justify-content:space-between;align-items:center;margin-bottom:.4rem; }
  .sk-name { font-size:.88rem;font-weight:500;letter-spacing:.04em; }
  .sk-sub  { font-size:.72rem;color:var(--gray);margin-bottom:.4rem; }
  .sk-pct  { font-size:.82rem;color:var(--gold);font-weight:600; }
  .sk-bar  { height:5px;background:rgba(255,255,255,.07);border-radius:3px;overflow:hidden; }
  .sk-fill { height:100%;background:linear-gradient(90deg,var(--gold),var(--gold2));border-radius:3px;transform-origin:left;animation:fillBar 1.6s cubic-bezier(.22,1,.36,1) both .2s; }
  @keyframes fillBar { from{transform:scaleX(0)} to{transform:scaleX(1)} }
  .exp-cards { display:grid;grid-template-columns:1fr 1fr;gap:1rem; }
  .exp-card { padding:1.2rem;border-radius:12px;background:var(--card);border:1px solid rgba(201,168,76,.14);transition:all .3s;cursor:default;display:flex;flex-direction:column;align-items:center;gap:.6rem;text-align:center; }
  .exp-card:hover { background:rgba(201,168,76,.07);border-color:rgba(201,168,76,.38);transform:translateY(-4px) scale(1.03);box-shadow:0 12px 36px rgba(201,168,76,.12); }
  .exp-card svg { color:var(--gold); }
  .exp-card-name { font-size:.78rem;color:var(--gray);line-height:1.4;letter-spacing:.04em; }

  /* EXPERIENCE */
  #experience { background:var(--navy2); }
  .tl { position:relative;padding-left:3rem; }
  .tl::before { content:'';position:absolute;left:15px;top:8px;bottom:0;width:2px;background:linear-gradient(to bottom,var(--gold),transparent); }
  .tl-item { position:relative;margin-bottom:2.5rem; }
  .tl-dot { position:absolute;left:-3rem;top:4px;width:34px;height:34px;border-radius:50%;background:rgba(201,168,76,.12);border:2px solid var(--gold);display:flex;align-items:center;justify-content:center;color:var(--gold);animation:glowDot 2.5s ease-in-out infinite; }
  @keyframes glowDot { 0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,.4)} 50%{box-shadow:0 0 0 7px rgba(201,168,76,0)} }
  .tl-card { background:var(--card);border:1px solid rgba(201,168,76,.16);border-radius:14px;padding:1.6rem;backdrop-filter:blur(12px);transition:all .35s; }
  .tl-card:hover { border-color:rgba(201,168,76,.4);transform:translateX(6px);box-shadow:0 16px 48px rgba(201,168,76,.1); }
  .tl-company { font-family:'Playfair Display',serif;font-size:1.2rem;color:var(--gold);margin-bottom:.25rem; }
  .tl-role    { font-size:.78rem;color:var(--gray);letter-spacing:.1em;text-transform:uppercase;margin-bottom:.9rem; }
  .tl-missions { list-style:none; }
  .tl-missions li { display:flex;align-items:flex-start;gap:.6rem;font-size:.86rem;color:rgba(244,239,230,.75);margin-bottom:.45rem;line-height:1.5; }
  .tl-missions li svg { flex-shrink:0;margin-top:2px;color:var(--gold); }
  .soon-card { border:1.5px dashed rgba(201,168,76,.25);border-radius:14px;padding:2rem;text-align:center;background:rgba(201,168,76,.03);transition:border-color .3s; }
  .soon-card:hover { border-color:rgba(201,168,76,.5); }
  .soon-icon { width:52px;height:52px;border-radius:12px;background:rgba(201,168,76,.1);display:flex;align-items:center;justify-content:center;color:var(--gold);margin:0 auto .9rem; }

  /* EDUCATION */
  #education { background:var(--navy); }
  .edu-cards { display:flex;flex-direction:column;gap:1.6rem; }
  .edu-card { display:flex;gap:1.6rem;align-items:flex-start;background:var(--card);border:1px solid rgba(201,168,76,.16);border-radius:14px;padding:1.8rem;transition:all .35s; }
  .edu-card:hover { border-color:rgba(201,168,76,.45);transform:translateX(6px);box-shadow:0 12px 40px rgba(201,168,76,.1); }
  .edu-icon { flex-shrink:0;width:52px;height:52px;border-radius:12px;background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.2);display:flex;align-items:center;justify-content:center;color:var(--gold); }
  .edu-degree { font-family:'Playfair Display',serif;font-size:1.05rem;color:var(--white);margin-bottom:.3rem; }
  .edu-school { color:var(--gold);font-size:.83rem;font-weight:500;margin-bottom:.5rem; }
  .edu-badge { display:inline-block;padding:.2rem .7rem;border-radius:100px;font-size:.68rem;letter-spacing:.08em;font-weight:600; }
  .badge-active { background:rgba(201,168,76,.18);color:var(--gold); }
  .badge-done   { background:rgba(122,143,168,.15);color:var(--gray); }

  /* CONTACT */
  #contact { background:var(--navy2); }
  .contact-grid { display:grid;grid-template-columns:1fr 1.3fr;gap:4rem;align-items:start; }
  .ci { display:flex;align-items:center;gap:1rem;margin-bottom:1.4rem; }
  .ci-icon { flex-shrink:0;width:42px;height:42px;border-radius:10px;background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.22);display:flex;align-items:center;justify-content:center;color:var(--gold); }
  .ci-lbl { font-size:.68rem;color:var(--gray);letter-spacing:.1em;text-transform:uppercase; }
  .ci-val { font-size:.86rem;color:var(--white);margin-top:.1rem;word-break:break-all; }
  .socials { display:flex;gap:.8rem;margin-top:1.8rem; }
  .soc-btn { width:40px;height:40px;border-radius:10px;background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.22);display:flex;align-items:center;justify-content:center;color:var(--gold);cursor:pointer;transition:all .3s;text-decoration:none; }
  .soc-btn:hover { background:rgba(201,168,76,.22);transform:translateY(-3px);box-shadow:0 8px 20px rgba(201,168,76,.2); }
  .contact-form { display:flex;flex-direction:column;gap:.9rem; }
  .fi,.ft { width:100%;padding:.8rem 1rem;background:rgba(21,32,53,.6);border:1px solid rgba(201,168,76,.18);border-radius:8px;color:var(--white);font-family:'Jost',sans-serif;font-size:.86rem;transition:border-color .25s,box-shadow .25s;outline:none;resize:none; }
  .fi::placeholder,.ft::placeholder { color:var(--gray); }
  .fi:focus,.ft:focus { border-color:var(--gold);box-shadow:0 0 0 3px rgba(201,168,76,.1); }
  .ft { min-height:120px; }
  .card-h { background:var(--card);border:1px solid rgba(201,168,76,.16);border-radius:14px;padding:1.6rem;backdrop-filter:blur(12px); }
  .sending-overlay { display:flex;align-items:center;justify-content:center;gap:.6rem;color:var(--gold);font-size:.88rem;padding:1rem; }
  .spinner { width:20px;height:20px;border:2px solid rgba(201,168,76,.3);border-top-color:var(--gold);border-radius:50%;animation:spin .7s linear infinite; }
  @keyframes spin { to{transform:rotate(360deg)} }

  /* BUTTONS */
  .btn { display:inline-flex;align-items:center;gap:.55rem;padding:.75rem 1.8rem;border-radius:6px;font-family:'Jost',sans-serif;font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .3s;border:none;font-weight:600; }
  .btn-g { background:var(--gold);color:#0b1622; }
  .btn-g:hover { background:var(--gold2);transform:translateY(-2px);box-shadow:0 8px 28px rgba(201,168,76,.4); }
  .btn-g:disabled { opacity:.6;cursor:not-allowed;transform:none; }
  .btn-o { background:transparent;color:var(--gold);border:1.5px solid var(--gold); }
  .btn-o:hover { background:rgba(201,168,76,.1);transform:translateY(-2px); }

  footer { text-align:center;padding:2rem;position:relative;z-index:2;border-top:1px solid rgba(201,168,76,.1);color:var(--gray);font-size:.78rem;letter-spacing:.08em; }
  footer em { color:var(--gold);font-style:normal; }

  /* RESPONSIVE */
  @media(max-width:900px){
    #hero .section-inner {
      grid-template-columns:1fr;
      grid-template-rows:auto auto;
      gap:2rem;
      padding:5rem 1.5rem 2rem;
    }
    /* Image EN HAUT sur mobile */
    .hero-right { order:-1; height:260px;min-height:unset; }
    .hero-left { order:1; }
    nav { padding:1rem 1.5rem; }
    .nav-ul { display:none; }
    .burger { display:block; }
    .about-grid,.skills-grid,.contact-grid { grid-template-columns:1fr;gap:2rem; }
    .exp-cards { grid-template-columns:1fr 1fr; }
    .section-inner { padding:3.5rem 1.2rem; }
    .tl { padding-left:2.5rem; }
    .tl-dot { left:-2.5rem; }
    .hero-stats { gap:1.5rem; }
    .stat-n { font-size:1.7rem; }
    /* Reduce hero title sizes on mobile */
    .hero-suname { font-size: clamp(5rem,8vw,3.2rem); }
    .hero-name  { font-size: clamp(2.5rem,5vw,1.8rem); }
  }
  @media(max-width:500px){
    .exp-cards { grid-template-columns:1fr; }
    .hero-bio { font-size:.85rem; }
    .btn { padding:.65rem 1.2rem;font-size:.74rem; }
  }
`;

/* =========================================================
   SLIDESHOW COMPONENT
========================================================= */

function HeroSlideshow() {
  return (
    <div className="hero-right rounded-2xl">
      <img
        src="/hero-img.jpg"
        alt="Projet de genie civil et BTP - HEVOU Sewlan Benitez ingenieur Benin"
        loading="eager"
      />
      <div className="hero-img-overlay" />
      <div className="slide-badge">
        <span className="pulse-dot" />
        Futur Ingenieur en Genie Civil
      </div>
    </div>
  );
}

/* =========================================================
   CONTACT FORM — envoie vers votre email via Formspree
   Configurez la variable d'environnement VITE_FORMSPREE_URL
   avec l'URL de votre endpoint Formspree.
========================================================= */
const FORMSPREE_URL = import.meta.env.VITE_FORMSPREE_URL || "";

function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nom requis";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email invalide";
    if (!form.subject.trim()) e.subject = "Sujet requis";
    if (!form.message.trim() || form.message.length < 10) e.message = "Message trop court";
    return e;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    if (!FORMSPREE_URL) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, subject: form.subject, message: form.message }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") return (
    <div className="card-h" style={{ textAlign: "center", padding: "2.5rem" }}>
      <CheckCircle size={48} style={{ color: "var(--gold)", margin: "0 auto 1rem", display: "block" }} />
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", color: "var(--gold)" }}>Message envoye !</div>
      <div style={{ color: "var(--gray)", marginTop: ".5rem", fontSize: ".86rem" }}>Je vous repondrai dans les plus brefs delais.</div>
      <button className="btn btn-o" style={{ marginTop: "1.4rem" }} onClick={() => setStatus("idle")}>Nouveau message</button>
    </div>
  );

  const inp = (name, placeholder, type) => (
    <div>
      <input
        className="fi"
        name={name}
        type={type || "text"}
        placeholder={placeholder}
        value={form[name]}
        onChange={handleChange}
        style={errors[name] ? { borderColor: "#e05555" } : {}}
      />
      {errors[name] && <div style={{ color: "#e07777", fontSize: ".72rem", marginTop: ".3rem" }}>{errors[name]}</div>}
    </div>
  );

  return (
    <div className="card-h">
      <h3 style={{ fontFamily: "'Playfair Display',serif", color: "var(--gold)", marginBottom: "1.2rem" }}>Envoyer un message</h3>
      {status === "error" && (
        <div style={{ background: "rgba(220,80,80,.12)", border: "1px solid rgba(220,80,80,.3)", borderRadius: "8px", padding: ".7rem 1rem", color: "#e07777", fontSize: ".82rem", marginBottom: "1rem" }}>
          {FORMSPREE_URL
            ? "Erreur lors de l'envoi. Verifiez votre connexion ou ecrivez directement a benitezhevou44@gmail.com"
            : "Le formulaire n'est pas encore configuré. Ajoutez VITE_FORMSPREE_URL dans votre environnement pour activer l'envoi."}
        </div>
      )}
      <form className="contact-form" onSubmit={handleSubmit}>
        {inp("name", "Votre nom complet")}
        {inp("email", "Votre adresse email", "email")}
        {inp("subject", "Sujet")}
        <div>
          <textarea
            className="ft"
            name="message"
            placeholder="Votre message..."
            value={form.message}
            onChange={handleChange}
            style={errors.message ? { borderColor: "#e05555" } : {}}
          />
          {errors.message && <div style={{ color: "#e07777", fontSize: ".72rem", marginTop: ".3rem" }}>{errors.message}</div>}
        </div>
        <button className="btn btn-g" type="submit" disabled={status === "sending"}>
          {status === "sending" ? (
            <><div className="spinner" /> Envoi en cours...</>
          ) : (
            <><Send size={15} /> Envoyer le message</>
          )}
        </button>
      </form>
    </div>
  );
}

/* =========================================================
   HERO
========================================================= */
function Hero() {
  return (
    <section id="hero" aria-label="Introduction HEVOU Sewlan Benitez ingenieur genie civil" >
      <div className="section-inner  mt-5">
        <div className="hero-left">
          <div className="hero-badge"><Star size={12} /> Genie Civil - BTP - Benin</div>
          <h1 className="hero-suname">HEVOU</h1>
          <p className="hero-name">Sewlan Benitez</p>
          <p className="hero-sub">Etudiant Ingenieur - Batiments et Travaux Publics - EPAC</p>
          <p className="hero-bio">
            "Passionne par la construction civile et l'environnement, je me specialise
            dans la conception technique et la gestion de projets. Alliant rigueur
            mathematique et solutions innovantes pour batir demain."
          </p>
          <div className="hero-btns">
            <button className="btn btn-g" onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}>
              <Briefcase size={15} /> Mes experiences
            </button>
            <button className="btn btn-o" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              <Mail size={15} /> Me contacter
            </button>
          </div>
          <div className="hero-stats">
            <div><span className="stat-n">2+</span><span className="stat-l">Stages</span></div>
            <div><span className="stat-n">5</span><span className="stat-l">Logiciels</span></div>
            <div><span className="stat-n">3</span><span className="stat-l">Langues</span></div>
            <div><span className="stat-n">Top</span><span className="stat-l">Ambition</span></div>
          </div>
        </div>
        <HeroSlideshow />
      </div>
    </section>
  );
}

/* =========================================================
   ABOUT
========================================================= */
function About() {
  return (
    <section id="about">
      <div className="section-inner">
        <div className="about-grid">
          <div>
            <div className="avatar-wrap">
              <div className="av-deco1" /><div className="av-deco2" />
              <img
                src="/about-img.jpg"
                alt="Projet de genie civil et BTP - HEVOU Sewlan Benitez ingenieur Benin"
                loading="eager"
              />            </div>
          </div>
          <div>
            <div className="s-label"><Users size={13} />A propos</div>
            <h2 className="s-title">HEVOU Sewlan Benitez -- Qui <em>suis-je ?</em></h2>
            <div className="s-line" />
            <div className="about-text">
              <p>Etudiant en Genie Civil a l'Ecole Polytechnique d'Abomey-Calavi (EPAC), option Batiments et Travaux Publics. Futur ingenieur d'etudes passionne par la conception de structures et la gestion de chantiers.</p>
              <p>Dote d'un esprit analytique et d'une capacite d'adaptation sur le terrain, je combine des competences techniques pointues avec un sens du leadership developpe lors de mes stages.</p>
            </div>
            <p style={{ fontSize: ".78rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--gold)", marginTop: "1.8rem", marginBottom: ".7rem" }}>Langues</p>
            <div className="tag-row">
              <span className="tag tg"><Globe size={12} />Francais</span>
              <span className="tag tg"><Globe size={12} />Anglais (B1)</span>
              <span className="tag tb">Fon</span>
            </div>
            <p style={{ fontSize: ".78rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--gold)", marginTop: "1.4rem", marginBottom: ".7rem" }}>Atouts</p>
            <div className="tag-row">
              <span className="tag tb"><Users size={11} />Esprit d'equipe</span>
              <span className="tag tb"><Target size={11} />Precision</span>
              <span className="tag tb"><Zap size={11} />Analyse terrain</span>
              <span className="tag tb"><RefreshCw size={11} />Adaptation</span>
              <span className="tag tb"><Award size={11} />Leadership</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SKILLS
========================================================= */
function Skills() {
  const software = [
    { name: "AutoCAD", pct: 85, desc: "Conception de plans detailles" },
    { name: "Covadis", pct: 75, desc: "Infrastructures routieres" },
    { name: "Robot Structural Analysis", pct: 70, desc: "Calcul de structures" },
    { name: "ArchiCAD", pct: 68, desc: "Conception et rendu 3D" },
    { name: "KoboCollect", pct: 80, desc: "Collecte de donnees terrain" },
  ];
  const expertise = [
    { icon: <BarChart2 size={20} />, name: "Calcul de Structures" },
    { icon: <FileText size={20} />, name: "Plans d'execution" },
    { icon: <Cpu size={20} />, name: "Feuilles Excel GC" },
    { icon: <Briefcase size={20} />, name: "Gestion de projets" },
    { icon: <Database size={20} />, name: "Collecte de donnees" },
    { icon: <Globe size={20} />, name: "Marketing numerique" },
  ];
  return (
    <section id="skills">
      <div className="section-inner">
        <div className="skills-grid">
          <div>
            <div className="s-label"><Cpu size={13} />Logiciels</div>
            <h2 className="s-title">Competences <em>Techniques</em></h2>
            <div className="s-line" />
            {software.map((s, i) => (
              <div className="skill-item" key={s.name}>
                <div className="sk-head"><span className="sk-name">{s.name}</span><span className="sk-pct">{s.pct}%</span></div>
                <div className="sk-sub">{s.desc}</div>
                <div className="sk-bar"><div className="sk-fill" style={{ width: s.pct + "%", animationDelay: (i * .12) + "s" }} /></div>
              </div>
            ))}
          </div>
          <div>
            <div className="s-label"><FolderOpen size={13} />Expertises</div>
            <h2 className="s-title">Domaines <em>d'Expertise</em></h2>
            <div className="s-line" />
            <div className="exp-cards">
              {expertise.map(e => (
                <div className="exp-card" key={e.name}>{e.icon}<div className="exp-card-name">{e.name}</div></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   EXPERIENCE
========================================================= */
function Experience() {
  const items = [
    { company: "CUBE BTP", role: "Stagiaire - Suivi de Chantier", missions: ["Suivi et controle des travaux sur chantier", "Verification de la conformite des ouvrages", "Coordination avec les equipes techniques", "Redaction de rapports d'avancement"] },
    { company: "K2 ARCHITECTES", role: "Stagiaire - Realisation de Plans", missions: ["Realisation et mise en page de plans d'execution", "Conception assistee par ordinateur (CAO)", "Participation aux reunions de conception", "Mise a jour des dossiers techniques"] },
  ];
  return (
    <section id="experience">
      <div className="section-inner">
        <div className="s-label"><Briefcase size={13} />Parcours professionnel</div>
        <h2 className="s-title">Experiences & <em>Projets en Genie Civil</em></h2>
        <div className="s-line" />
        <div className="tl">
          {items.map((item, i) => (
            <div className="tl-item" key={i}>
              <div className="tl-dot"><Briefcase size={15} /></div>
              <div className="tl-card">
                <div className="tl-company">{item.company}</div>
                <div className="tl-role">{item.role}</div>
                <ul className="tl-missions">
                  {item.missions.map(m => <li key={m}><CheckCircle size={13} />{m}</li>)}
                </ul>
              </div>
            </div>
          ))}
          <div className="soon-card">
            <div className="soon-icon"><FolderOpen size={22} /></div>
            <div style={{ fontFamily: "'Playfair Display',serif", color: "var(--gold)", fontSize: "1rem", marginBottom: ".4rem" }}>Projets personnels</div>
            <div style={{ color: "var(--gray)", fontSize: ".82rem" }}>En cours de developpement - a suivre !</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   EDUCATION
========================================================= */
function Education() {
  const edu = [
    { degree: "Licence / Diplome d'Ingenieur en Genie Civil", school: "Ecole Polytechnique d'Abomey-Calavi (EPAC)", status: "En cours", active: true },
    { degree: "Diplome de Technicien (DT) en Genie Civil", school: "Lycee Technique Sino-Beninoise d'Akassato (LT/ASBA)", status: "Obtenu", active: false },
  ];
  return (
    <section id="education">
      <div className="section-inner">
        <div className="s-label"><GraduationCap size={13} />Parcours academique</div>
        <h2 className="s-title">Formation en <em>Genie Civil - EPAC Benin</em></h2>
        <div className="s-line" />
        <div className="edu-cards">
          {edu.map((e, i) => (
            <div className="edu-card" key={i}>
              <div className="edu-icon"><GraduationCap size={24} /></div>
              <div>
                <div className="edu-degree">{e.degree}</div>
                <div className="edu-school">{e.school}</div>
                <span className={"edu-badge " + (e.active ? "badge-active" : "badge-done")}>{e.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT
========================================================= */
function Contact() {
  const infos = [
    { icon: <MapPin size={18} />, label: "Localisation", value: "Abomey-Calavi, Benin" },
    { icon: <Mail size={18} />, label: "Email", value: "benitezhevou44@gmail.com" },
    { icon: <Phone size={18} />, label: "Telephone", value: "+229 01 46 30 00 66" },
    { icon: <Smartphone size={18} />, label: "Mobile", value: "+229 01 68 94 20 54" },
  ];
  return (
    <section id="contact">
      <div className="section-inner">
        <div className="s-label"><Mail size={13} />Restons en contact</div>
        <h2 className="s-title">Contacter <em>HEVOU Sewlan Benitez</em></h2>
        <div className="s-line" />
        <div className="contact-grid">
          <div>
            {infos.map(info => (
              <div className="ci" key={info.label}>
                <div className="ci-icon">{info.icon}</div>
                <div><div className="ci-lbl">{info.label}</div><div className="ci-val">{info.value}</div></div>
              </div>
            ))}
            <div className="socials">
              <a href="https://www.linkedin.com/in/benitez-sewlan-hevou-762017369" target="_blank" rel="noreferrer" className="soc-btn" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="https://www.facebook.com/hevou.benitez" target="_blank" rel="noreferrer" className="soc-btn" aria-label="Facebook"><Facebook size={18} /></a>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   ROOT APP
========================================================= */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cx, setCx] = useState(-100); const [cy, setCy] = useState(-100);
  const [rx, setRx] = useState(-100); const [ry, setRy] = useState(-100);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const h = e => {
      setCx(e.clientX); setCy(e.clientY);
      setTimeout(() => { setRx(e.clientX); setRy(e.clientY); }, 90);
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i, left: (Math.random() * 100) + "%", size: (2 + Math.random() * 3) + "px",
    dur: (9 + Math.random() * 14) + "s", delay: (-Math.random() * 18) + "s",
  }));

  const navLinks = [["about", "A propos"], ["skills", "Competences"], ["experience", "Experiences"], ["education", "Formation"], ["contact", "Contact"]];
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="cur" style={{ left: cx, top: cy }} />
      <div className="cur2" style={{ left: rx, top: ry }} />
      <div className="grid-bg" />
      {particles.map(p => (
        <div key={p.id} className="ptcl" style={{ left: p.left, width: p.size, height: p.size, animationDuration: p.dur, animationDelay: p.delay }} />
      ))}
      <nav>
        <span className="logo" onClick={() => scrollTo("hero")}>HSB.</span>
        <ul className="nav-ul">
          {navLinks.map(([id, lbl]) => (
            <li key={id}><a href="#" onClick={e => { e.preventDefault(); scrollTo(id); }}>{lbl}</a></li>
          ))}
        </ul>
        <button className="burger" onClick={() => setMenuOpen(true)}><Menu size={24} /></button>
      </nav>
      <div className={"mob-menu" + (menuOpen ? " open" : "")}>
        <button className="mob-close" onClick={() => setMenuOpen(false)}><X size={26} /></button>
        {navLinks.map(([id, lbl]) => (
          <a key={id} href="#" onClick={e => { e.preventDefault(); scrollTo(id); }}>{lbl}</a>
        ))}
      </div>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Contact />
      <footer>
        <em>HEVOU Sewlan Benitez</em> -- Ingenieur Genie Civil -- EPAC Abomey-Calavi, Benin
        <br />
        <span style={{ fontSize: ".7rem", opacity: .6 }}>2025 HEVOU Sewlan Benitez. Tous droits reserves.</span>
      </footer>
    </div>
  );
}