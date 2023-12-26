<<<<<<< HEAD
import BaseCoin from "./BaseCoin.js";
import TargetCoin from "./TargetCoin.js";
import Result from "./Result.js";
const anchor = document.querySelector("#trackCambio");
const amount = document.querySelector("#amount");
const resp1 = document.querySelector("#resp1");
const resp2 = document.querySelector("#resp2");

if (anchor) {
  const baseCoin = new BaseCoin();
  const targetCoin = new TargetCoin();
  baseCoin.displayCoin();
  targetCoin.displayCoin();

  document.addEventListener("click", (event) => {
    const clickedElement = event.target;

    if (baseCoin.hasSelection() && targetCoin.hasSelection()) {
      anchor.classList.remove("disabled");
    } else {
      anchor.classList.add("disabled");
    }

    if (clickedElement.classList.contains("base")) {
      baseCoin.createBaseLink(anchor);
      baseCoin.disableSameCoinButton();
    } else if (clickedElement.classList.contains("target")) {
      targetCoin.createTargetLink(anchor);
      targetCoin.disableSameCoinButton();
    }
  });
}

if (amount) {
  let isReverted = false;
  const result = new Result();
  const form = document.querySelector("#frm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  result.params = ["base", "target"];
  result.displayButtonsResult(result.params[0], result.params[1]);

  amount.addEventListener("keyup", () => {
    result.handleKeyup(result.params[0], result.params[1]);
  });

  const coinDisplay = document.querySelector("#coinDisplay");

  coinDisplay.addEventListener("click", (event) => {
    console.log("Click event triggered");

    if (event.target.classList.contains("coin")) {
      console.log("Coin clicked");

      isReverted = !isReverted;

      if (isReverted) {
        result.params = ["target", "base"];
      } else {
        result.params = ["base", "target"];
      }

      result.displayButtonsResult(result.params[0], result.params[1]);
      amount.value = "";
      resp1.textContent = "";
      resp2.textContent = "";
    }
  });
}
=======
import BaseCoin from "./BaseCoin.js";
import TargetCoin from "./TargetCoin.js";
import Result from "./Result.js";
const anchor = document.querySelector("#trackCambio");
const amount = document.querySelector("#amount");
const resp1 = document.querySelector("#resp1");
const resp2 = document.querySelector("#resp2");

if (anchor) {
  const baseCoin = new BaseCoin();
  const targetCoin = new TargetCoin();
  baseCoin.displayCoin();
  targetCoin.displayCoin();

  document.addEventListener("click", (event) => {
    const clickedElement = event.target;

    if (baseCoin.hasSelection() && targetCoin.hasSelection()) {
      anchor.classList.remove("disabled");
    } else {
      anchor.classList.add("disabled");
    }

    if (clickedElement.classList.contains("base")) {
      baseCoin.createBaseLink(anchor);
      baseCoin.disableSameCoinButton();
    } else if (clickedElement.classList.contains("target")) {
      targetCoin.createTargetLink(anchor);
      targetCoin.disableSameCoinButton();
    }
  });
}

if (amount) {
  let isReverted = false;
  const result = new Result();
  const form = document.querySelector("#frm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  result.params = ["base", "target"];
  result.displayButtonsResult(result.params[0], result.params[1]);

  amount.addEventListener("keyup", () => {
    result.handleKeyup(result.params[0], result.params[1]);
  });

  const coinDisplay = document.querySelector("#coinDisplay");

  coinDisplay.addEventListener("click", (event) => {
    console.log("Click event triggered");

    if (event.target.classList.contains("coin")) {
      console.log("Coin clicked");

      isReverted = !isReverted;

      if (isReverted) {
        result.params = ["target", "base"];
      } else {
        result.params = ["base", "target"];
      }

      result.displayButtonsResult(result.params[0], result.params[1]);
      amount.value = "";
      resp1.textContent = "";
      resp2.textContent = "";
    }
  });
}
>>>>>>> 7814d0eb5a4ec241b17d574d5178c413d1e93077
