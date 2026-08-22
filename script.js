const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const roles = ["Web Developer", "UI/UX Designer", "System Developer", "Creative Builder"];
let roleIndex = 0, charIndex = 0, deleting = false;
const typing = document.getElementById("typing");

function typeRole() {
  const current = roles[roleIndex];
  typing.textContent = deleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let speed = deleting ? 55 : 90;
  if (!deleting && charIndex > current.length) {
    deleting = true;
    speed = 1200;
  } else if (deleting && charIndex < 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    charIndex = 0;
    speed = 300;
  }
  setTimeout(typeRole, speed);
}
typeRole();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, {threshold: 0.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const output = document.getElementById("formMessage");

  const subject = encodeURIComponent("Portfolio inquiry from " + name);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:your@email.com?subject=${subject}&body=${body}`;
  output.textContent = "Opening your email app...";
});
