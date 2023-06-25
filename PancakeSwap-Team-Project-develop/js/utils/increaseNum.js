/**
 *
 * @param {NodeListOf<Element>} elements array di elementi HTML che contengono solo numeri come children
 */
export function increaseNum(elements) {
  try {
    elements.forEach((element) => {
      let counter = 0;
      const currentNum = Number(element.innerHTML.replace(",", ""));
      const interval = setInterval(() => {
        if (counter < currentNum) {
          counter += currentNum / 300;
          element.innerHTML = counter.toFixed(3);
        } else {
          clearInterval(interval);
        }
      }, 3);
    });
  } catch (error) {
    console.error(error);
  }
}

/**
 *
 * @param {NodeListOf<Element>} elements array di elementi HTML che contengono solo numeri come children
 */
export function increaseNumWithCommas(elements) {
  try {
    elements.forEach((element) => {
      let val = element.innerHTML.replace(/[\,]/g, "");
      let counter = 0;
      const currentNum = Number(val);
      const interval = setInterval(() => {
        if (counter < currentNum) {
          counter += currentNum / 240;
          element.innerHTML = Number(counter.toFixed(0)).toLocaleString(
            "en-US"
          );
        } else {
          clearInterval(interval);
        }
      }, 3);
    });
  } catch (error) {
    console.error(error);
  }
}
