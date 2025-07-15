/* ===================== DATA ===================== */
const data = {
    headlineWords: ["Frontend Developer", "JavaScript Enthusiast", "UI/UX Lover"],
    timeline: [
        {
            year: "2023-2025",
            description: "Frontend Engineer at TechCorp, building React apps"
        },
        {
            year: "2021-2023",
            description: "B.Sc. Computer Science, State University"
        },
        {
            year: "2020",
            description: "Freelance web projects for local businesses"
        }
    ],
    projects: [
        {
            title: "Portfolio Website",
            tech: "HTML • CSS • JS",
            live: "https://example.com",
            github: "https://github.com/username/portfolio",
            image: "assets/project1.jpg"
        },
        {
            title: "Weather App",
            tech: "React • OpenWeather API",
            live: "https://example.com/weather",
            github: "https://github.com/username/weather-app",
            image: "assets/project2.jpg"
        },
        {
            title: "Task Manager",
            tech: "Vue • Firebase",
            live: "https://example.com/tasks",
            github: "https://github.com/username/task-manager",
            image: "assets/project3.jpg"
        }
    ],
    skills: [
        { name: "HTML", level: 95 },
        { name: "CSS", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "React", level: 80 },
        { name: "Node.js", level: 70 }
    ]
};

/* ================== THEME HANDLING ================== */
function initTheme() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = prefersDark ? "dark" : "light";
    document.documentElement.setAttribute("data-color-scheme", initial);
    updateThemeToggleIcon(initial);
}

function toggleTheme() {
    const root = document.documentElement;
    const current = root.getAttribute("data-color-scheme") || "light";
    const next = current === "light" ? "dark" : "light";

    root.setAttribute("data-color-scheme", next);
    updateThemeToggleIcon(next);
}

function updateThemeToggleIcon(mode) {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.textContent = mode === "dark" ? "☀️" : "🌙";
}

/* ================== TYPED HEADLINE ================== */
function typeWriterEffect() {
    if (typeof Typed === "undefined") return;
    /* global Typed */
    new Typed("#typewriter", {
        strings: data.headlineWords,
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2000,
        loop: true
    });
}

/* ================== ABOUT TIMELINE ================== */
function loadTimeline() {
    const ul = document.getElementById("timeline");
    const heading = document.getElementById("education-heading");
    if (!ul) return;

    heading.textContent = "Education & Experience";

    data.timeline.forEach((item) => {
        const li = document.createElement("li");
        li.className = "timeline-item reveal";

        const year = document.createElement("div");
        year.className = "timeline-year";
        year.textContent = item.year;

        const desc = document.createElement("p");
        desc.className = "timeline-desc";
        desc.textContent = item.description;

        li.append(year, desc);
        ul.appendChild(li);
    });
}

/* ================== PROJECTS ================== */
function loadProjects() {
    const container = document.querySelector(".projects-container");
    if (!container) return;

    data.projects.forEach((proj) => {
        const card = document.createElement("article");
        card.className = "project-card reveal";

        const imgDiv = document.createElement("div");
        imgDiv.className = "project-image";
        imgDiv.setAttribute("aria-label", `${proj.title} screenshot`);

        const content = document.createElement("div");
        content.className = "project-content";

        const title = document.createElement("h3");
        title.className = "project-title";
        title.textContent = proj.title;

        const tech = document.createElement("p");
        tech.className = "project-tech";
        tech.textContent = proj.tech;

        const links = document.createElement("div");
        links.className = "project-links";

        const liveLink = document.createElement("a");
        liveLink.className = "project-link";
        liveLink.href = proj.live;
        liveLink.target = "_blank";
        liveLink.rel = "noopener noreferrer";
        liveLink.textContent = "Live";

        const gitLink = document.createElement("a");
        gitLink.className = "project-link";
        gitLink.href = proj.github;
        gitLink.target = "_blank";
        gitLink.rel = "noopener noreferrer";
        gitLink.textContent = "GitHub";

        links.append(liveLink, gitLink);
        content.append(title, tech, links);
        card.append(imgDiv, content);
        container.appendChild(card);
    });
}

/* ================== SKILLS ================== */
function loadSkills() {
    const list = document.getElementById("skills-list");
    if (!list) return;

    data.skills.forEach((skill) => {
        const li = document.createElement("li");
        li.className = "skill-item reveal";

        const name = document.createElement("span");
        name.className = "skill-name";
        name.textContent = skill.name;

        const barContainer = document.createElement("div");
        barContainer.className = "skill-bar-container";

        const bar = document.createElement("span");
        bar.className = "skill-bar";
        bar.dataset.level = skill.level;
        barContainer.appendChild(bar);

        const percent = document.createElement("span");
        percent.className = "skill-percentage";
        percent.textContent = `${skill.level}%`;

        li.append(name, barContainer, percent);
        list.appendChild(li);
    });

    animateSkillBars();
}

function animateSkillBars() {
    const bars = document.querySelectorAll(".skill-bar");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const lvl = entry.target.dataset.level;
                    entry.target.style.width = `${lvl}%`;
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.4 }
    );

    bars.forEach((bar) => observer.observe(bar));
}

/* ================== SCROLL REVEAL ================== */
function handleRevealFallback() {
    document.querySelectorAll(".reveal").forEach((el) => {
        el.style.opacity = 1;
        el.style.transform = "none";
    });
}

function scrollReveal() {
    if (typeof ScrollReveal === "undefined") {
        handleRevealFallback();
        return;
    }

    ScrollReveal().reveal(".reveal", {
        distance: "30px",
        duration: 700,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        origin: "bottom",
        interval: 100,
        reset: false,
        afterReveal: (el) => {
            el.style.opacity = 1;
            el.style.transform = "none";
        }
    });
}

/* ================== FORM VALIDATION ================== */
function attachFormValidation() {
    const form = document.getElementById("contact-form");
    const msgEl = document.getElementById("form-msg");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        msgEl.className = "hidden";
        msgEl.textContent = "";
        form.querySelectorAll(".error").forEach((el) => el.classList.remove("error"));

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        let hasError = false;

        if (!name) {
            setFieldError("name", "Name is required");
            hasError = true;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setFieldError("email", "Valid email required");
            hasError = true;
        }

        if (!message) {
            setFieldError("message", "Message cannot be empty");
            hasError = true;
        }

        if (hasError) return;

        console.log({ name, email, message });
        msgEl.textContent = "Message sent successfully! (simulated)";
        msgEl.className = "success";
        form.reset();
    });

    function setFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        field.classList.add("error");
        msgEl.textContent = message;
        msgEl.className = "error";
    }
}

/* ================== SMOOTH SCROLL FOR NAV LINKS ================== */
function setupSmoothScroll() {
    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").slice(1);
            const targetEl = document.getElementById(targetId);
            if (!targetEl) return;

            const header = document.querySelector(".header");
            const headerHeight = header ? header.offsetHeight : 80;
            const offsetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        });
    });
}

/* ================== INIT ================== */
window.addEventListener("DOMContentLoaded", () => {
    initTheme();
    typeWriterEffect();
    loadTimeline();
    loadProjects();
    loadSkills();
    scrollReveal();
    attachFormValidation();
    setupSmoothScroll();

    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            toggleTheme();
        });
    }
});
