/* Renders content from data.js and wires up interactivity. Frontend-only. */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function safeUrl(u) { return /^https?:\/\//i.test(u || "") ? u : ""; }

  /* Placeholder shown if an image file is missing */
  function placeholder(label) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">' +
      '<rect width="640" height="360" fill="#CCFBF1"/><text x="320" y="185" text-anchor="middle" ' +
      'font-family="sans-serif" font-size="22" fill="#0F766E">' + label + '</text></svg>';
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  function guardImages(root) {
    $$("img", root).forEach(function (img) {
      img.addEventListener("error", function onErr() {
        img.removeEventListener("error", onErr);
        img.src = placeholder(img.id === "profile-photo" ? "Profile photo placeholder" : "Preview image to be added");
      });
    });
  }

  /* ---------- Static links ---------- */
  var mail = SITE.email ? "mailto:" + SITE.email : "";
  $("#link-linkedin").href = safeUrl(SITE.linkedin);
  $("#link-github").href = safeUrl(SITE.github);
  if (safeUrl(SITE.resume)) { $("#link-resume").href = SITE.resume; } else { $("#link-resume").hidden = true; }
  $("#contact-linkedin").href = safeUrl(SITE.linkedin);
  $("#contact-github").href = safeUrl(SITE.github);
  $("#foot-linkedin").href = safeUrl(SITE.linkedin);
  $("#foot-github").href = safeUrl(SITE.github);
  var emailText = SITE.email || "[Add your email in data.js]";
  ["#contact-email", "#foot-email"].forEach(function (s) { if (mail) $(s).href = mail; });
  $("#contact-email-text").textContent = emailText;
  $("#foot-email").textContent = emailText;
  $("#profile-photo").src = SITE.photo;
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Services ---------- */
  $("#services-grid").innerHTML = SERVICES.map(function (s) {
    return '<article class="card service lift">' +
      '<div class="icon-box" aria-hidden="true"><i class="fas ' + esc(s.icon) + '"></i></div>' +
      "<h3>" + esc(s.title) + "</h3><p>" + esc(s.desc) + "</p>" +
      '<ul class="ticks">' + s.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>" +
      '<a href="#contact" class="btn btn-outline btn-sm" data-service="' + esc(s.id) + '">Discuss This Service</a></article>';
  }).join("");
  $("#foot-services").innerHTML = SERVICES.map(function (s) {
    return '<li><a href="#contact" data-service="' + esc(s.id) + '">' + esc(s.title) + "</a></li>";
  }).join("");

  var sel = $("#f-service");
  sel.innerHTML = '<option value="">Select a service</option>' +
    SERVICES.map(function (s) { return '<option value="' + esc(s.id) + '">' + esc(s.title) + "</option>"; }).join("") +
    '<option value="Other / Not sure yet">Other / Not sure yet</option>';
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-service]");
    if (a) { sel.value = a.getAttribute("data-service"); }
  });

  /* ---------- Projects ---------- */
  var activeFilter = "All";
  function renderFilters() {
    $("#filters").innerHTML = PROJECT_FILTERS.map(function (f) {
      return '<button type="button" class="chip" data-filter="' + esc(f) + '" aria-pressed="' + (f === activeFilter) + '">' + esc(f) + "</button>";
    }).join("");
  }
  function renderProjects() {
    var list = PROJECTS.filter(function (p) { return activeFilter === "All" || p.categories.indexOf(activeFilter) > -1; });
    var grid = $("#projects-grid");
    if (!list.length) {
      grid.innerHTML = '<p class="empty">No projects in this category yet. More are on the way.</p>';
      return;
    }
    grid.innerHTML = list.map(function (p) {
      var gh = safeUrl(p.github), demo = safeUrl(p.demo);
      return '<article class="card project lift">' +
        '<img src="' + esc(p.image) + '" alt="' + esc(p.alt || p.title) + '" loading="lazy">' +
        '<div class="project-body"><h3>' + esc(p.title) + "</h3><p>" + esc(p.desc) + "</p>" +
        '<div class="tags">' + p.tags.map(function (t) { return '<span class="tag">' + esc(t.label) + "</span>"; }).join("") + "</div>" +
        '<div class="proj-actions">' +
        (gh ? '<a class="btn btn-primary" href="' + esc(gh) + '" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> GitHub</a>' : "") +
        (demo ? '<a class="btn btn-outline" href="' + esc(demo) + '" target="_blank" rel="noopener noreferrer"><i class="fas fa-up-right-from-square"></i> Live Demo</a>' : "") +
        "</div></div></article>";
    }).join("");
    guardImages(grid);
  }
  renderFilters(); renderProjects();
  $("#filters").addEventListener("click", function (e) {
    var b = e.target.closest("[data-filter]");
    if (!b) return;
    activeFilter = b.getAttribute("data-filter");
    renderFilters(); renderProjects();
  });

  /* ---------- Skills ---------- */
  $("#skills-grid").innerHTML = SKILLS.map(function (g) {
    return '<div class="card skill-card"><h3><i class="fas ' + esc(g.icon) + '" aria-hidden="true"></i>' + esc(g.group) + "</h3>" +
      '<div class="pills">' + g.items.map(function (i) {
        return '<span class="pill">' + esc(i.name) + (i.level ? "<small>" + esc(i.level) + "</small>" : "") + "</span>";
      }).join("") + "</div></div>";
  }).join("");

  /* ---------- About ---------- */
  $("#edu-degree").textContent = EDUCATION.degree;
  $("#edu-school").textContent = EDUCATION.school;
  $("#edu-year").textContent = EDUCATION.year;
  $("#cert-list").innerHTML = CERTIFICATIONS.map(function (c) {
    return "<li><strong>" + esc(c.title) + "</strong>" + esc(c.issuer) + " &middot; " + esc(c.date) +
      (safeUrl(c.url) ? '<br><a href="' + esc(c.url) + '" target="_blank" rel="noopener noreferrer">View certificate</a>' : "") + "</li>";
  }).join("");
  $("#learning-list").innerHTML = LEARNING.map(function (l) { return "<li>" + esc(l) + "</li>"; }).join("");
  $("#why-grid").innerHTML = HIGHLIGHTS.map(function (h) {
    return '<div class="card"><i class="fas fa-circle-check" aria-hidden="true"></i><span>' + esc(h) + "</span></div>";
  }).join("");

  /* ---------- Reviews carousel ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  (function initCarousel() {
    var box = $("#carousel");
    if (!TESTIMONIALS.length) { $("#reviews-empty").hidden = false; return; }
    box.hidden = false;
    var track = $("#car-track"), dots = $("#car-dots"), viewport = $("#car-viewport");
    var n = TESTIMONIALS.length, idx = 0, DELAY = 6000, timer = null, userPaused = false, hovering = false;

    function initials(name) {
      return String(name || "?").split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0).toUpperCase(); }).join("");
    }
    track.innerHTML = TESTIMONIALS.map(function (t, i) {
      var meta = [t.role, t.company].filter(Boolean).join(", ");
      var nm = safeUrl(t.linkedin)
        ? '<a href="' + esc(t.linkedin) + '" target="_blank" rel="noopener noreferrer">' + esc(t.name) + ' <i class="fab fa-linkedin" aria-hidden="true"></i><span class="sr">(LinkedIn profile)</span></a>'
        : esc(t.name);
      var avatar = t.photo
        ? '<img src="' + esc(t.photo) + '" alt="Photo of ' + esc(t.name) + '" loading="lazy">'
        : '<span class="avatar" aria-hidden="true">' + esc(initials(t.name)) + "</span>";
      return '<div class="car-slide" role="group" aria-roledescription="slide" aria-label="Review ' + (i + 1) + " of " + n + '">' +
        '<figure class="card review lift">' +
        (t.demo ? '<span class="demo-badge">Demo content &mdash; replace with a real client review</span>' : "") +
        '<i class="fas fa-quote-left q" aria-hidden="true"></i>' +
        "<blockquote><p>" + esc(t.text) + "</p></blockquote>" +
        '<figcaption class="reviewer">' + avatar + "<div><b>" + nm + "</b>" + (meta ? "<small>" + esc(meta) + "</small>" : "") + "</div></figcaption>" +
        "</figure></div>";
    }).join("");
    var slides = $$(".car-slide", track);
    dots.innerHTML = TESTIMONIALS.map(function (t, i) {
      return '<button type="button" class="car-dot" data-i="' + i + '" aria-label="Show review ' + (i + 1) + '"></button>';
    }).join("");
    var dotEls = $$(".car-dot", dots);
    guardImages(track);

    function show(i, userAction) {
      idx = (i + n) % n;
      track.style.transform = "translateX(" + (-idx * 100) + "%)";
      slides.forEach(function (s, k) {
        var on = k === idx;
        s.setAttribute("aria-hidden", on ? "false" : "true");
        if (on) s.removeAttribute("inert"); else s.setAttribute("inert", "");
      });
      dotEls.forEach(function (d, k) {
        if (k === idx) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current");
      });
      if (userAction) restart();
    }
    function canPlay() { return n > 1 && !reduceMotion && !userPaused && !hovering && !document.hidden; }
    function stop() { if (timer) { clearInterval(timer); timer = null; } track.setAttribute("aria-live", "polite"); }
    function start() { stop(); if (canPlay()) { track.setAttribute("aria-live", "off"); timer = setInterval(function () { show(idx + 1); }, DELAY); } }
    function restart() { start(); }

    $("#car-prev").addEventListener("click", function () { show(idx - 1, true); });
    $("#car-next").addEventListener("click", function () { show(idx + 1, true); });
    dots.addEventListener("click", function (e) { var d = e.target.closest("[data-i]"); if (d) show(+d.getAttribute("data-i"), true); });
    box.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { show(idx - 1, true); } else if (e.key === "ArrowRight") { show(idx + 1, true); }
    });
    box.addEventListener("mouseenter", function () { hovering = true; start(); });
    box.addEventListener("mouseleave", function () { hovering = false; start(); });
    box.addEventListener("focusin", function () { hovering = true; start(); });
    box.addEventListener("focusout", function () { hovering = false; start(); });
    document.addEventListener("visibilitychange", start);

    var toggle = $("#car-toggle");
    toggle.addEventListener("click", function () {
      userPaused = !userPaused;
      toggle.setAttribute("aria-label", userPaused ? "Start automatic sliding" : "Pause automatic sliding");
      toggle.firstElementChild.className = userPaused ? "fas fa-play" : "fas fa-pause";
      start();
    });

    /* Touch swipe */
    var sx = 0, sy = 0, tracking = false;
    viewport.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) return;
      sx = e.touches[0].clientX; sy = e.touches[0].clientY; tracking = true; hovering = true; stop();
    }, { passive: true });
    viewport.addEventListener("touchend", function (e) {
      if (!tracking) return; tracking = false; hovering = false;
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) show(idx + (dx < 0 ? 1 : -1), true); else start();
    }, { passive: true });
    viewport.addEventListener("touchcancel", function () { tracking = false; hovering = false; start(); }, { passive: true });

    if (n < 2) { $("#car-prev").hidden = true; $("#car-next").hidden = true; dots.hidden = true; toggle.hidden = true; }
    show(0);
    start();
  })();

  /* ---------- Fade-in on scroll for the reviews section ---------- */
  (function () {
    var el = $("#reviews .container");
    if (!el || reduceMotion || !("IntersectionObserver" in window)) return;
    el.classList.add("reveal");
    var ro = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { el.classList.add("in"); ro.disconnect(); }
    }, { threshold: 0.15 });
    ro.observe(el);
  })();

  /* ---------- Steps ---------- */
  $("#steps-grid").innerHTML = STEPS.map(function (s, i) {
    return '<div class="card step lift"><span class="num">' + (i + 1) + '</span><div class="icon-box" aria-hidden="true"><i class="fas ' + esc(s.icon) + '"></i></div>' +
      "<h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></div>";
  }).join("");

  /* ---------- FAQ ---------- */
  $("#faq-list").innerHTML = FAQS.map(function (f, i) {
    return '<div class="card faq-item"><h3 style="margin:0"><button type="button" class="faq-q" id="faq-q' + i + '" aria-expanded="false" aria-controls="faq-a' + i + '">' +
      "<span>" + esc(f.q) + '</span><i class="fas fa-chevron-down" aria-hidden="true"></i></button></h3>' +
      '<div class="faq-a" id="faq-a' + i + '" role="region" aria-labelledby="faq-q' + i + '" hidden>' + esc(f.a) + "</div></div>";
  }).join("");
  $("#faq-list").addEventListener("click", function (e) {
    var b = e.target.closest(".faq-q");
    if (!b) return;
    var open = b.getAttribute("aria-expanded") === "true";
    b.setAttribute("aria-expanded", String(!open));
    document.getElementById(b.getAttribute("aria-controls")).hidden = open;
  });

  /* ---------- Mobile menu ---------- */
  var menuBtn = $("#menu-btn"), menu = $("#mobile-menu");
  function setMenu(open) {
    menu.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuBtn.firstElementChild.className = open ? "fas fa-xmark" : "fas fa-bars";
  }
  menuBtn.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- Active nav link ---------- */
  var ids = ["home", "services", "projects", "skills", "about", "reviews", "contact"];
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        $$('#nav-links a:not(.btn)').forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
          if (a.classList.contains("active")) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ids.forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }



  /* ---------- Contact form (Formspree) ---------- */
