import Coin from "./Coin.js";

export default class TargetCoin extends Coin {
  constructor() {
    super("btnTargetCollection", ".target", "target");
    this.selectedCoin = null;
  }

  createTargetLink(anchor) {
    this.selectedButton = document.querySelector(
      `${this.buttonSelector}.border-primary`
    );
    if (this.selectedButton) {
      const data_target = this.selectedButton.dataset.currency;
      this.selectedCoin = data_target;
      let currentHref = anchor.getAttribute("href");
      currentHref = currentHref.replace(/&target=[^&]*/, "");
      currentHref += `&target=${data_target}`;
      anchor.setAttribute("href", currentHref);
      this.anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const href = this.anchor.getAttribute("href");
        window.location.href = href;
      });
    }
  }
  disableSameCoinButton() {
    const targetButtons = document.querySelectorAll(".base");

    targetButtons.forEach((targetButton) => {
      if (targetButton.dataset.currency === this.selectedCoin) {
        targetButton.disabled = true;
      } else {
        targetButton.disabled = false;
      }
    });
  }
}
