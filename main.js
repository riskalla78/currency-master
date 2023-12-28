import BaseCoin from "./BaseCoin.js";
import TargetCoin from "./TargetCoin.js";
import Result from "./Result.js";
const anchor = document.querySelector("#trackCambio");
const amount = document.querySelector("#amount");
const resp1 = document.querySelector("#resp1");
const resp2 = document.querySelector("#resp2");

//Condição que encapsula esse trecho na página index.html
if (anchor) {
  const baseCoin = new BaseCoin();
  const targetCoin = new TargetCoin();
  baseCoin.displayCoin();
  targetCoin.displayCoin();

  document.addEventListener("click", (event) => {
    const clickedElement = event.target;
    //Se as moedas base e alvo estão selecionadas, habilita o botão que leva para a página results.html
    if (baseCoin.hasSelection() && targetCoin.hasSelection()) {
      anchor.classList.remove("disabled");
    } else {
      anchor.classList.add("disabled");
    }
    //Cria o link com os parâmetros necessários para a conversão que será feita na página results.html
    if (clickedElement.classList.contains("base")) {
      baseCoin.createBaseLink(anchor);
      baseCoin.disableSameCoinButton();
    } else if (clickedElement.classList.contains("target")) {
      targetCoin.createTargetLink(anchor);
      targetCoin.disableSameCoinButton();
    }
  });
}
//Condição que encapsula esse trecho na página results.html
if (amount) {
  //Variável de controle para inverter as moedas base e alvo posteriormente
  let isReverted = false;
  const result = new Result();
  const form = document.querySelector("#frm");
  //Previne o recarregamento da página ao digitar a quantia, impedindo os resultados apareçam múltiplas vezes
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  //cria um array para receber os parâmetros que serão usados na função displayButtonsResult
  result.params = ["base", "target"];
  result.displayButtonsResult(result.params[0], result.params[1]);
  //Adiciona um ouvinte de evento para receber a quantia digitada no input amount e chama a função que lida com os resultados
  amount.addEventListener("keyup", () => {
    result.handleKeyup(result.params[0], result.params[1]);
  });

  const coinDisplay = document.querySelector("#coinDisplay");
  //adiciona um ouvinte de evento para o botão que inverte a moeda base e a alvo
  coinDisplay.addEventListener("click", (event) => {
    if (event.target.classList.contains("coin")) {
      //Inverte os parâmetro usados para a função displayButtonsResult
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
