const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");
const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

const revealTargets = document.querySelectorAll(
  ".section > *, .card, .highlight, .skill-group, .hero > *"
);
if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("js-reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el, i) => {
    el.style.setProperty("--d", `${(i % 4) * 90}ms`);
    io.observe(el);
  });

  const links = [...document.querySelectorAll(".nav a")];
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((a) =>
            a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`)
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));
}