var form = $("#inquiry-form"),
    status = $("#form-status");

function setErr(id, msg) {
  var field = form.querySelector(
    "#" + id.replace("e-", "f-")
  );

  $("#" + id).textContent = msg;

  if (field) {
    if (msg) {
      field.setAttribute("aria-invalid", "true");
    } else {
      field.removeAttribute("aria-invalid");
    }
  }
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  var v = {
    name: $("#f-name").value.trim(),
    email: $("#f-email").value.trim(),
    company: $("#f-company").value.trim(),
    service: $("#f-service").value,
    desc: $("#f-desc").value.trim(),
    budget: $("#f-budget").value.trim(),
    deadline: $("#f-deadline").value
  };

  var ok = true;

  setErr(
    "e-name",
    v.name ? "" : (ok = false, "Please enter your name.")
  );

  setErr(
    "e-email",
    !v.email
      ? (ok = false, "Please enter your email address.")
      : (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)
          ? ""
          : (ok = false, "Please enter a valid email address."))
  );

  setErr(
    "e-service",
    v.service ? "" : (ok = false, "Please choose a service.")
  );

  setErr(
    "e-desc",
    v.desc.length >= 10
      ? ""
      : (ok = false, "Please describe your project (at least 10 characters).")
  );

  status.hidden = false;

  if (!ok) {
    status.textContent = "Please fix the highlighted fields and try again.";

    var firstBad = form.querySelector('[aria-invalid="true"]');
    if (firstBad) firstBad.focus();

    return;
  }

  var submitBtn = form.querySelector('button[type="submit"]');
  var originalText = submitBtn.innerHTML;

  submitBtn.disabled = true;
  submitBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Sending...';

  status.textContent = "Sending your inquiry...";

  try {
    var response = await fetch(
      "https://formspree.io/f/mdeazggd",
      {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      }
    );

    var result = await response.json();

    if (response.ok) {
      status.textContent =
        "Thank you! Your project inquiry has been submitted successfully.";

      form.reset();

      $$(".err", form).forEach(function (el) {
        el.textContent = "";
      });

      form.querySelectorAll("[aria-invalid]").forEach(function (el) {
        el.removeAttribute("aria-invalid");
      });

    } else {
      status.textContent = result.errors
        ? result.errors.map(function (err) {
            return err.message;
          }).join(" ")
        : "Unable to send your inquiry. Please try again.";
    }

  } catch (error) {
    status.textContent =
      "Connection error. Please check your internet connection and try again.";

  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
});

