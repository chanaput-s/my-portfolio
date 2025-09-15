// --- Three.js Star Particle Sphere ---
const canvas = document.getElementById("bgCanvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
camera.position.z = 800;

let particles = [];
// Vibrant modern palette: Cyan, Teal, Deep Blue, Purple
let palette = ["#2dd4bf", "#3b82f6", "#8b5cf6", "#06b6d4", "#ffffff"];

const sphereRadius = 600;
const particleCount = 2500;

for (let i = 0; i < particleCount; i++) {
  // Varying particle sizes for depth
  const size = Math.random() < 0.1 ? 1.5 : (Math.random() < 0.5 ? 0.8 : 0.4);
  const geometry = new THREE.SphereGeometry(size, 6, 6);
  const color = new THREE.Color(palette[Math.floor(Math.random() * palette.length)]);
  
  // Make some particles more transparent
  const material = new THREE.MeshBasicMaterial({ 
    color, 
    transparent: true,
    opacity: Math.random() * 0.5 + 0.3 
  });
  const particle = new THREE.Mesh(geometry, material);

  const theta = Math.random() * Math.PI * 2;
  const phi = Math.random() * Math.PI;

  particle.userData = {
    radius: sphereRadius + (Math.random() - 0.5) * 400, // wider spread
    theta,
    phi,
    speed: 0.001 + Math.random() * 0.002,
    baseColor: color.clone(),
    pulseSpeed: Math.random() * 0.02 + 0.01,
    pulseOffset: Math.random() * Math.PI * 2
  };

  particle.position.set(
    particle.userData.radius * Math.sin(phi) * Math.cos(theta),
    particle.userData.radius * Math.sin(phi) * Math.sin(theta),
    particle.userData.radius * Math.cos(phi)
  );

  scene.add(particle);
  particles.push(particle);
}

// Mouse tracking for subtle parallax
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX - window.innerWidth / 2);
  mouseY = (event.clientY - window.innerHeight / 2);
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  const time = Date.now() * 0.0001;

  // Smooth mouse interpolation
  targetX = mouseX * 0.05;
  targetY = mouseY * 0.05;

  camera.position.x += (targetX - camera.position.x) * 0.05;
  camera.position.y += (-targetY - camera.position.y) * 0.05;
  
  // Base rotation
  scene.rotation.y = time * 0.5;
  scene.rotation.x = time * 0.2;

  particles.forEach((p) => {
    // Subtle breathing/pulsing effect
    const pulse = Math.sin(time * 10 * p.userData.pulseSpeed + p.userData.pulseOffset) * 0.3 + 0.7;
    p.material.opacity = pulse;
  });

  renderer.render(scene, camera);
}
animate();

// --- 3D Card Tilt Effect ---
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
});

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
