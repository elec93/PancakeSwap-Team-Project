let currentColorScheme = null;
export let localColorScheme = localStorage.getItem("colorScheme");
let root = document.querySelector(":root");
let body = document.querySelector("body");
const buttons = document.querySelectorAll(".color-scheme-switcher:not(.preserve)");
const bubbles = document.querySelectorAll(
  ".color-scheme-switcher:not(.preserve) .color-scheme-switcher-bubble"
);

const darkIcon = document.querySelector(".color-scheme-switcher .dark-icon");
const lightIcon = document.querySelector(".color-scheme-switcher .light-icon");

// button.innerHTML = "Dark Mode";

if (localColorScheme == "dark") {
  root.classList.add("dark");
  // button.innerHTML = "Light Mode";
  bubbles.forEach((bubble) => {
    bubble.classList.add("dark");
  });
  darkIcon.style.display = "flex";
  lightIcon.style.display = "none";
} else {
  localStorage.setItem("colorScheme", "light");
  localColorScheme = "light";
  darkIcon.style.display = "none";
  lightIcon.style.display = "flex";
}

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches &&
  !currentColorScheme &&
  !localColorScheme
) {
  root.classList.remove("dark");
  // button.innerHTML = "Light Mode";
  bubbles.forEach((bubble) => {
    bubble.classList.remove("dark");
  });
  darkIcon.style.display = "none";
  lightIcon.style.display = "flex";
} else if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches &&
  !currentColorScheme &&
  !localColorScheme
) {
  // button.innerHTML = "Dark Mode";
  bubbles.forEach((bubble) => {
    bubble.classList.add("dark");
  });
  darkIcon.style.display = "flex";
  lightIcon.style.display = "none";
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    if (event.matches && !currentColorScheme) {
      root.classList.add("dark");
      // button.innerHTML = "Light Mode";
      bubbles.forEach((bubble) => {
        bubble.classList.add("dark");
      });
      darkIcon.style.display = "flex";
      lightIcon.style.display = "none";
    } else if (!event.matches && !currentColorScheme) {
      root.classList.remove("dark");
      // button.innerHTML = "Dark Mode";
      bubbles.forEach((bubble) => {
        bubble.classList.remove("dark");
      });
      darkIcon.style.display = "none";
      lightIcon.style.display = "flex";
    }
  });

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    root.classList.toggle("dark");
    if (root.classList.contains("dark")) {
      // button.innerHTML = "Light Mode";
      bubbles.forEach((bubble) => {
        bubble.classList.add("dark");
      });
      darkIcon.style.display = "flex";
      lightIcon.style.display = "none";
      currentColorScheme = "dark";
      localColorScheme = "dark";
      localStorage.setItem("colorScheme", "dark");
    } else {
      // button.innerHTML = "Dark Mode";
      bubbles.forEach((bubble) => {
        bubble.classList.remove("dark");
      });
      darkIcon.style.display = "none";
      lightIcon.style.display = "flex";
      currentColorScheme = "light";
      localColorScheme = "light";
      localStorage.setItem("colorScheme", "light");
    }
  });
});
