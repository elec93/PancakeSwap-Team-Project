import { increaseNumWithCommas } from "../utils/increaseNum.js";
import isElementVisible from "../utils/isElementVisible.js";

const span = document.querySelector("#win-section-span");

function winScrollHandler() {
  if (isElementVisible(span)) {
    increaseNumWithCommas([span]);
    window.removeEventListener("scroll", winScrollHandler);
  }
}
window.addEventListener("scroll", winScrollHandler);
