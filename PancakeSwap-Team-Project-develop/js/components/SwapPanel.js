import CoinGecko from "../services/CoinGecko.js";
/**
 * The SwapPanel class represents the swap panel. It retrieves current prices
 * for tokens from an API and updates the input values and labels accordingly.
 */
export default class SwapPanel {
  static #chart = document.querySelector(".swap-chart-container");
  static #toggleChart = document.querySelector("#toggle-chart");
  static #toggleChartIcon = document.querySelectorAll("#toggle-chart > svg");
  static #toggleChartIconInChart = document.querySelector(".swap-close-btn");
  static #overlay = document.querySelector(".swap-overlay");
  // static #overlaySmall = document.querySelector(".swap-overlay-small");
  static #lastPrice = 0;
  static #isInverted = false;
  static #tokenId = "cake";
  static #currencyId = "bnb";
  static #prices = null;
  static #tokenImages = document.querySelectorAll(
    ".swap-panel-currency-selector .swap-panel-token-image > img"
  );
  static #tokenNames = document.querySelectorAll(
    ".swap-panel-currency-selector .swap-panel-token-name"
  );
  static #inputs = document.querySelectorAll(".swap-panel-currency-form-input");
  static #labels = document.querySelectorAll(
    ".swap-panel-currency-form-input-sub"
  );

  static #showOverlay = false;

  /**
   * Initializes the swap panel by adding event listeners, etc.
   * @returns {Promise<void>}
   */
  static async init() {
    this.#toggleChart.addEventListener("click", () => this.#toggle());
    this.#toggleChartIconInChart.addEventListener("click", () =>
      this.#toggle()
    );

    const [input1, input2] = this.#inputs;

    input1.addEventListener(
      "input",
      async (e) => await this.#handleInput(e.target, 0, this.#isInverted)
    );

    input2.addEventListener(
      "input",
      async (e) => await this.#handleInput(e.target, 1, !this.#isInverted)
    );

    if (window.innerWidth >= 968) {
      this.#overlay.classList.remove("visible");
    } else {
      if (this.#chart.classList.contains("hidden")) {
        this.#overlay.classList.remove("visible");
      } else {
        this.#overlay.classList.add("visible");
      }
    }

    window.addEventListener("resize", (e) => {
      if (window.innerWidth >= 968) {
        this.#overlay.classList.remove("visible");
      } else {
        if (this.#chart.classList.contains("hidden")) {
          this.#overlay.classList.remove("visible");
        } else {
          this.#overlay.classList.add("visible");
        }
      }
    });
  }

  static #toggle() {
    const [token1Image, token2Image] = this.#toggleChartIcon;
    if (!token1Image.classList.contains("hidden")) {
      token1Image.classList.add("hidden");
      token2Image.classList.remove("hidden");
      this.#chart.classList.add("hidden");
    } else {
      token1Image.classList.remove("hidden");
      token2Image.classList.add("hidden");
      this.#chart.classList.remove("hidden");
    }

    if (window.innerWidth >= 968) {
      this.#overlay.classList.remove("visible");
    } else {
      if (this.#chart.classList.contains("hidden")) {
        this.#overlay.classList.remove("visible");
      } else {
        this.#overlay.classList.add("visible");
      }
    }
  }

  static async #handleInput(input, inputId, isInverted) {
    // get current prices in USD from the API
    this.#prices = await this.#getPricesInUSD();
    // check if the input value is a correct numeric value
    input.value = this.#checkInputValue(input.value);

    // add usd price to each label
    this.#labels.forEach((label) => {
      label.innerHTML = `~${(
        Number(input.value) *
        Number(this.#prices[!isInverted ? this.#tokenId : this.#currencyId].usd)
      ).toFixed(2)} USD`;
    });

    // cast input value to number
    const inputValue = Number(input.value);

    const newVal =
      inputId === 0
        ? inputValue * Number(this.#lastPrice)
        : inputValue * (1 / Number(this.#lastPrice));
    const inputToUpdate = inputId === 0 ? 1 : 0;

    this.#inputs.item(inputToUpdate).value =
      newVal.toString()[1] === "."
        ? newVal.toFixed(7).slice(0, 7)
        : newVal.toFixed(2);
  }

  static #checkInputValue(value) {
    const valueCheck =
      value.match(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/g) || [];
    return valueCheck[0] || value.slice(0, -1);
  }

  static async #getPricesInUSD() {
    const data = await CoinGecko.query("simple/price", {
      ids: this.#currencyId + "," + this.#tokenId,
      vs_currencies: "usd",
    });
    return await data;
  }

  /**
   * Updates the swap panel with new token and price data.
   *
   * @param {Object} token1 - The first token data.
   * @param {Object} token2 - The second token data.
   * @param {boolean} isInverted - Whether the token pair is inverted or not.
   * @param {number} lastPrice - The last traded price of the token pair.
   * @param {string} token1Id - The ID of the token being traded.
   * @param {string} token2Id - The ID of the token being traded against.
   */
  static updatePanel(
    token1,
    token2,
    isInverted,
    lastPrice,
    token1Id,
    token2Id
  ) {
    this.#tokenId = token1Id;
    this.#currencyId = token2Id;
    this.#lastPrice = lastPrice;
    this.#isInverted = isInverted;
    this.#tokenImages.item(0).src = token1.image;
    this.#tokenImages.item(1).src = token2.image;
    this.#tokenNames.item(0).innerHTML = token1.name;
    this.#tokenNames.item(1).innerHTML = token2.name;

    const [input1, input2] = this.#inputs;
    const i1val = input1.value;
    const i2val = input2.value;
    input1.value = i2val;
    input2.value = i1val;

    const [label1, label2] = this.#inputs;
    const lab1 = label1.innerHTML;
    const lab2 = label2.innerHTML;
    label1.innerHTML = lab2;
    label2.innerHTML = lab1;
  }
}
