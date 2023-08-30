const btn = document.getElementById("button");
const sectionAll = document.querySelectorAll("section[id]");
const inputName = document.querySelector("#nombre");
const inputEmail = document.querySelector("#email");

/* ===== Loader =====*/
window.addEventListener("load", () => {
  const contenedorLoader = document.querySelector(".container--loader");
  contenedorLoader.style.opacity = 0;
  contenedorLoader.style.visibility = "hidden";
});

/*===== Switch Lenguaje =====*/
const textsToChange = document.querySelectorAll("[data-section]");

const changeLanguage = async (language) => {
  const requestJson = await fetch(`./languages/${language}.json`);
  const texts = await requestJson.json();

  for (let textToChange of textsToChange) {
    const section = textToChange.dataset.section;
    const value = textToChange.dataset.value;

    textToChange.innerHTML = texts[section][value];
  }
};

document.addEventListener("DOMContentLoaded", () => {
  changeLanguage("en");

  const languageLabels = document.querySelectorAll(".language-label");

  languageLabels.forEach((label) => {
    label.addEventListener("click", (e) => {
      const language = label.dataset.language;
      if (language) {
        changeLanguage(language);
      }
    });
  });
});

/*===== Header =====*/
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("abajo", window.scrollY > 0);
});

/*===== Boton Menu =====*/
btn.addEventListener("click", function () {
  if (this.classList.contains("active")) {
    this.classList.remove("active");
    this.classList.add("not-active");
    document.querySelector(".nav_menu").classList.remove("active");
    document.querySelector(".nav_menu").classList.add("not-active");
  } else {
    this.classList.add("active");
    this.classList.remove("not-active");
    document.querySelector(".nav_menu").classList.remove("not-active");
    document.querySelector(".nav_menu").classList.add("active");
  }
});

/*===== Cerrar el menú al hacer clic en un ítem =====*/
document.querySelectorAll(".nav_menu a").forEach((item) => {
  item.addEventListener("click", () => {
    btn.classList.remove("active");
    btn.classList.add("not-active");
    document.querySelector(".nav_menu").classList.remove("active");
    document.querySelector(".nav_menu").classList.add("not-active");
  });
});

/*===== class active por secciones =====*/
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  sectionAll.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY < sectionTop + sectionHeight) {
      document
        .querySelector("nav a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector("nav a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
});

/*===== Boton y función ir arriba =====*/
window.onscroll = function () {
  if (document.documentElement.scrollTop > 100) {
    document.querySelector(".go-top-container").classList.add("show");
  } else {
    document.querySelector(".go-top-container").classList.remove("show");
  }
};

document.querySelector(".go-top-container").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/*===== Switch Modo claro/oscuro =====*/
const preferedColorScheme = window.matchMedia("(prefers-color-scheme: dark)")
  .matches
  ? "dark"
  : "light";

const slider = document.getElementById("slider");
const icon = document.querySelector(".slider:before");
const sunImage = document.querySelector(".image-light");
const moonImage = document.querySelector(".image-dark");

const setTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  if (theme === "dark") {
    sunImage.style.opacity = 0;
    moonImage.style.opacity = 1;
  } else {
    sunImage.style.opacity = 1;
    moonImage.style.opacity = 0;
  }

  if (theme === "dark") {
    icon.style.content = "url('./assets/images/light-ico.png')";
  } else {
    icon.style.content = "url('./assets/images/dark-ico.png')";
  }
};

slider.addEventListener("click", () => {
  let switchToTheme =
    localStorage.getItem("theme") === "dark" ? "light" : "dark";
  setTheme(switchToTheme);
});

setTheme(localStorage.getItem("theme") || preferedColorScheme);
