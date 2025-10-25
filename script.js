/* ========= EDITABLE DATA =========
   Change logo by replacing logo.png file in the same folder.
   Edit OFFICIALS array below to add/change officials.
*/


/* ======== Do not edit below unless you know JS ======== */
document.addEventListener("DOMContentLoaded", () => {
  // set year
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // render officials
  function renderOfficials() {
    const grid = document.getElementById("officialsGrid");
    if (!grid) return;
    grid.innerHTML = "";
    OFFICIALS.forEach((o, idx) => {
      const card = document.createElement("div");
      card.className = "official-card fade-in";
      card.style.animationDelay = `${idx * 80}ms`;

      let photoHtml = "";
      if (o.photo && o.photo.trim() !== "") {
        photoHtml = `<div style="border-radius:10px;overflow:hidden"><img src="${o.photo}" alt="${o.name}" class="official-img"></div>`;
      } else {
        photoHtml = `<div class="photo-placeholder">Replace this with official photo</div>`;
      }

      card.innerHTML = `
        ${photoHtml}
        <div class="official-info" style="padding-top:12px">
          <h4 style="margin:0 0 6px">${o.name}</h4>
          <div class="pos" style="font-size:13px;color:var(--accent);font-weight:700">${o.position}</div>
          <div class="dept" style="font-size:13px;color:var(--muted);margin-top:6px">${o.department} • ${o.specialization}</div>
          <div style="margin-top:10px"><a href="mailto:${o.email}" style="font-size:13px;color:var(--muted)">${o.email}</a></div>
        </div>
      `;
      grid.appendChild(card);
    });
  }
  renderOfficials();

  // Mobile menu toggle
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");

  function setMobile(open) {
    if (!mobileMenu) return;
    if (open) {
      mobileMenu.style.display = "block";
      navToggle.setAttribute("aria-expanded", "true");
      mobileMenu.setAttribute("aria-hidden", "false");
    } else {
      mobileMenu.style.display = "none";
      navToggle.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
    }
  }
  setMobile(false);
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const visible = mobileMenu.style.display === "block";
      setMobile(!visible);
    });
  }

  // Smooth scrolling for links and close mobile menu on click
  navLinks.forEach((a) => {
    a.addEventListener("click", (e) => {
      // read data-target attribute if present, else use href hash
      const target =
        a.getAttribute("data-target") ||
        (a.getAttribute("href") || "").replace("#", "");
      if (!target) return;
      e.preventDefault();
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      // close mobile menu if open
      setMobile(false);
    });
  });

  // Fade-in intersection observer
  const fadeEls = document.querySelectorAll(".fade-in");
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeEls.forEach((el) => io.observe(el));

  // Contact form: open mail client (fallback)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      if (!name || !email || !message) {
        alert("Please fill all fields.");
        return;
      }
      const subject = encodeURIComponent(`Website Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      );
      window.location.href = `mailto:cit@slsu.edu.ph?subject=${subject}&body=${body}`;
    });
  }
}); // DOMContentLoaded end