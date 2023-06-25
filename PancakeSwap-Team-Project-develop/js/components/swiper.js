try {
  // select the swiper element
  const swiper = document.getElementById("swiper");
  // select all slide elements
  const swiperSlides = document.querySelectorAll("#swiper > .swiper-slide");
  // select all pagination bullet elements
  const swiperPagination = document.querySelectorAll(
    ".swiper-pagination > .swiper-pagination-bullet"
  );

  let counter = 0;
  let isMouseHover = false;

  // if all elements are rendered
  window.addEventListener("load", (e) => {
    // interval every 8 seconds
    setInterval(() => {
      // if mouse isn't over the swiper increase the counter else set it to 0
      !isMouseHover && counter < swiperPagination.length - 1
        ? counter++
        : (counter = 0);
      // simulate a click on the pagination element index of counter
      swiperPagination?.item(counter) && swiperPagination.item(counter).click();
    }, 8000);
  });

  // if mouse is hovering the swiper
  swiper.addEventListener("mouseenter", (e) => {
    // set isMouseHover to true
    isMouseHover = true;
  });

  // if mouse stops hovering the swiper
  swiper.addEventListener("mouseleave", (e) => {
    // set isMouseHover to false
    isMouseHover = false;
  });

  for (const key of swiperPagination.keys()) {
    swiperPagination.item(key).addEventListener("click", (e) => {
      const currentSlideKey = key;
      counter = key;
      swiperSlides.item(currentSlideKey).classList.add("active");
      for (const key1 of swiperSlides.keys()) {
        if (currentSlideKey !== key1) {
          swiperSlides.item(key1).classList.remove("active");

          setTimeout(() => {
            swiperSlides.item(key1).style.visibility = "hidden";
          }, 300);
        } else {
          swiperSlides.item(key1).style.visibility = "visible";
        }
      }
    });
  }
} catch (error) {
  console.warn("There is no Swiper in this page");
}
