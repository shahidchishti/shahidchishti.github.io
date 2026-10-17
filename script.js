// Games list - add, remove or edit entries here.
// platform: "android" or "ios". url: store link, or "" if not available.
// icon / shot: files in the images folder, or "" to show a coloured placeholder.
const projects = [
  { name: "Truck Game USA: Truck Driving", platform: "android", url: "https://play.google.com/store/apps/details?id=com.ds.turckgameusa", icon: "truck-icon.png", shot: "truck-shot.png" },
  { name: "Real Tractor Farming Games", platform: "android", url: "https://play.google.com/store/apps/details?id=com.vg.chained.prado.jeep.drive", icon: "tractor-icon.jpg", shot: "tractor-shot.jpg" },
  { name: "Real US Bus Driving: Bus Game", platform: "android", url: "https://play.google.com/store/apps/details?id=com.ds.real.us.bus.driving.bus.game", icon: "bus-icon.png", shot: "bus-shot.png" },
  { name: "Police Games: Cop Car Chase 3D", platform: "android", url: "https://play.google.com/store/apps/details?id=com.ssi.police.chase.simulator", icon: "police-icon.png", shot: "police-shot.png" },
  { name: "Real Jeep Driving Simulator", platform: "android", url: "https://play.google.com/store/apps/details?id=com.ds.real.jeep.driving.simulator.game", icon: "jeep-icon.png", shot: "jeep-shot.png" },
  { name: "Bear Flip: Forest Quest", platform: "ios", url: "https://apps.apple.com/us/app/bear-flip-forest-quest/id6761103068", icon: "bearflip-icon.jpg", shot: "bearflip-shot.jpg" },
  { name: "Urban Life Simulator RP", platform: "ios", url: "https://apps.apple.com/us/app/urban-life-simulator-rp/id6754168166", icon: "urban-icon.jpg", shot: "urban-shot.jpg" },
  { name: "I Am Naughty Taxi Driver", platform: "ios", url: "https://apps.apple.com/us/app/i-am-naughty-taxi-driver/id6757224631", icon: "taxi-icon.jpg", shot: "taxi-shot.jpg" },
  { name: "Crazy Prank Tricky Brain", platform: "ios", url: "https://apps.apple.com/us/app/crazy-prank-tricky-brain/id6807742436", icon: "prank-icon.jpg", shot: "prank-shot.jpg" },
  { name: "Dino Family Adventure Game", platform: "ios", url: "https://apps.apple.com/us/app/dino-family-adventure-game/id6740526672", icon: "dino-icon.jpg", shot: "dino-shot.jpg" },
  { name: "Supercar Obby: Race Challenge", platform: "android", url: "", icon: "obby-icon.svg", shot: "obby-shot.svg" },
  { name: "Super Bear Adventure", platform: "android", url: "", icon: "bear-icon.svg", shot: "bear-shot.svg" },
  { name: "Car School Driving", platform: "android", url: "", icon: "carschool-icon.svg", shot: "carschool-shot.svg" },
  { name: "Scary Burger", platform: "ios", url: "", icon: "burger-icon.svg", shot: "burger-shot.svg" },
  { name: "Crazy Shawarma", platform: "ios", url: "", icon: "shawarma-icon.svg", shot: "shawarma-shot.svg" },
];

const palette = [
  ["#06b6d4", "#3b82f6"], ["#8b5cf6", "#ec4899"], ["#f59e0b", "#ef4444"],
  ["#10b981", "#06b6d4"], ["#6366f1", "#a855f7"], ["#f43f5e", "#f97316"],
];

function initials(name) {
  return name.replace(/[^a-zA-Z ]/g, "").split(" ").filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("");
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = projects.map((p, i) => {
    const [c1, c2] = palette[i % palette.length];
    const label = p.platform === "ios" ? "iOS" : "Android";
    const store = p.platform === "ios" ? "App Store" : "Google Play";
    const link = p.url
      ? `<a class="project-link" href="${p.url}" target="_blank" rel="noopener">View on ${store} →</a>`
      : "";
    const banner = p.shot
      ? `<img src="images/${p.shot}" alt="${p.name} screenshot" loading="lazy">`
      : `<span class="banner-initials">${initials(p.name)}</span>`;
    const icon = p.icon
      ? `<img class="project-icon" src="images/${p.icon}" alt="${p.name} icon" loading="lazy">`
      : `<div class="project-icon" style="background: linear-gradient(135deg, ${c1}, ${c2})">${initials(p.name)}</div>`;
    return `
      <article class="project-card reveal" data-platform="${p.platform}">
        <div class="project-banner" style="background: linear-gradient(135deg, ${c1}55, ${c2}55)">${banner}</div>
        <div class="project-body">
          ${icon}
          <h3>${p.name}</h3>
          <span class="badge ${p.platform}">${label}</span>
          ${link}
        </div>
      </article>`;
  }).join("");
}

function initFilters() {
  const buttons = document.querySelectorAll(".filter");
  buttons.forEach(btn => btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    let shown = 0;
    document.querySelectorAll(".project-card").forEach(card => {
      const hide = f !== "all" && card.dataset.platform !== f;
      card.classList.toggle("hidden", hide);
      card.classList.remove("pop");
      if (!hide) {
        card.style.setProperty("--stagger", `${(shown++ % 9) * 0.05}s`);
        void card.offsetWidth; // restart the animation
        card.classList.add("pop");
      }
    });
  }));
}

