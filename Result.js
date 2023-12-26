import FetchWrapper from "./FetchWrapper.js";
export default class Result {
  constructor() {
    this.API = new FetchWrapper("https://v6.exchangerate-api.com/");
    this.isReversed = false;
  }

  displayButtonsResult(bas, targ) {
    const coinDisplay = document.querySelector("#coinDisplay");
    const url = new URL(document.location);
    const base = url.searchParams.get(bas);
    const target = url.searchParams.get(targ);
    const basebicode = base.substring(0, 2).toLowerCase();
    const targetbicode = target.substring(0, 2).toLowerCase();

    if (base && target !== null) {
      this.API.get("v6/212126da48160a23b540cb68/codes").then((data) => {
        const baseCurrency = data.supported_codes.find(
          (currency) => currency[0] === base
        );
        const targetCurrency = data.supported_codes.find(
          (currency) => currency[0] === target
        );

        if (baseCurrency && targetCurrency) {
          coinDisplay.innerHTML = `<button
                id="baseResult"
                style="background-color: white; width: 400px; height: 50px; overflow: hidden"
                class="btn btn-lg py-2 px-5 rounded-pill d-flex align-items-center justify-content-center gap-3"
              ><img src="https://flagcdn.com/48x36/${basebicode}.png"> ${base} - ${baseCurrency[1]}</button>
              <button
                id="change"
                style="background-color: white"
                class="btn btn-lg  border rounded rounded-pill"
               
              >
                <i class="bi coin bi-arrow-left-right"></i>
              </button>
              <button
                id="targetResult"
                style="background-color: white; width: 400px; height: 50px; overflow: hidden"
                class="btn btn-lg py-2 px-5 rounded-pill d-flex align-items-center justify-content-center gap-3"
              >
              <img src="https://flagcdn.com/48x36/${targetbicode}.png"> ${target} - ${targetCurrency[1]}
              </button>`;
        }
      });
    }
  }

  handleKeyup(bas, targ) {
    const amountInput = document.querySelector("#amount");
    const url = new URL(document.location);
    const base = url.searchParams.get(bas);
    const target = url.searchParams.get(targ);

    this.API.get(
      `v6/212126da48160a23b540cb68/pair/${base}/${target}/${amountInput.value}`
    )
      .then((data) => {
        const resp1 = document.querySelector("#resp1");
        const resp2 = document.querySelector("#resp2");
        const resp3 = document.querySelector("#respAtua");
        const amountValue = parseFloat(amountInput.value);

        if (
          data &&
          data.base_code &&
          data.conversion_result &&
          data.target_code
        ) {
          resp1.textContent = `${amountValue
            .toFixed(2)
            .toString()
            .replace(".", ",")} ${data.base_code}=`;
          resp2.textContent = `${data.conversion_result
            .toFixed(2)
            .toString()
            .replace(".", ",")} ${data.target_code}`;
        }
        if (amountInput.value.trim() === "") {
          resp1.textContent = "";
          resp2.textContent = "Por favor digite uma quantia aceita.";
          return;
        }

        if (isNaN(amountValue) || amountValue <= 0) {
          resp1.textContent = "";
          resp2.textContent = "Por favor digite uma quantia aceita.";
          return;
        }
        resp3.textContent = `Última atualização no dia ${this.#converterData(
          data.time_last_update_utc
        )}.`;

        console.log(resp1.textContent);
        console.log(resp2.textContent);
      })
      .catch((error) => {
        console.error("Error ao carregar a página, tente novamente.");
        const resp1 = document.querySelector("#resp1");
        const resp2 = document.querySelector("#resp2");
        const resp3 = document.querySelector("#respAtua");
        resp1.textContent = "";
        resp2.textContent = "";
        resp3.textContent = "";
      });
  }

  #converterData(dataOriginal) {
    const data = new Date(dataOriginal);

    const dia = data.getDate();
    const mes = data.toLocaleString("pt-BR", { month: "long" });
    const ano = data.getFullYear();
    const horas = data.getHours();

    return `${dia} de ${mes} de ${ano}, às ${horas} horas`;
  }
}
