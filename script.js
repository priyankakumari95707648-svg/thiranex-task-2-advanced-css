const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.getElementById("nav-menu");
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") root.dataset.theme = "dark";

function updateThemeButton() {
  const dark = root.dataset.theme === "dark";
  themeToggle.textContent = dark ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
}

themeToggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("portfolio-theme", root.dataset.theme);
  updateThemeButton();
});

updateThemeButton();

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  menuToggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
  navMenu.classList.toggle("open", !expanded);
});

document.querySelectorAll("#nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

function setError(field, message) {
  const error = document.querySelector(`[data-error-for="${field.id}"]`);
  error.textContent = message;
  field.setAttribute("aria-invalid", message ? "true" : "false");
}

form.addEventListener("submit", event => {
  event.preventDefault();
  status.textContent = "";

  const name = form.name;
  const email = form.email;
  const message = form.message;
  let valid = true;

  if (!name.value.trim()) { setError(name, "Please enter your name."); valid = false; }
  else setError(name, "");

  if (!email.value.trim() || !email.validity.valid) { setError(email, "Please enter a valid email."); valid = false; }
  else setError(email, "");

  if (!message.value.trim() || message.value.trim().length < 10) { setError(message, "Please enter at least 10 characters."); valid = false; }
  else setError(message, "");

  if (valid) {
    status.textContent = "Thank you! Your message has been validated successfully.";
    form.reset();
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
