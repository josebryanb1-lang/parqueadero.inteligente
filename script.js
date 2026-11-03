
// =====================================
// SMART PARKING - FUNCIONES JAVASCRIPT
// =====================================

// 1. MENÚ MÓVIL

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    const abierto = navMenu.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", abierto);
    menuToggle.setAttribute(
        "aria-label",
        abierto ? "Cerrar menú" : "Abrir menú"
    );

    menuToggle.textContent = abierto ? "✕" : "☰";
});

// Cerrar menú al seleccionar una sección

document.querySelectorAll(".nav a").forEach(enlace => {
    enlace.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
    });
});

// =====================================
// 2. ANIMACIONES AL DESPLAZARSE
// =====================================

const elementos = document.querySelectorAll(
    ".card, .step, .member, .objective-box, .gallery-item"
);

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observador.unobserve(entrada.target);
        }
    });
}, {
    threshold: 0.15
});

elementos.forEach(elemento => {
    elemento.classList.add("revelar");
    observador.observe(elemento);
});

// =====================================
// 3. GALERÍA DE FOTOGRAFÍAS
// =====================================

// Crear una ventana para ampliar imágenes

const ventana = document.createElement("dialog");
ventana.className = "visor";
ventana.innerHTML = `
    <button class="cerrar-visor"
            aria-label="Cerrar fotografía">✕</button>
    <img class="imagen-ampliada" alt="Fotografía ampliada">
`;
document.body.appendChild(ventana);

const imagenAmpliada = ventana.querySelector(".imagen-ampliada");
const cerrarVisor = ventana.querySelector(".cerrar-visor");

// Abrir imagen al hacer clic

document.querySelectorAll(".gallery-item img").forEach(imagen => {
    imagen.addEventListener("click", () => {
        imagenAmpliada.src = imagen.src;
        imagenAmpliada.alt = imagen.alt;
        ventana.showModal();
    });
});

// Cerrar ventana

cerrarVisor.addEventListener("click", () => {
    ventana.close();
});

ventana.addEventListener("click", evento => {
    if (evento.target === ventana) {
        ventana.close();
    }
});

ventana.addEventListener("close", () => {
    imagenAmpliada.removeAttribute("src");
});

// =====================================
// 4. MENSAJE DE INICIO
// =====================================

console.log(
    "SMART PARKING - Proyecto de Robótica 2026"
);

console.log(
    "Complejo Educativo Católico San Francisco"
);

/* VISOR DE FOTOGRAFÍAS */

.visor {
    position: fixed;
    margin: auto;
    width: min(90%, 850px);
    max-width: 850px;
    padding: 45px 15px 15px;
    border: none;
    border-radius: 15px;
    background: #173f32;
    box-shadow: 0 15px 60px rgba(0,0,0,0.4);
}

.visor::backdrop {
    background: rgba(0,0,0,0.85);
}

.imagen-ampliada {
    display: block;
    width: 100%;
    max-height: 75vh;
    object-fit: contain;
    border-radius: 8px;
}

.cerrar-visor {
    position: absolute;
    top: 8px;
    right: 12px;
    border: none;
    background: #a9c99a;
    color: #173f32;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    cursor: pointer;
    font-size: 18px;
}
