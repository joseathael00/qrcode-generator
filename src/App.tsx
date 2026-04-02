import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
  const [url, setUrl] = useState("");
  console.log(url);
  const [windowWidht, setWindowWidth] = useState(0);

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
    <main className="flex-center h-[95dvh] w-[95dvw] gap-2  p-10">
      <h1 className="text-3xl 2xl:text-6xl">
        Gerador de <span className="text-[#3A629D]">Qr</span>Code
      </h1>

      <div
        className="grid grid-cols-1 grid-rows-2 place-items-center h-8/9 w-8/9 sm:grid-cols-2 sm:grid-rows-1  min-[425px]:w-90 sm:w-10/12
       lg:w-230 2xl:w-10/12  bg-[#26292D] rounded shadow-marine-blue"
      >
        <div className="flex-center gap-5 ">
          <input
            type="text"
            placeholder="Cole sua URL aqui"
            onChange={(e) => setUrl(e.target.value)} // * Muda o valor do input sempre que algo novo é digitado dentro dele
            className="h-10 min-w-15 2xl:h-15 2xl:w-80 2xl:text-[1.2rem] px-2! text-neutral-200 bg-[#3A3F44]
       border border-solid border-[#171616] rounded-sm outline-0"
          />

          <button className="h-10 w-60 2xl:h-15 2xl:w-80  bg-dark shadow-marine-blue">
            <p className="2xl:text-[1.2rem]">Gerar</p>
          </button>
        </div>

        <div
          className="flex-center w-[90%] h-[90%] min-[325px]:w-65 min-[325px]:h-65 sm:h-75 sm:w-70 lg:h-90 lg:w-90 2xl:w-150
         2xl:h-150 bg-dark rounded-2xl shadow-marine-blue "
        >
          <p className="text-[20px] 2xl:text-3xl text-white ">
            Aguardando dados...
          </p>

          {/* Exibe a primeira mensagem caso a condição 'windowWidth < 768' seja verdadeira, caso seja falsa, exibe a segunda */}
          <p className="text-[15px] 2xl:text-2xl text-[#B1AEAE]">
            {windowWidht < 645
              ? "Preencha os campos acima"
              : "Preencha os campos ao lado"}
          </p>
        </div>
      </div>
    </main>
  );
}
