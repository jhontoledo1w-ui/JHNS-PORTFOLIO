import { useEffect, useRef, useState } from "react";
import "./App.css";
import jatImg from "./assets/jat.png";

/* ===================== DATA ===================== */
const NAV = [
  ["home", "Home"],
  ["about", "About"],
  ["experience", "Experience"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["contact", "Contact"],
];

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" className="mx-auto h-[1em] w-[1em]" fill="#06b6d4" aria-hidden="true">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
  </svg>
);

const SKILLS = [
  { name: "HTML5", icon: "fab fa-html5", color: "#e34f26", level: 95 },
  { name: "CSS3", icon: "fab fa-css3-alt", color: "#1572b6", level: 90 },
  { name: "JavaScript", icon: "fab fa-js", color: "#f7df1e", level: 85 },
  { name: "Tailwind CSS", custom: <TailwindIcon />, level: 88 },
  { name: "React JS", icon: "fab fa-react", color: "#61dafb", level: 75 },
  { name: "Node.js", icon: "fab fa-node-js", color: "#339933", level: 75 },
  { name: "PostgreSQL", icon: "fas fa-database", color: "#336791", level: 70 },
  { name: "MySQL", icon: "fas fa-server", color: "#4479a1", level: 72 },
  { name: "Git", icon: "fab fa-git-alt", color: "#f05032", level: 80 },
  { name: "Java", icon: "fab fa-java", color: "#007396", level: 70 },
  { name: "Python", icon: "fab fa-python", color: "#3776ab", level: 65 },
];

const EDUCATION = [
  { title: "Elementary", text: "Atty. Blas and Maria Gerona Memorial Elementary School" },
  { title: "High School", text: "Nalundan National High School" },
  { title: "College (Current)", text: "PHINMA University of Iloilo", course: "BS Information Technology", active: true },
];

const PROJECTS = [
  {
    title: "E Resume",
    icon: "fas fa-file-lines",
    bg: "bg-brand",
    text: "A web-based e-resume that showcases my profile, skills, and experience in one place.",
    tags: ["Full Stack", "Web App"],
    link: "https://e-resume-production-3126.up.railway.app",
  },
];

const LINKS = {
  facebook: "https://www.facebook.com/share/18ZJJ16zFb",
  instagram: "https://www.instagram.com/jhn_tech?stkn=MWIzZDZidDI1YzNnaw==",
  github: "https://github.com/jhontoledo1w-ui",
  email: "jhontoledo1w@gmail.com",
};

const ROLES = ["Full Stack Web Developer", "React Developer", "Node.js Developer", "Freelance Developer"];

/* Sparkle directions for the theme toggle burst */
const SPARKS = Array.from({ length: 10 }, (_, i) => {
  const ang = (i / 10) * Math.PI * 2;
  const d = 46 + (i % 3) * 12;
  return { tx: `${Math.cos(ang) * d}px`, ty: `${Math.sin(ang) * d}px` };
});

/* ===================== SMALL COMPONENTS ===================== */
const sectionCls =
  "min-h-screen px-[10%] py-[100px] transition-all duration-500 max-md:min-h-0 max-md:px-[5%] max-md:py-20 min-[1400px]:px-[15%]";

function Title({ first, last, sub }) {
  return (
    <>
      <h2 className="mb-[15px] text-center text-[42px] font-bold max-md:text-[32px] max-[480px]:text-[28px]">
        {first} <span className="text-gradient">{last}</span>
      </h2>
      {sub && <p className="mb-[50px] text-center text-base opacity-70">{sub}</p>}
    </>
  );
}

function Logo({ className = "", onClick }) {
  return (
    <div className={className} onClick={onClick}>
      <span className="logo-letter">J</span>
      <span className="logo-letter">A</span>
      <span className="logo-letter">T</span>
    </div>
  );
}

const cardBase =
  "contact-card group relative block cursor-pointer overflow-hidden rounded-[20px] border border-line bg-card px-[30px] py-10 text-center transition-all duration-500 hover:-translate-y-2.5 hover:border-accent hover:shadow-[0_20px_40px_rgba(0,123,255,0.2)] max-[480px]:px-5 max-[480px]:py-[30px]";
