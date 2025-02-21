let listaNmrSorteados = [];
let limparArr = 100;
let nmrSecreto = gerarNmrAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.3 });
}

function exibirMsgInicial() {
  exibirTextoNaTela("h1", "Jogo do número secreto");
  exibirTextoNaTela("p", `Escolha um número entre 1 e ${limparArr}`);
}

exibirMsgInicial();

function verificarChute() {
  let chute = document.querySelector("input").value;

  if (chute == nmrSecreto) {
    exibirTextoNaTela("h1", "Acertou!");
    let tentativaSingular = tentativas > 1 ? "tentivas" : "tentativa";
    let msgTentativas = `Você descobriu o número secreto com ${tentativas} ${tentativaSingular}`;
    exibirTextoNaTela("p", msgTentativas);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > nmrSecreto) {
      exibirTextoNaTela("p", "O número secreto é menor");
    } else {
      exibirTextoNaTela("p", "O número secreto é maior");
    }
    tentativas++;
    limparCampo();
  }
}

function gerarNmrAleatorio() {
  let nmrEscolhido = parseInt(Math.random() * limparArr + 1);
  let qtdElementosLista = listaNmrSorteados.length;

  if (qtdElementosLista == limparArr) {
    listaNmrSorteados = [];
  }

  if (listaNmrSorteados.includes(nmrEscolhido)) {
    return gerarNmrAleatorio();
  } else {
    listaNmrSorteados.push(nmrEscolhido);
    console.log(listaNmrSorteados);
    return nmrEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

function reiniciarJogo() {
  nmrSecreto = gerarNmrAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMsgInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
