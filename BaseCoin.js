import Coin from "./Coin.js";

export default class BaseCoin extends Coin {
  constructor() {
    super("btnBaseCollection", ".base", "base");
    this.selectedCoin = null;
  }
  createBaseLink(anchor) {
    this.selectedBaseButton = document.querySelector(
      `${this.buttonSelector}.border-primary`
    );
    if (this.selectedBaseButton) {
      console.log(this.selectedBaseButton);
      const data_base = this.selectedBaseButton.dataset.currency;
      this.selectedCoin = data_base;
      console.log(data_base);
      console.log(this.selectedBaseButton);

      const currentHref = anchor.getAttribute("href");
      const targetQueryPara = currentHref.match(/&target=([^&]*)/);
      const targetValue = targetQueryPara ? targetQueryPara[1] : "";

      anchor.setAttribute(
        "href",
        `./results.html?base=${data_base}&target=${targetValue}`
      );
      this.anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const href = this.anchor.getAttribute("href");
        window.location.href = href;
      });
    }
  }

  disableSameCoinButton() {
    const targetButtons = document.querySelectorAll(".target");

    targetButtons.forEach((targetButton) => {
      if (targetButton.dataset.currency === this.selectedCoin) {
        targetButton.disabled = true;
      } else {
        targetButton.disabled = false;
      }
    });
  }
}