guardImages(document);
})();



//   /* ---------- Contact form (mailto, no backend) ---------- */
//   var form = $("#inquiry-form"), status = $("#form-status");
//   function setErr(id, msg) {
//     var field = form.querySelector("#" + id.replace("e-", "f-").replace("f-desc", "f-desc"));
//     $("#" + id).textContent = msg;
//     if (field) { if (msg) field.setAttribute("aria-invalid", "true"); else field.removeAttribute("aria-invalid"); }
//   }
//   form.addEventListener("submit", function (e) {
//     e.preventDefault();
//     var v = {
//       name: $("#f-name").value.trim(), email: $("#f-email").value.trim(), company: $("#f-company").value.trim(),
//       service: $("#f-service").value, desc: $("#f-desc").value.trim(), budget: $("#f-budget").value.trim(), deadline: $("#f-deadline").value
//     };
//     var ok = true;
//     setErr("e-name", v.name ? "" : (ok = false, "Please enter your name."));
//     setErr("e-email", !v.email ? (ok = false, "Please enter your email address.") :
//       (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email) ? "" : (ok = false, "Please enter a valid email address.")));
//     setErr("e-service", v.service ? "" : (ok = false, "Please choose a service."));
//     setErr("e-desc", v.desc.length >= 10 ? "" : (ok = false, "Please describe your project (at least 10 characters)."));
//     status.hidden = false;
//     if (!ok) {
//       status.textContent = "Please fix the highlighted fields and try again.";
//       var firstBad = form.querySelector('[aria-invalid="true"]'); if (firstBad) firstBad.focus();
//       return;
//     }
//     if (!SITE.email) {
//       status.textContent = "The site owner's email address has not been set yet, so the inquiry can't be prepared.";
//       return;
//     }
//     var lines = [
//       "Name: " + v.name, "Email: " + v.email, "Company: " + (v.company || "-"), "Service required: " + v.service,
//       "Budget range: " + (v.budget || "-"), "Expected deadline: " + (v.deadline || "-"), "", "Project description:", v.desc
//     ];
//     var href = "mailto:" + SITE.email + "?subject=" + encodeURIComponent("Project inquiry: " + v.service) +
//       "&body=" + encodeURIComponent(lines.join("\r\n"));
//     status.textContent = "Your email app should now open with the inquiry filled in. Please press Send there. This website cannot confirm whether the email was sent. If nothing opened, copy your details and email " + SITE.email + " directly.";
//     window.location.href = href;
//   });

//   guardImages(document);
// })();
