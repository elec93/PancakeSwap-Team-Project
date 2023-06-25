const connectModalBtn = document.querySelectorAll(".connect-wallet");
const connectModal = document.querySelector("#connect-modal");
const main = document.querySelector("main");
try {
  connectModalBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      connectModal.classList.toggle("active");
      if (connectModal.classList.contains("active")) {
        main.style.zIndex = "-1";
      } else {
        main.style.zIndex = "95";
      }
    });
  });

  connectModal.addEventListener("click", (e) => {
    if (e.target === connectModal) connectModal.classList.toggle("active");

    if (connectModal.classList.contains("active")) {
      main.style.zIndex = "-1";
    } else {
      main.style.zIndex = "95";

    }
  });

  const headerBtn1 = document.querySelector(
    ".connect-modal-header button:nth-child(1)"
  );
  const headerBtn2 = document.querySelector(
    ".connect-modal-header button:nth-child(2)"
  );
  const tab1 = document.querySelector(".connect-modal-tab1");
  const tab2 = document.querySelector(".connect-modal-tab2");

  headerBtn1.addEventListener("click", () => {
    headerBtn1.classList.add("active");
    headerBtn2.classList.remove("active");
    tab1.style.display = "flex";
    tab2.style.display = "none";
  });

  headerBtn2.addEventListener("click", () => {
    headerBtn1.classList.remove("active");
    headerBtn2.classList.add("active");
    tab1.style.display = "none";
    tab2.style.display = "flex";
  });

  const page1 = document.querySelector(".connect-swiper-page-1");
  const page2 = document.querySelector(".connect-swiper-page-2");
  const slides = document.querySelectorAll(".connect-swiper-slide");
  const slide1 = slides.item(0);
  const slide2 = slides.item(1);

  page1.addEventListener("click", () => {
    slide1.style.translate = "0px 0px";
    slide2.style.translate = "100% 0px";
    page1.classList.add("active");
    page2.classList.remove("active");
  });
  page2.addEventListener("click", () => {
    slide1.style.translate = "-100% 0px";
    slide2.style.translate = "-100% 0px";
    page2.classList.add("active");
    page1.classList.remove("active");
  });

  setInterval(() => {
    if (page1.classList.contains("active")) {
      page2.click();
    } else {
      page1.click();
    }
  }, 5000);
} catch (error) {
  console.warn("there is no connect modal in this page");
}
