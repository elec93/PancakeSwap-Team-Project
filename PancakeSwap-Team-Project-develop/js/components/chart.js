import MarketChart from "../models/MarketChart.js";
import { localColorScheme } from "../utils/handleColorScheme.js";
import { reduceData } from "../utils/algorithms.js";

import {
  formatAMPM,
  customDateFormat,
  monthName,
} from "../utils/customDateFormat.js";
import Coin from "../models/Coin.js";
import SwapPanel from "./SwapPanel.js";

const drawChart = async (tok, cur) => {
  try {
    const iconsEl = document.querySelectorAll(".swap-chart-header-icons > img");
    const icon1 = iconsEl.item(0);
    const icon2 = iconsEl.item(1);

    const coins = await Coin.find();
    const token = coins.find((coin) => coin.symbol === tok);
    const currency = coins.find((coin) => coin.symbol === cur);

    currency.image = await currency.image();
    token.image = await token.image();

    icon1.src = token.image;
    icon2.src = currency.image;

    const { createChart } = window.LightweightCharts;
    const chartEl = document.querySelector("#trade-chart");
    const headerTokensEl = document.querySelector(".swap-chart-header-tokens");
    const swapBtnEl = document.querySelectorAll(".swap-btn-swap");
    const swapZoomEl = document.querySelector(".swap-btn-zoom");
    const swapContainerEl = document.querySelector(".swap-container");
    const subHeaderDateEl = document.querySelector(
      ".swap-chart-subheader-date"
    );
    const subHeaderPriceEl = document.querySelector(
      ".swap-chart-subheader-price"
    );
    const subHeaderTokensEl = document.querySelector(
      ".swap-chart-subheader-tokens"
    );
    const subHeaderChangeEl = document.querySelector(
      ".swap-chart-subheader-change"
    );
    let isDark = localColorScheme === "dark" ? true : false;
    let isInverted = false;
    let days = 1;
    let interval = "hourly";

    let options = { days: 1, interval: "hourly" };

    const colors = {
      green: { gradient1: "#00E7B0", gradient2: "#0C8B6C", stroke: "#31D0AA" },
      pink: { gradient1: "#ED4B9E", gradient2: "#ED4B9E", stroke: "#ED4B9E " },
      text: { light: "#280d5f", dark: "#f4eeff" },
      background: { light: "#e9eaeb", dark: "#3c3742" },
      crosshair: { light: "#B8ADD2", dark: "#7A6EAA" },
      transparent: "transparent",
    };

    const chartOptions = {
      layout: {
        background: { color: colors.transparent },
        textColor: isDark ? colors.text.dark : colors.text.light,
      },
      handleScale: false,
      handleScroll: false,
      width: chartEl.parentElement.clientWidth - 32,
      height: chartEl.parentElement.clientHeight - 32,
      rightPriceScale: {
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
        borderVisible: false,
      },
      timeScale: {
        visible: true,
        borderVisible: false,
        secondsVisible: false,
        tickMarkFormatter: (unixTime) => {
          const date = new Date(unixTime * 1000);
          return formatAMPM(date).toUpperCase();
        },
      },
      grid: {
        horzLines: {
          visible: false,
        },
        vertLines: {
          visible: false,
        },
      },
      crosshair: {
        horzLine: {
          visible: true,
          labelVisible: true,
        },
        mode: 1,
        vertLine: {
          visible: true,
          labelVisible: false,
          style: 3,
          width: 1,
          color: isDark ? colors.crosshair.dark : colors.crosshair.light,
        },
      },
    };

    const chart = createChart(chartEl, chartOptions);

    const areaSeries = chart.addAreaSeries({
      lineWidth: 2,
      lineColor: colors.pink.gradient1,
      topColor: colors.pink.gradient1,
      bottomColor: isDark ? colors.background.dark : colors.background.light,
    });

    async function updateChart(isInverted, days = 1, interval = "hourly") {
      isDark = localColorScheme === "dark" ? true : false;
      let data = await MarketChart.find(
        token.id,
        currency.symbol.toUpperCase(),
        days,
        interval
      ).then((data) => {
        const newData = data.map((el) => {
          return { time: el[0], value: isInverted ? 1 / el[1] : el[1] };
        });

        if (isInverted) {
          icon2.src = token.image;
          icon1.src = currency.image;
        } else {
          icon1.src = token.image;
          icon2.src = currency.image;
        }
        isInverted
          ? SwapPanel.updatePanel(
              {
                image: currency.image,
                name: currency.symbol.toUpperCase(),
              },
              {
                image: token.image,
                name: token.symbol.toUpperCase(),
              },
              isInverted,
              newData[newData.length - 1].value,
              token.id,
              currency.id
            )
          : SwapPanel.updatePanel(
              {
                image: token.image,
                name: token.symbol.toUpperCase(),
              },
              {
                image: currency.image,
                name: currency.symbol.toUpperCase(),
              },
              isInverted,
              newData[newData.length - 1].value,
              token.id,
              currency.id
            );

        const headerTokensText = isInverted
          ? `${currency.symbol.toUpperCase()}/${token.symbol.toUpperCase()}`
          : `${token.symbol.toUpperCase()}/${currency.symbol.toUpperCase()}`;
        headerTokensEl.innerText = headerTokensText;

        const subHeaderTokensText = isInverted
          ? `${currency.symbol.toUpperCase()}/${token.symbol.toUpperCase()}`
          : `${token.symbol.toUpperCase()}/${currency.symbol.toUpperCase()}`;
        subHeaderTokensEl.innerText = subHeaderTokensText;
        if (days === 1) {
          chart.applyOptions({
            layout: {
              textColor: isDark ? colors.text.dark : colors.text.light,
            },
            timeScale: {
              visible: true,
              borderVisible: false,
              secondsVisible: false,
              tickMarkFormatter: (unixTime) => {
                const date = new Date(unixTime * 1000);
                return formatAMPM(date).toUpperCase();
              },
            },
            crosshair: {
              vertLine: {
                color: isDark ? colors.crosshair.dark : colors.crosshair.light,
              },
            },
          });
        } else if (days > 1) {
          chart.applyOptions({
            layout: {
              textColor: isDark ? colors.text.dark : colors.text.light,
            },
            timeScale: {
              visible: true,
              borderVisible: false,
              secondsVisible: false,
              tickMarkFormatter: (unixTime) => {
                const date = new Date(unixTime * 1000);
                return `${monthName(date.getMonth())} ${date.getDate()}`;
              },
            },
            crosshair: {
              vertLine: {
                color: isDark ? colors.crosshair.dark : colors.crosshair.light,
              },
            },
          });
          return reduceData(newData);
        }
        return newData;
      });

      const first = data[0].value;
      const last = data[data.length - 1].value;
      const difference = last - first;
      const diffString =
        difference == 0
          ? difference.toFixed(3)
          : difference > 0
          ? "+" + difference.toFixed(3)
          : difference.toFixed(3);
      const diffPercent = ((difference / last) * 100).toFixed(2);

      subHeaderChangeEl.style.color = diffString.includes("+")
        ? "#31d0aa"
        : colors.pink.gradient1;
      subHeaderChangeEl.innerText = `${diffString} (${diffPercent}%)`;
      subHeaderDateEl.innerText = customDateFormat(data[data.length - 1].time);
      subHeaderPriceEl.innerText =
        String(data[data.length - 1].value).split(".")[0].length > 1
          ? data[data.length - 1].value.toFixed(2)
          : data[data.length - 1].value.toFixed(5);

      areaSeries.setData(data);
      areaSeries.applyOptions({
        lineWidth: 2,
        lineColor: diffString.includes("+")
          ? colors.green.gradient1
          : colors.pink.gradient1,
        topColor: diffString.includes("+")
          ? colors.green.gradient1
          : colors.pink.gradient1,
        bottomColor: isDark ? colors.background.dark : colors.background.light,
      });

      chart.timeScale().fitContent();
    }

    updateChart(0, options.days, options.interval);

    // Event Listeners -----------------

    window.onresize = function () {
      chart.applyOptions({
        width: chartEl.parentElement.clientWidth - 32,
        height: chartEl.parentElement.clientHeight - 32,
      });
      chart.timeScale().fitContent();
    };

    await SwapPanel.init();

    swapBtnEl.forEach((btnSwap) => {
      btnSwap.addEventListener("click", (e) => {
        isInverted = !isInverted ? true : false;
        updateChart(isInverted, options.days, options.interval);
        chart.timeScale().fitContent();
      });
    });

    swapZoomEl.addEventListener("click", () => {
      swapContainerEl.classList.toggle("fullscreen");
      chart.applyOptions({
        width: chartEl.parentElement.clientWidth - 32,
        height: chartEl.parentElement.clientHeight - 32,
      });
      chart.timeScale().fitContent();
    });

    chart.subscribeCrosshairMove((param) => {
      const lastItem = areaSeries.dataByIndex(24, -1);
      const { time: lastTime, value: lastValue } = lastItem;
      const currentValue = param.seriesData.get(areaSeries)?.value;
      const currentTime = param.seriesData.get(areaSeries)?.time;
      const decimalPlaces =
        String(currentValue || lastValue).split(".")[0].length > 1 ? 2 : 5;
      const date =
        (currentTime && customDateFormat(currentTime, true)) ||
        customDateFormat(lastTime);
      const price = (currentValue || lastValue).toFixed(decimalPlaces);
      subHeaderDateEl.innerText = date;
      subHeaderPriceEl.innerText = price;
    });

    // Get the button elements
    const buttons = document.querySelectorAll(
      ".swap-chart-subheader-selector-content button"
    );

    // Add an event listener to each button
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove the "active" class from all buttons
        buttons.forEach((btn) => btn.classList.remove("active"));

        // Add the "active" class to the clicked button
        button.classList.add("active");

        if (button.textContent === "24H") {
          options = {
            days: 1,
            interval: "hourly",
          };
        } else if (button.textContent === "1W") {
          options = {
            days: 7,
            interval: "hourly",
          };
        } else if (button.textContent === "1M") {
          options = {
            days: 30,
            interval: "hourly",
          };
        } else if (button.textContent === "1Y") {
          options = {
            days: 365,
            interval: "daily",
          };
        }

        days = options.days;
        interval = options.interval;
        updateChart(isInverted, options.days, options.interval);
        chart.timeScale().fitContent();
      });
    });

    const button = document.querySelector(".color-scheme-switcher");

    button.addEventListener("click", () => {
      isDark = isDark ? false : true;
      updateChart(isInverted, days, interval);
      chart.timeScale().fitContent();
    });
  } catch (error) {
    console.warn("There is no chart element in the page");
  }
};

export default drawChart;