function initNav() {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const setOpen = open => {
    links.classList.toggle("open", open);
    nav.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open);
  };
  toggle.addEventListener("click", () => setOpen(!links.classList.contains("open")));
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setOpen(false)));
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function initReveal() {
  // Stagger siblings inside grids so cards cascade in one after another.
  document.querySelectorAll(".skills-grid, .projects-grid, .contact-grid, .timeline").forEach(group => {
    [...group.children].forEach((el, i) => el.style.setProperty("--stagger", `${(i % 6) * 0.08}s`));
  });
  document.querySelectorAll(".chips").forEach(list => {
    [...list.children].forEach((li, i) => li.style.setProperty("--i", i));
  });

  const items = document.querySelectorAll(".reveal, .section-title");
  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => observer.observe(el));
}

function initPreloader(onDone) {
  const loader = document.querySelector(".preloader");
  const bar = loader.querySelector(".preloader-bar span");
  const pct = loader.querySelector(".preloader-pct");
  const finish = () => {
    loader.classList.add("done");
    document.body.classList.add("loaded");
    onDone();
  };
  if (reduceMotion) { finish(); return; }

  const duration = 1100;
  const start = performance.now();
  (function step(now) {
    const p = Math.max(0, Math.min((now - start) / duration, 1));
    const eased = 1 - Math.pow(1 - p, 3);
    bar.style.width = `${eased * 100}%`;
    pct.textContent = Math.round(eased * 100);
    if (p < 1) requestAnimationFrame(step);
    else setTimeout(finish, 150);
  })(start);
}

function initCounters() {
  document.querySelectorAll("[data-count]").forEach((el, i) => {
    const target = +el.dataset.count;
    const duration = 1400;
    setTimeout(() => {
      const start = performance.now();
      (function step(now) {
        const p = Math.max(0, Math.min((now - start) / duration, 1));
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      })(start);
    }, 700 + i * 150);
  });
}

function initParticles() {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  const colors = ["#22d3ee", "#818cf8", "#a855f7"];
  const mouse = { x: -9999, y: -9999 };
  let w, h, dots;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(Math.floor((w * h) / 16000), 90);
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 0.8,
      c: colors[Math.floor(Math.random() * colors.length)],
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const d of dots) {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > w) d.vx *= -1;
      if (d.y < 0 || d.y > h) d.vy *= -1;

      // Dots drift away from the cursor.
      const mx = d.x - mouse.x, my = d.y - mouse.y;
      const md = Math.hypot(mx, my);
      if (md < 120) { d.x += (mx / md) * 1.5; d.y += (my / md) * 1.5; }

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = d.c;
      ctx.fill();
    }
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const a = dots[i], b = dots[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(129, 140, 248, ${0.25 * (1 - dist / 120)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    if (!document.hidden && canvas.getBoundingClientRect().bottom > 0) requestAnimationFrame(draw);
    else setTimeout(() => requestAnimationFrame(draw), 300);
  }

  canvas.parentElement.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.parentElement.addEventListener("mouseleave", () => { mouse.x = mouse.y = -9999; });
  window.addEventListener("resize", resize);
  resize();
  if (!reduceMotion) draw();
}

function initTilt() {
  if (!finePointer || reduceMotion) return;
  document.querySelectorAll(".skill-card, .project-card, .contact-card, .info-card").forEach(card => {
    card.classList.add("tilt");
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
      card.style.transform = `perspective(800px) rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 10}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
}

function initCursorGlow() {
  if (!finePointer || reduceMotion) return;
  const glow = document.querySelector(".cursor-glow");
  let x = 0, y = 0, cx = 0, cy = 0;
  window.addEventListener("mousemove", e => {
    x = e.clientX; y = e.clientY;
    document.body.classList.add("has-cursor");
  });
  (function follow() {
    cx += (x - cx) * 0.12;
    cy += (y - cy) * 0.12;
    glow.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(follow);
  })();
}

function initScrollEffects() {
  const bar = document.querySelector(".scroll-progress");
  const timelines = document.querySelectorAll(".timeline");
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a:not(.nav-cta)");

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;

    timelines.forEach(t => {
      const r = t.getBoundingClientRect();
      const p = (window.innerHeight * 0.75 - r.top) / r.height;
      t.style.setProperty("--progress", `${Math.max(0, Math.min(1, p)) * 100}%`);
    });

    let current = "";
    sections.forEach(s => { if (s.getBoundingClientRect().top < window.innerHeight * 0.4) current = s.id; });
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${current}`));
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}

function initTyped() {
  const el = document.querySelector(".typed");
  const words = ["· Android", "· iOS", "· Amazon"];
  if (reduceMotion) {
    el.textContent = "· Android · iOS · Amazon";
    return;
  }
  let w = 0, c = 0, deleting = false;
  (function tick() {
    const word = words[w];
    c += deleting ? -1 : 1;
    el.textContent = word.slice(0, c);
    let delay = deleting ? 60 : 110;
    if (!deleting && c === word.length) { deleting = true; delay = 1600; }
    else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
    setTimeout(tick, delay);
  })();
}

document.getElementById("year").textContent = new Date().getFullYear();
renderProjects();
initFilters();
initNav();
initReveal();
initParticles();
initTilt();
initCursorGlow();
initScrollEffects();
initPreloader(() => {
  initTyped();
  initCounters();
});
