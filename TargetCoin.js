import Coin from "./Coin.js";
/**
 * Classe que personaliza a classe Coin para funcionalidades exclusivas
 * @class
 */
export default class TargetCoin extends Coin {
  constructor() {
    super("btnTargetCollection", ".target", "target");
    this.selectedCoin = null;
  }
  /**
   * Usando expresão regular, cria a segunda parte do link que leva à pagina results
   * e contém os parâmetros necessários para a conversão.
   * @method
   * @param {string} anchor
   */
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
  /**
   * Desabilita a seleção do botão da coleção base que for igual ao selecionado na target
   * @method
   */
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
