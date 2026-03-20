import useWindowWidth from "./scripts/windowWidth.ts";
import "./App.css";
import { useState } from "react";

export default function App() {
  // Cria um state de nome qrCode, é onde a imagem do qrcode vai ficar
  const [qrCode, setQrCode] = useState("");

  // State que captura a url dentro do input de url
  const [url, SetUrl] = useState("");

  // Função que envia a url pra api
  async function sendUrl() {
    const response = await fetch("http://127.0.0.1:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    // Trasforma a imagem em bytes
    const blob = await response.blob();

    // Cria uma url temporária pra imagem
    const imageUrl = URL.createObjectURL(blob);

    // Adiciona a imagem no state de qrcode
    setQrCode(imageUrl);
  }

  // Variável que define o subtitulo da caixa do Qrcode
  const subtitle =
    useWindowWidth() > 768
      ? "Preencha os campos ao lado"
      : "Preencha os campos acima";

  // Executa a função de enviar url quando a tecla 'Enter' é apertada
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendUrl();
  };

  return (
    <main className="flex flex-col items-center justify-center gap-2 w-screen h-screen bg-[#1a1c1e]">
      <h1 className="text-white">
        Gerador de <span className="text-[#3A629D]">Qr</span>Code
      </h1>

      <div
        className="grid grid-cols-1 grid-rows-[0.5fr_1fr] lg:grid-cols-2 lg:grid-rows-1
        w-[85dvw] h-[80dvh] md:w-[55dvw] lg:w-[80dvw] lg:h-[85dvh] xl:w-[60dvw]
        rounded-2xl bg-[#26292D] relative"
      >
        <div className="flex flex-col justify-center place-items-center gap-10 w-full h-full">
          <input
            type="text"
            name="Input de Url"
            id="urlInput"
            onKeyDown={handleKeyDown}
            // Adiciona o valor do input no state Url sempre que ele é mudado
            onChange={(e) => SetUrl(e.target.value)}
            placeholder="Cole aqui a url"
            className="px-3 w-[90%] h-12 md:w-[70%] lg:w-[80%] xl:w-[80%] border-2
             border-solid border-[#606060] bg-[#5d5f62] outline-none rounded-lg"
          />
          <button
            className="w-[70%] md:w-[50%] lg:w-[50%] xl:w-[45%] hover:outline-none bg-[#1a1a1a] rounded-lg py-2"
            onClick={sendUrl}
          >
            Gerar QrCode
          </button>
        </div>

        <div
          // Adiciona a imagem do qrcode como background
          style={{ backgroundImage: `url(${qrCode})` }}
          className="flex flex-col items-center justify-center w-full h-full
          rounded-2xl bg-[#0d0d0d] text-center bg-contain bg-no-repeat bg-center"
        >
          {/* Esses dois textos só aparecem se o qrcode ainda não foi gerado */}
          {!qrCode && (
            <h2 className="font-semibold text-white">
              Aguardando dados
            </h2>
          )}
          {!qrCode && (
            <p className="text-base text-gray-400">{subtitle}</p>
          )}
        </div>

        {/* Esses botões só aparecem quando o qrCode já foi gerado */}
        {qrCode && (
          <button
            style={{ right: '4%' }}
            className="h-12 w-12 absolute bottom-10 bg-cover bg-[#1a1a1a] rounded-lg"
            id="download"
            onClick={() => {
              // Função anônima de download quando o botão de download é apertado
              const link = document.createElement("a");
              link.href = qrCode;
              link.download = "qrcode.png";
              link.click();
            }}
          ></button>
        )}

        {qrCode && (
          <button
            className="h-10 w-32 absolute top-12 right-7 border-2 border-solid border-[#020202] bg-[#1a1a1a] rounded-lg"
            id="clear"
            onClick={() => {
              setQrCode("");
            }}
          >
            Limpar QrCode
          </button>
        )}
      </div>
    </main>
  );
}