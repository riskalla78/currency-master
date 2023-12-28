import FetchWrapper from "./FetchWrapper.js";
/**
 * Classe responsáveis por selecionar e renderizar as moedas na página index
 * @class
 * @param {string}collection
 * @param {string}buttonSelector
 * @param {string}targetQueryParam
 *
 */
export default class Coin {
  constructor(collection, buttonSelector, targetQueryParam) {
    this.collection = document.querySelector(`#${collection}`);
    this.buttonSelector = buttonSelector;
    this.targetQueryParam = targetQueryParam;
    this.API = new FetchWrapper("https://v6.exchangerate-api.com/");
    this.anchor = document.querySelector("#trackCambio");
  }
  /**
   * Função que seleciona a moeda, adicionando a ela uma borda quando estiver selecionada
   * @method
   *
   */
  selectCoin() {
    if (this.collection) {
      this.collection.addEventListener("click", (e) => {
        e.preventDefault();
        const targetButton = e.target.closest(`${this.buttonSelector}`);

        if (targetButton) {
          for (const otherButton of this.collection.querySelectorAll(
            `${this.buttonSelector}`
          )) {
            if (otherButton !== targetButton) {
              otherButton.classList.remove("border-primary");
            }
          }

          targetButton.classList.add("border-primary");
        }
        const selectedButton = document.querySelector(
          `${this.buttonSelector}.border-primary`
        );
      });
    } else {
      console.log("Error: Collection element not found");
    }
  }
  /**
   * Renderiza as moedas obtidas através da API Exchange Rate
   * @method
   */
  displayCoin() {
    //Array que recebe os códigos das moedas que serão obtidas na requisição
    const desiredCurrencies = [
      "USD",
      "EUR",
      "GBP",
      "ARS",
      "BRL",
      "AUD",
      "BOB",
      "CNY",
      "INR",
      "JPY",
      "RUB",
      "UAH",
      "ILS",
      "UYU",
      "MXN",
      "SAR",
    ];
    //Faz a requisição e cria botões dinâmicamente na página indexz
    this.API.get("v6/212126da48160a23b540cb68/codes")
      .then((data) => {
        let buttonsHTML = "";

        data.supported_codes.forEach((element) => {
          const currencyCode = element[0];

          //Converte o código da moeda para código de duas letras, a ser utilizado para receber as bandeiras da flagcdn
          const currencybicode = currencyCode.substring(0, 2).toLowerCase();
          console.log(currencybicode);

          if (desiredCurrencies.includes(currencyCode)) {
            buttonsHTML += `<button
                          type="button"
                          class="btn ${this.targetQueryParam} coin d-flex align-items-center justify-content-center gap-1"
                          href=""
                          style="background-color: white; width: 130px; height: 80px; overflow: hidden"
                          data-currency="${currencyCode}
                      ><img src="https://flagcdn.com/28x21/${currencybicode}.png">
                          ${currencyCode}
                      </button>`;
          }
        });

        if (this.collection) {
          this.collection.innerHTML = buttonsHTML;
          //Chama a função selecCoin para atuar sobre os botões criados dinâmicamente.
          this.selectCoin();
        } else {
          console.log("Error: #btnBaseCollection element not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  /**
   * Retorna true se o botão está selecionado
   * @method
   * @returns {boolean}
   */
  hasSelection() {
    const selectedButton = this.collection.querySelector(
      `${this.buttonSelector}.border-primary`
    );
    return !!selectedButton;
  }
}
