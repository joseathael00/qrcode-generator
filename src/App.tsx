import "./App.css";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

function QrCode({ url }: { url: string }) {
  return url ? (
    <QRCodeSVG
      id="qr-canvas"
      value={url}
      size={256}
      bgColor="#ffffff"
      fgColor="#000000"
      className="h-full w-full border-5 border-solid border-white rounded-2xl"
      level="H"
    />
  ) : null;
}

export default function App() {
  function handleDownload() {
    const svg = document.getElementById("qr-canvas");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);

    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.svg";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  const [inputTextContent, setInputTextContent] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // * UseEffect que guarda a largura da página sempre que o evento 'resize' é chamado
  useEffect(() => {
    // * Cria uma função que guarda a largura da página
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    // * Cria um evento de 'resize' que chama a função criada acima
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="flex-center h-[95dvh] w-[95dvw] gap-2 p-10">
      <h1 className="text-3xl 2xl:text-6xl">
        Gerador de <span className="text-[#3A629D]">Qr</span>Code
      </h1>

      <div
        className="grid grid-cols-1 grid-rows-2 place-items-center h-8/9 w-8/9 sm:grid-cols-2 sm:grid-rows-1  min-[425px]:w-90 sm:w-10/12
       lg:w-230 2xl:w-10/12  bg-[#26292D] rounded shadow-marine-blue "
      >
        <div className="flex-center gap-5 relative">
          {generatedUrl ? (
            <>
              <button
                onClick={() => {
                  setGeneratedUrl("");
                  setInputTextContent("");
                }}
                className="absolute bg-dark h-15 w-30 shadow-marine-blue bottom-75 right-80"
              >
                Limpar
              </button>

              <button
                onClick={() => handleDownload()}
                className="absolute bg-dark h-15 w-40 shadow-marine-blue top-75 left-75"
              >
                Baixar imagem
              </button>
            </>
          ) : null}

          <input
            type="text"
            value={inputTextContent}
            placeholder="Cole sua URL aqui"
            onChange={(e) => setInputTextContent(e.target.value)} // * Muda o valor do input sempre que algo novo é digitado dentro dele
            className="h-10 min-w-15 2xl:h-15 2xl:w-80 2xl:text-[1.2rem] px-2! text-neutral-200 bg-[#3A3F44]
       border border-solid border-[#171616] rounded-sm outline-0"
          />

          <button
            onClick={() => setGeneratedUrl(inputTextContent)}
            className="h-10 w-60 2xl:h-15 2xl:w-80 bg-dark shadow-marine-blue"
          >
            <p className="2xl:text-[1.2rem]">Gerar</p>
          </button>
        </div>

        <div
          className="flex-center w-[90%] h-[90%] min-[325px]:w-65 min-[325px]:h-65 sm:h-75 sm:w-70 lg:h-90 lg:w-90 2xl:w-150
         2xl:h-150 rounded-2xl shadow-marine-blue bg-dark "
        >
          {generatedUrl ? (
            <QrCode url={generatedUrl} />
          ) : (
            <>
              <p className="text-[20px] 2xl:text-3xl text-white ">
                Aguardando dados...
              </p>
              <p className="text-[15px] 2xl:text-2xl text-[#B1AEAE]">
                {windowWidth < 645
                  ? "Preencha os campos acima"
                  : "Preencha os campos ao lado"}
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
