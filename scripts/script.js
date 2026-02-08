const caixa = document.getElementById("qrBox"); // Importa a div caixa (Onde o qr code vai ficar)
const btn = document.querySelector("#send"); // Importa o botão de criar o qrCode
const urlInput = document.getElementById("url"); // Importa o input da url
const btnDownload = document.querySelector("#download"); // Pega o botão de donwload

btn.addEventListener("click", () => {
  const width = caixa.offsetWidth;
  const height = caixa.offsetHeight;
  // Pega o tamanho e altura da div qrBox

  const link = urlInput.value; // Pega o link

  caixa.innerHTML = "";

  new QRCode(caixa, {
    text: link,
    width: width - 3.5,
    height: height - 3.5,
  });
  // Cria o qrCode com o link, tamanho e largura
});
btnDownload.addEventListener("click", () => {
  const canvas = caixa.querySelector("canvas"); // Pega o qrCode

  let dataURL;

  if (canvas) {
    dataURL = canvas.toDataURL("image/png"); // Transforma o qrcode em imagem
  } else {
    // Caso o qrcode ainda não tenha sido gerado
    return;
  }

  const a = document.createElement("a");
  // Cria o link de donwload
  a.href = dataURL;
  a.download = "qrcode.png";
  // Define o nome do arquivo do qrCode
  a.click();
  // Simula um clique
});