const iconBase =
  "relative z-[1] mx-auto mb-5 flex h-[70px] w-[70px] items-center justify-center rounded-full text-[28px] text-white transition-transform duration-300 group-hover:rotate-[10deg] group-hover:scale-110";
const indicatorBase =
  "relative z-[1] inline-flex items-center gap-2 rounded-[20px] bg-navbtn px-4 py-2 text-xs font-medium transition-all duration-300 group-hover:bg-accent group-hover:text-white";

function LinkCard({ href, iconClass, iconBg, title, text }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cardBase}>
      <div className={`${iconBase} ${iconBg}`}>
        <i className={iconClass}></i>
      </div>
      <h4 className="relative z-[1] mb-2 text-xl font-bold">{title}</h4>
      <p className="relative z-[1] mb-[15px] text-sm opacity-70">{text}</p>
      <div className={indicatorBase}>
        <i className="fas fa-arrow-up-right-from-square"></i>
        <span>Visit Profile</span>
      </div>
    </a>
  );
}

/* Particle network background that reacts to the cursor */
function Particles({ dark }) {
  const ref = useRef(null);
  const darkRef = useRef(dark);

  useEffect(() => {
    darkRef.current = dark;
  }, [dark]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    const LINK = 120;
    let w = 0;
    let h = 0;
    let parts = [];
    let mix = darkRef.current ? 1 : 0; // 0 = light (orange), 1 = dark (blue)
    let raf;

    const init = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 16000));
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // smoothly fade between orange (light) and blue (dark)
      mix += ((darkRef.current ? 1 : 0) - mix) * 0.06;
      const lerp = (a, b) => Math.round(a + (b - a) * mix);
      const rgb = `${lerp(243, 0)},${lerp(156, 150)},${lerp(18, 255)}`;
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const md = Math.hypot(mdx, mdy);
        if (md < 130 && md > 0) {
          p.x += (mdx / md) * 1.1;
          p.y += (mdy / md) * 1.1;
          ctx.strokeStyle = `rgba(${rgb},${(1 - md / 130) * 0.5})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        ctx.fillStyle = `rgba(${rgb},0.6)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < parts.length; j++) {
          const q = parts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${rgb},${(1 - d / LINK) * 0.3})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    init();
    draw();
    window.addEventListener("resize", init);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}

