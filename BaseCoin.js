import Coin from "./Coin.js";

/**
 * Classe que personaliza a classe Coin para funcionalidades exclusivas
 * @class
 */
export default class BaseCoin extends Coin {
  constructor() {
    super("btnBaseCollection", ".base", "base");
    this.selectedCoin = null;
  }
  /**
   * Usando expresão regular, cria a primeira parte do link que leva à pagina results
   * e contém os parâmetros necessários para a conversão.
   * @method
   * @param {string} anchor
   */
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

      //Recebe o href do botão anchor e o altera
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

  /**
   * Desabilita a seleção do botão da coleção target que for igual ao selecionado na base
   * @method
   */
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
