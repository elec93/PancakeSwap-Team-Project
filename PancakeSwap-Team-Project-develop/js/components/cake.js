import { increaseNumWithCommas } from "../utils/increaseNum.js";
import isElementVisible from "../utils/isElementVisible.js";

const cakeStats = document.querySelectorAll(".cake-stats-item-value > span");
const cakeStatsElement = document.querySelector(".cake-stats");

function cakeScrollHandler() {
  if (isElementVisible(cakeStatsElement)) {
    increaseNumWithCommas(cakeStats);
    window.removeEventListener("scroll", cakeScrollHandler);
  }
}
window.addEventListener("scroll", cakeScrollHandler);
