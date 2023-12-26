import FetchWrapper from "./FetchWrapper.js";

export default class Coin {
  constructor(collection, buttonSelector, targetQueryParam) {
    this.collection = document.querySelector(`#${collection}`);
    this.buttonSelector = buttonSelector;
    this.targetQueryParam = targetQueryParam;
    this.API = new FetchWrapper("https://v6.exchangerate-api.com/");
    this.anchor = document.querySelector("#trackCambio");
  }

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

  displayCoin() {
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

    this.API.get("v6/212126da48160a23b540cb68/codes")
      .then((data) => {
        let buttonsHTML = "";

        data.supported_codes.forEach((element) => {
          const currencyCode = element[0];

          const currencybicode = currencyCode.substring(0, 2).toLowerCase();
          console.log(currencybicode);

          if (desiredCurrencies.includes(currencyCode)) {
            buttonsHTML += `<button
                          type="button"
                          class="btn ${this.targetQueryParam} coin d-flex align-items-center justify-content-center gap-1"
                          href=""
                          style="background-color: white; width: 130px; height: 80px; overflow: hidden"
                          data-currency="${currencyCode}"
                      ><img src="https://flagcdn.com/28x21/${currencybicode}.png">
                          ${currencyCode}
                      </button>`;
          }
        });

        if (this.collection) {
          this.collection.innerHTML = buttonsHTML;

          this.selectCoin();
        } else {
          console.log("Error: #btnBaseCollection element not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  hasSelection() {
    const selectedButton = this.collection.querySelector(
      `${this.buttonSelector}.border-primary`
    );
    return !!selectedButton;
  }
}
