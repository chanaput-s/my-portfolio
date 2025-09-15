// --- Three.js Star Particle Sphere ---
const canvas = document.getElementById("bgCanvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
const theme = document.documentElement.getAttribute("data-bs-theme");

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);

camera.position.z = 800;

let particles = [];
let palette = ["#ffffff", "#ffccaa", "#ffee88"]; // default warm

const sphereRadius = 500;
const particleCount = 2000;

for (let i = 0; i < particleCount; i++) {
  const geometry = new THREE.SphereGeometry(0.7, 6, 6);
  const color = new THREE.Color(
    palette[Math.floor(Math.random() * palette.length)]
  );
  const material = new THREE.MeshBasicMaterial({ color });
  const particle = new THREE.Mesh(geometry, material);

  const theta = Math.random() * Math.PI * 2;
  const phi = Math.random() * Math.PI;

  particle.userData = {
    radius: sphereRadius + Math.random() * 200,
    theta,
    phi,
    speed: 0.001 + Math.random() * 0.003,
    color,
  };

  particle.position.set(
    particle.userData.radius * Math.sin(phi) * Math.cos(theta),
    particle.userData.radius * Math.sin(phi) * Math.sin(theta),
    particle.userData.radius * Math.cos(phi)
  );

  scene.add(particle);
  particles.push(particle);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  const time = Date.now() * 0.0001;

  // Camera rotation
  camera.position.x = 800 * Math.sin(time);
  camera.position.z = 800 * Math.cos(time);
  camera.lookAt(0, 0, 0);

  // Update particles with twinkle
  particles.forEach((p, i) => {
    p.userData.theta += p.userData.speed;
    const intensity = Math.sin(Date.now() * 0.005 + i) * 0.5 + 0.5;
    p.material.color.copy(p.userData.color).multiplyScalar(intensity);
    p.position.x =
      p.userData.radius * Math.sin(p.userData.phi) * Math.cos(p.userData.theta);
    p.position.y =
      p.userData.radius * Math.sin(p.userData.phi) * Math.sin(p.userData.theta);
    p.position.z = p.userData.radius * Math.cos(p.userData.phi);
  });

  renderer.render(scene, camera);
}
animate();

function updateBackgroundColor() {
  const theme = document.documentElement.getAttribute("data-bs-theme");
  if (theme === "dark") {
    renderer.setClearColor(0x000000, 0); // dark background
  } else {
    renderer.setClearColor(0xffffff, 0); // light background
  }
}
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
  const mobileLinks = mobileMenu.getElementsByTagName("a");
  for (let link of mobileLinks) {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  }

  // Navbar style on scroll
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("shadow-lg", "bg-opacity-90");
    } else {
      navbar.classList.remove("shadow-lg", "bg-opacity-90");
    }
  });

  // Typewriter effect
  const typewriterText = document.getElementById("typewriter-text");
  const texts = ["Dev, Test, Automate.", "Data, Pipeline, Designer"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex];
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typewriterText.textContent = currentText.substring(0, charIndex);

    let typeSpeed = isDeleting ? 75 : 150;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500; // Pause before new text
    }

    setTimeout(type, typeSpeed);
  }
  type();

  // Fade-in on scroll
  const sections = document.querySelectorAll(".fade-in-section");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});
function filterCards(category) {
  let cards = document.querySelectorAll(".card");
  let buttons = document.querySelectorAll(".filter-buttons button");

  buttons.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  cards.forEach((card) => {
    if (category === "all" || card.classList.contains(category)) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}