/* Loading screen */
function Loader({ progress, exiting }) {
  return (
    <div className={`loader fixed inset-0 z-[2000] flex items-center justify-center bg-[#001220] ${exiting ? "exit" : ""}`}>
      <div className="loader-glow"></div>
      <div className="loader-content relative flex flex-col items-center">
        <div className="loader-wrap">
          <div className="loader-ring loader-ring-1"></div>
          <div className="loader-ring loader-ring-2"></div>
          <div className="loader-ring loader-ring-pulse"></div>
          <div className="loader-orbit"></div>
          <div className="flex gap-0.5 text-5xl font-extrabold tracking-[2px]">
            <span className="logo-letter">J</span>
            <span className="logo-letter">A</span>
            <span className="logo-letter">T</span>
          </div>
        </div>
        <div className="mt-14 w-[240px]">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="loader-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="mt-3 flex justify-between text-xs font-medium tracking-wide text-white/60">
            <span>Loading portfolio...</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Dark mode entrance effects (same as original script.js) */
function applyDarkModeEntranceEffects() {
  document.querySelectorAll("section").forEach((section) => {
    section.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    section.style.boxShadow = "inset 0 0 100px rgba(0, 123, 255, 0.05)";
    setTimeout(() => {
      section.style.boxShadow = "none";
    }, 800);
  });
  document.querySelectorAll(".skill-card").forEach((card, index) => {
    card.style.transform = "scale(0.95)";
    card.style.opacity = "0.7";
    setTimeout(() => {
      card.style.transform = "scale(1)";
      card.style.opacity = "1";
    }, index * 50);
  });
  document.querySelectorAll(".project-card").forEach((card, index) => {
    card.style.transform = "translateY(10px)";
    setTimeout(() => {
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
}

/* ===================== APP ===================== */
export default function App() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [typed, setTyped] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [scrolled, setScrolled] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [barsOn, setBarsOn] = useState(true);
  const [copied, setCopied] = useState(false);
  const skillsGridRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fx, setFx] = useState(null);
  const spotRef = useRef(null);
  const techRef = useRef(null);
  const photoRef = useRef(null);

  /* Loading screen: counts to 100, waits for the page to finish loading, then wipes away */
  useEffect(() => {
    const start = performance.now();
    const duration = 2400;
    let raf;
    let timer;
    const finish = () => {
      setExiting(true);
      timer = setTimeout(() => setLoading(false), 1000);
    };
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(step);
      else if (document.readyState === "complete") finish();
      else window.addEventListener("load", finish, { once: true });
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("load", finish);
    };
  }, []);

  /* Dark mode (saved in localStorage) */
  useEffect(() => {
    document.body.classList.toggle("dark-mode", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }, [dark]);

  /* Cursor spotlight (dark mode only) */
  useEffect(() => {
    if (!dark) return;
    const move = (e) => {
      const el = spotRef.current;
      if (!el) return;
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [dark]);

  /* Effects on the profile photo when the theme changes */
  const playPhotoFx = (goingDark) => {
    const photo = photoRef.current;
    if (photo && photo.animate) {
      const glow = goingDark ? "0,212,255" : "255,183,3";
      photo.animate([{ boxShadow: `0 0 80px 14px rgba(${glow},0.85)`, offset: 0.5 }], { duration: 900 });
    }
    if (techRef.current) {
      techRef.current.querySelectorAll(".ring-outer, .ring-inner").forEach((r) => {
        if (r.animate) r.animate([{ rotate: "0deg" }, { rotate: "360deg" }], { duration: 900, easing: "ease-out" });
      });
    }
  };

  const toggleTheme = () => {
    const goingDark = !dark;
    setDark(goingDark);
    setFx({ n: Date.now(), dark: goingDark });
    playPhotoFx(goingDark);
    if (goingDark) applyDarkModeEntranceEffects();
    setPressed(true);
    setTimeout(() => setPressed(false), 200);
  };

  /* Typing effect: types the name once (120ms per letter) */
  useEffect(() => {
    if (loading) return;
    let i = 0;
    let t;
    const full = "Jhon Albert Toledo";
    const type = () => {
      if (i < full.length) {
        i++;
        setTyped(full.slice(0, i));
        t = setTimeout(type, 120);
      }
    };
    t = setTimeout(type, 0);
    return () => clearTimeout(t);
  }, [loading]);

  /* Role cycling: starts after the name has finished typing */
  useEffect(() => {
    if (loading) return;
    let idx = 0;
    let i = ROLES[0].length;
    let deleting = true;
    let t;
    const tick = () => {
      const full = ROLES[idx];
      if (!deleting) {
        if (i < full.length) {
          i++;
          setRole(full.slice(0, i));
          t = setTimeout(tick, 70);
        } else {
          deleting = true;
          t = setTimeout(tick, 1800);
        }
      } else if (i > 0) {
        i--;
        setRole(full.slice(0, i));
        t = setTimeout(tick, 35);
      } else {
        deleting = false;
        idx = (idx + 1) % ROLES.length;
        t = setTimeout(tick, 300);
      }
    };
    t = setTimeout(tick, 3200);
    return () => clearTimeout(t);
  }, [loading]);

  /* Active nav link + navbar background on scroll */
  useEffect(() => {
    const onScroll = () => {
      let current = "";
      document.querySelectorAll("section").forEach((sec) => {
        if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
      });
      setActive(current);
      setScrolled(window.scrollY > 50);
    };
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* Close mobile menu on desktop resize */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Prevent body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen || loading ? "hidden" : "";
  }, [menuOpen, loading]);

  /* Skill bars re-animate when the grid is visible */
  useEffect(() => {
    const el = skillsGridRef.current;
    if (!el) return;
    let t;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBarsOn(false);
          clearTimeout(t);
          t = setTimeout(() => setBarsOn(true), 200);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearTimeout(t);
    };
  }, []);

  /* Scroll reveal for cards and timeline items */
  useEffect(() => {
    const els = document.querySelectorAll(".skill-card, .project-card, .contact-card, .timeline-item");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.6s ease";
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* 3D tilt on cards (mouse only) */
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const cards = document.querySelectorAll(".skill-card, .project-card, .contact-card");
    const bound = [];
    cards.forEach((card) => {
      const move = (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.transition = "transform 0.12s ease-out, opacity 0.6s ease, box-shadow 0.5s ease, border-color 0.5s ease";
        card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 14}deg) rotateY(${(x - 0.5) * 14}deg) translateY(0)`;
        card.style.setProperty("--gx", `${x * 100}%`);
        card.style.setProperty("--gy", `${y * 100}%`);
      };
      const leave = () => {
        card.style.transition = "all 0.6s ease";
        card.style.transform = "translateY(0)";
      };
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      bound.push([card, move, leave]);
    });
    return () =>
      bound.forEach(([c, m, l]) => {
        c.removeEventListener("mousemove", m);
        c.removeEventListener("mouseleave", l);
      });
  }, []);

  /* Smooth scroll (mobile waits 300ms for the menu to close) */
  const goTo = (e, id, mobile = false) => {
    e.preventDefault();
    const el = document.querySelector(`#${id}`);
    const scroll = () => el && el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (mobile) {
      setMenuOpen(false);
      setTimeout(scroll, 300);
    } else {
      scroll();
    }
  };

  /* Copy email (with fallback for non-secure contexts) */
  const showCopied = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const fallbackCopy = (text) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand("copy");
      showCopied();
    } catch (err) {
      console.error("Copy failed:", err);
    }
    document.body.removeChild(ta);
  };
  const copyEmail = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(LINKS.email).then(showCopied).catch(() => fallbackCopy(LINKS.email));
    } else {
      fallbackCopy(LINKS.email);
    }
  };

  return (
    <>
      {loading && <Loader progress={progress} exiting={exiting} />}
      <div ref={spotRef} className={`spotlight ${dark ? "on" : ""}`}></div>
      <Particles dark={dark} />

      {/* NAVBAR */}
      <header className={`fixed top-0 z-[1000] flex w-full items-center justify-between px-[10%] py-5 backdrop-blur-[15px] transition-all duration-[600ms] max-md:px-[5%] max-md:py-[15px] min-[1400px]:px-[15%] ${
        scrolled
          ? "bg-white/95 shadow-[0_5px_20px_rgba(0,0,0,0.1)] dark:bg-[rgba(0,18,32,0.95)] dark:shadow-[0_5px_20px_rgba(0,0,0,0.3)]"
          : "bg-white/10 dark:bg-[rgba(0,18,32,0.5)]"
      }`}>
        {/* Logo - moved a bit to the left */}
        <Logo
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="logo relative flex cursor-pointer gap-0.5 text-[28px] font-extrabold tracking-[1px] md:-translate-x-6 max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2 max-[480px]:text-2xl"
        />

        <nav className="hidden gap-[15px] md:flex">
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => goTo(e, id)}
              className={`nav-btn rounded-full bg-navbtn px-5 py-2.5 text-sm font-medium text-main transition-all duration-500 dark:text-white ${
                active === id ? "active" : ""
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          className={`mobile-menu-btn relative z-[1001] -order-1 mr-auto flex h-6 w-[30px] cursor-pointer flex-col justify-around border-0 bg-transparent p-0 md:hidden ${
            menuOpen ? "active" : ""
          }`}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Dark mode button - moved a bit to the right */}
        <div className="relative ml-2.5 md:ml-0 md:translate-x-6">
        <div
          role="button"
          aria-label="Toggle dark mode"
          onClick={toggleTheme}
          style={pressed ? { transform: "scale(0.9)" } : undefined}
          className="theme-toggle relative ml-2.5 flex h-[50px] w-[50px] cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-accent bg-navbtn transition-all duration-500"
        >
          <i className="fas fa-sun sun-icon"></i>
          <i className="fas fa-moon moon-icon"></i>
        </div>
        {fx && (
          <span key={fx.n} className={`theme-burst ${fx.dark ? "to-dark" : "to-light"}`}>
            <span className="burst-ring"></span>
            <span className="burst-ring r2"></span>
            {SPARKS.map((sp, i) => (
              <span key={i} className="burst-dot" style={{ "--tx": sp.tx, "--ty": sp.ty }}></span>
            ))}
          </span>
        )}
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`mobile-backdrop fixed inset-0 z-[998] bg-black/50 backdrop-blur-[2px] md:hidden ${
          menuOpen ? "active" : ""
        }`}
      ></div>
      <aside
        className={`mobile-drawer fixed top-0 left-0 z-[999] h-full w-[75%] max-w-[300px] bg-app-bg shadow-[5px_0_30px_rgba(0,0,0,0.25)] md:hidden ${
          menuOpen ? "active" : ""
        }`}
      >
        <nav className="flex flex-col gap-3 px-5 pt-[100px]">
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => goTo(e, id, true)}
              className={`mobile-nav-btn rounded-full bg-navbtn px-6 py-3 text-lg font-semibold text-main transition-all duration-300 dark:text-white ${
                active === id ? "active" : ""
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>

      {/* HOME */}
      <section
        id="home"
        className="flex min-h-screen items-center justify-between gap-[60px] px-[10%] py-[100px] max-lg:gap-10 max-lg:px-[8%] max-md:flex-col-reverse max-md:gap-10 max-md:px-[5%] max-md:pt-[120px] max-md:pb-[60px] max-md:text-center min-[1400px]:px-[15%]"
      >
        <div className="hero-fade flex-[1.2]">
          <h1 className="text-[32px] font-bold">
            Hi, I'm <br />
            <span className="text-gradient text-[clamp(40px,6vw,65px)] font-extrabold">{typed}</span>
            <span className="cursor text-[clamp(40px,6vw,65px)] text-accent">|</span>
          </h1>
          <h3 className="my-2.5 min-h-9 text-2xl font-bold opacity-90 max-[480px]:text-xl">
            {role}
            <span className="cursor ml-0.5 text-accent">|</span>
          </h3>
          <p className="mb-[30px] max-w-[550px] text-base leading-relaxed opacity-70 max-md:mx-auto max-[480px]:text-sm">
            Building scalable end-to-end web applications, from sleek, responsive interfaces to reliable APIs and databases.
            Passionate about turning ideas into fast, secure, and modern full stack solutions.
          </p>
          <div className="flex flex-wrap gap-5 max-md:mx-auto max-md:w-full max-md:max-w-[280px] max-md:flex-col">
            <a
              href="#projects"
              className="btn-outline inline-flex items-center gap-2.5 rounded-full px-10 py-4 text-[15px] font-semibold transition-all duration-500 max-md:w-full max-md:justify-center max-[480px]:px-[30px] max-[480px]:py-3.5 max-[480px]:text-sm"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="btn-outline inline-flex items-center gap-2.5 rounded-full px-10 py-4 text-[15px] font-semibold transition-all duration-500 max-md:w-full max-md:justify-center max-[480px]:px-[30px] max-[480px]:py-3.5 max-[480px]:text-sm"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="flex flex-1 justify-end max-md:justify-center">
          <div ref={techRef} className="relative flex h-[380px] w-[380px] items-center justify-center max-lg:h-80 max-lg:w-80 max-md:h-[280px] max-md:w-[280px] max-[480px]:h-60 max-[480px]:w-60 min-[1400px]:h-[420px] min-[1400px]:w-[420px]">
            <div className="tech-ring ring-outer"></div>
            <div className="tech-ring ring-inner"></div>
            <div className="tech-ring ring-pulse"></div>
            {fx && (
              <>
                <div key={`w1-${fx.n}`} className={`photo-wave ${fx.dark ? "to-dark" : "to-light"}`}></div>
                <div key={`w2-${fx.n}`} className={`photo-wave w2 ${fx.dark ? "to-dark" : "to-light"}`}></div>
              </>
            )}
            <div
              ref={photoRef}
              className="relative z-10 h-[85%] w-[85%] overflow-hidden rounded-full border-[5px] border-app-bg shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-shadow duration-700 dark:shadow-[0_0_40px_rgba(0,123,255,0.45)]"
            >
              <img
                src={jatImg}
                alt="Jhon Albert Toledo"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className={`${sectionCls} bg-card`}>
        <div className="mx-auto max-w-[1200px]">
          <Title first="About" last="Me" />
          <div className="grid grid-cols-2 items-start gap-[60px] max-lg:gap-10 max-md:grid-cols-1">
            <div>
              <h3 className="mb-[15px] text-[28px] font-bold">
                I'm <span className="text-gradient">Jhon Albert U. Toledo</span>
              </h3>
              <p className="mb-2.5 text-lg opacity-80">
                <i className="fas fa-birthday-cake mr-2.5 text-accent"></i> 20 years old
              </p>
              <p className="mb-2.5 text-lg opacity-80">
                <i className="fas fa-calendar-days mr-2.5 text-accent"></i> Date of Birth: May 12, 2006
              </p>
              <p className="mb-5 text-lg opacity-80">
                <i className="fas fa-location-dot mr-2.5 text-accent"></i> From: Brgy. Cabubugan, Guimbal, Iloilo, Philippines
              </p>
              <p className="mb-5 leading-[1.8] opacity-80">
                I'm a passionate <strong>Bachelor of Science in Information Technology</strong> student with a strong
                focus on frontend development and modern web technologies. I love creating beautiful, functional
                websites that provide great user experiences.
              </p>
              <p className="mb-5 leading-[1.8] opacity-80">
                Throughout my academic journey, I've developed various websites and applications, constantly learning
                and improving my skills. My goal is to become a professional web developer and contribute to
                innovative digital solutions.
              </p>
            </div>

            <div>
              <h3 className="mb-[30px] flex items-center gap-2.5 text-2xl font-bold">
                <i className="fas fa-graduation-cap text-accent"></i> Education
              </h3>
              <div className="timeline relative pl-[30px]">
                {EDUCATION.map((e) => (
                  <div key={e.title} className="timeline-item relative mb-[30px]">
                    <div
                      className={`timeline-dot absolute top-[5px] -left-[34px] h-2.5 w-2.5 rounded-full bg-accent ${
                        e.active ? "active" : "opacity-50"
                      }`}
                    ></div>
                    <h4 className="mb-[5px] text-lg font-bold">{e.title}</h4>
                    <p className="text-sm opacity-70">{e.text}</p>
                    {e.course && (
                      <span className="bg-brand mt-2 inline-block rounded-[20px] px-[15px] py-[5px] text-xs font-semibold text-white">
                        {e.course}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className={sectionCls}>
        <div className="mx-auto max-w-[1200px]">
          <Title first="My" last="Experience" sub="Where I've been working" />
          <div className="timeline relative mx-auto max-w-[700px] pl-[30px]">
            <div className="timeline-item relative mb-[30px]">
              <div className="timeline-dot active absolute top-[5px] -left-[34px] h-2.5 w-2.5 rounded-full bg-accent"></div>
              <div className="rounded-[20px] border border-line bg-card p-[25px] transition-all duration-500 hover:-translate-y-2.5 hover:border-accent hover:shadow-[0_20px_40px_rgba(0,123,255,0.2)]">
                <h4 className="mb-[5px] text-xl font-bold">Freelance Full Stack Developer</h4>
                <span className="bg-brand mb-3 inline-block rounded-[20px] px-[15px] py-[5px] text-xs font-semibold text-white">
                  2024 - 2026
                </span>
                <p className="text-sm leading-relaxed opacity-70">
                  Designing, building, and deploying full stack web applications for clients, covering responsive
                  front ends, backend APIs, and database design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className={`${sectionCls} bg-card`}>
        <div className="mx-auto max-w-[1200px]">
          <Title first="My" last="Skills" sub="Technologies I work with" />
          <div ref={skillsGridRef} className="skills-grid grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[30px] max-md:grid-cols-1">
            {SKILLS.map((s) => (
              <div
                key={s.name}
                className="skill-card group relative overflow-hidden rounded-[20px] border border-line bg-app-bg p-[30px] text-center transition-all duration-500 hover:-translate-y-2.5 hover:scale-[1.02] hover:border-accent hover:shadow-[0_20px_40px_rgba(0,123,255,0.2)] max-[480px]:p-5"
              >
                <div
                  className="mb-[15px] text-[50px] transition-transform duration-300 group-hover:scale-[1.2] group-hover:rotate-[5deg] max-[480px]:text-[40px]"
                  style={{ color: s.color }}
                >
                  {s.custom ? s.custom : <i className={s.icon}></i>}
                </div>
                <h4 className="mb-[15px] text-lg font-bold">{s.name}</h4>
                <div className="relative h-2 overflow-hidden rounded-[10px] bg-[rgba(0,123,255,0.1)]">
                  <div
                    className="skill-progress bg-brand h-full overflow-hidden rounded-[10px]"
                    style={{ width: `${barsOn ? s.level : 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className={sectionCls}>
        <div className="mx-auto max-w-[1200px]">
          <Title first="My" last="Projects" sub="Some of my recent work" />
          <div className="mx-auto grid max-w-[420px] grid-cols-1 gap-10">
            {PROJECTS.map((p) => (
              <div
                key={p.title}
                className="project-card relative overflow-hidden rounded-[20px] border border-line bg-app-bg transition-all duration-500 hover:-translate-y-[15px] hover:scale-[1.02] hover:shadow-[0_25px_50px_rgba(0,123,255,0.2)]"
              >
                <div
                  className={`project-image relative flex h-[200px] items-center justify-center overflow-hidden text-[60px] text-white max-[480px]:h-40 max-[480px]:text-[50px] ${p.bg}`}
                >
                  <i className={p.icon}></i>
                </div>
                <div className="p-[25px]">
                  <h3 className="mb-2.5 text-xl font-bold">{p.title}</h3>
                  <p className="mb-[15px] text-sm leading-relaxed opacity-70">{p.text}</p>
                  <div className="mb-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-[15px] border border-line bg-card px-3 py-[5px] text-xs font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-2 font-semibold text-accent transition-all duration-300 hover:gap-[15px] hover:text-[#00d4ff]"
                  >
                    View Project{" "}
                    <i className="fas fa-arrow-right transition-transform duration-300 group-hover/link:translate-x-[5px]"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={`${sectionCls} bg-card`}>
        <div className="mx-auto max-w-[1200px]">
          <Title first="My" last="Contact" sub="Let's work together" />
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
            <LinkCard
              href={LINKS.facebook}
              iconClass="fab fa-facebook-f"
              iconBg="bg-[#1877f2]"
              title="Facebook"
              text="Jhon Toledo"
            />
            <LinkCard
              href={LINKS.instagram}
              iconClass="fab fa-instagram"
              iconBg="bg-[linear-gradient(45deg,#f09433,#dc2743,#bc1888)]"
              title="Instagram"
              text="@jhn_tech"
            />

            <div className={`${cardBase} !cursor-default`}>
              <div className={`${iconBase} bg-[#ea4335]`}>
                <i className="fas fa-envelope"></i>
              </div>
              <h4 className="relative z-[1] mb-2 text-xl font-bold">Email</h4>
              <p className="relative z-[1] mb-[15px] text-sm break-all opacity-70">{LINKS.email}</p>
              <div className={`${indicatorBase} cursor-pointer`} onClick={copyEmail}>
                <i className="fas fa-copy"></i>
                <span>Copy</span>
              </div>
              <div
                className={`tooltip absolute top-1/2 left-1/2 z-10 rounded-[10px] bg-accent px-5 py-2.5 font-semibold text-white ${
                  copied ? "show" : ""
                }`}
              >
                Copied!
              </div>
            </div>

            <LinkCard
              href={LINKS.github}
              iconClass="fab fa-github"
              iconBg="bg-[#333]"
              title="GitHub"
              text="View my code"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-main px-[10%] py-10 text-center text-white transition-all duration-500 dark:bg-black">
        <div className="mx-auto max-w-[800px]">
          <Logo className="mb-[15px] flex justify-center gap-0.5 text-[32px] font-extrabold" />
          <p className="mb-5 text-sm opacity-70">© 2026 Jhon Albert Toledo. All rights reserved.</p>
          <div className="flex justify-center gap-5">
            {[
              [LINKS.facebook, "fab fa-facebook"],
              [LINKS.instagram, "fab fa-instagram"],
              [LINKS.github, "fab fa-github"],
              [`mailto:${LINKS.email}`, "fas fa-envelope"],
            ].map(([href, icon]) => (
              <a
                key={icon}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white/10 text-lg text-white transition-all duration-300 hover:-translate-y-[5px] hover:scale-110 hover:bg-accent"
              >
                <i className={icon}></i>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}