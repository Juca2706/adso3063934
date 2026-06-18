// ═══════════════════════════════════════
// SISTEMA DE NAVEGACIÓN ENTRE VISTAS
// ═══════════════════════════════════════

const views = document.querySelectorAll("main");
const viewIndexById = {};

views.forEach((view, index) => {
    viewIndexById[view.id] = index;
});

let currentView = viewIndexById["welcome"];

// ───────────────────────────────────────
// Sincroniza la clase .active en TODOS los bottom-nav
// del documento según el id de la vista actual
// ───────────────────────────────────────
function syncActiveNav(viewId) {
    document.querySelectorAll(".bottom-nav .nav-item").forEach(item => {
        item.classList.toggle("active", item.getAttribute("data-nav") === viewId);
    });
}

// ───────────────────────────────────────
// TRANSICIÓN: fade + slight scale + slide
// ───────────────────────────────────────
function showView(targetId, direction = "forward") {
    const nextIndex = viewIndexById[targetId];
    if (nextIndex === undefined || nextIndex === currentView) return;

    const currentEl = views[currentView];
    const nextEl = views[nextIndex];

    currentEl.classList.remove("animateView", "viewOut-forward", "viewOut-back");
    currentEl.classList.add(direction === "back" ? "viewOut-back" : "viewOut-forward");

    setTimeout(() => {
        views.forEach(v => {
            v.style.display = "none";
            v.classList.remove("viewOut-forward", "viewOut-back", "animateView");
        });

        nextEl.style.display = "block";
        nextEl.classList.add(direction === "back" ? "animateView-back" : "animateView");

        currentView = nextIndex;

        // ← CLAVE: sincroniza el nav activo cada vez que cambiamos de vista
        syncActiveNav(targetId);
    }, 280);
}

// ───────────────────────────────────────
// WELCOME → LOGIN / REGISTER
// ───────────────────────────────────────
document.querySelector(".btn-signin")?.addEventListener("click", () => {
    showView("login");
});

document.querySelector(".btn-signup")?.addEventListener("click", () => {
    showView("register");
});

// ───────────────────────────────────────
// LOGIN/REGISTER → HOME
// ───────────────────────────────────────
document.querySelectorAll(".btn-back").forEach(btn => {
    btn.addEventListener("click", () => {
        showView("welcome", "back");
    });
});

// ───────────────────────────────────────
// LOGIN → DASHBOARD
// ───────────────────────────────────────
document.querySelector("#login .auth-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    showView("dashboard");
});

document.querySelector("#login .link-forgot")?.addEventListener("click", () => {
    showView("register");
});

// ───────────────────────────────────────
// REGISTER → DASHBOARD
// ───────────────────────────────────────
document.querySelector("#register .auth-form-register")?.addEventListener("submit", (e) => {
    e.preventDefault();
    showView("login");
});

document.querySelector("#register .link-forgot")?.addEventListener("click", () => {
    showView("login");
});

// ───────────────────────────────────────
// LOGOUT → WELCOME
// ───────────────────────────────────────
document.querySelectorAll(".btn-logout").forEach(btn => {
    btn.addEventListener("click", () => {
        showView("welcome", "back");
    });
});

// ───────────────────────────────────────
// BOTTOM NAV — dashboard / characters / automobiles / my-profile
// ───────────────────────────────────────
document.querySelectorAll(".bottom-nav .nav-item").forEach(item => {
    item.addEventListener("click", function () {
        const targetView = this.getAttribute("data-nav");
        showView(targetView);
        // Ya no hace falta togglear .active aquí manualmente:
        // showView() llama a syncActiveNav() internamente.
    });
});

// ───────────────────────────────────────
// SAVE / SAVE CHANGES — efecto de "guardado"
// ───────────────────────────────────────
function playSaveFeedback(button) {
    const originalHTML = button.innerHTML;

    button.disabled = true;
    button.innerHTML = `<i class="ph ph-spinner-gap save-spin"></i> Saving...`;

    setTimeout(() => {
        button.innerHTML = `<i class="ph ph-check-circle"></i> Saved!`;
        button.classList.add("btn-saved-success");

        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove("btn-saved-success");
            button.disabled = false;
        }, 900);
    }, 700);
}

document.querySelectorAll(".btn-save, .profile-btn-save").forEach(btn => {
    btn.addEventListener("click", () => {
        playSaveFeedback(btn);
    });
});

// ───────────────────────────────────────
// INICIALIZACIÓN
// ───────────────────────────────────────
function initView() {
    views.forEach(v => {
        v.style.display = "none";
        v.classList.remove("animateView", "animateView-back");
    });
    views[currentView].style.display = "block";
    views[currentView].classList.add("animateView");
    syncActiveNav(views[currentView].id);
}
initView();

// ───────────────────────────────────────
// CONTROL DE SCROLL DEL MAIN AL ABRIR/CERRAR MODALES
// ───────────────────────────────────────
function lockScroll() {
    // Bloquea el scroll del main actualmente visible
    const activeMain = views[currentView];
    activeMain.style.overflowY = "hidden";
}

function unlockScroll() {
    // Restaura el scroll del main actualmente visible
    const activeMain = views[currentView];
    activeMain.style.overflowY = "auto";
}