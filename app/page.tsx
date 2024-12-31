import Link from "next/link";
import "./style.css"

export default function Home() {
  return (
    <main className="w-dvw h-dvh flex justify-center items-center bg-gradient-to-r from-black to-gray-900">
      <section className="flex flex-col gap-10 w-[20dvw] max-sm:w-[100dvw] init-animation">
        <h1 className="text-white text-3xl font-semibold text-center">Entrar como:</h1>
        <div className="flex justify-center gap-5">
          <Link 
          href={"/cliente"} 
          className="text-white font-semibold bg-indigo-900 px-7 py-4 rounded-md w-[120px]
                    hover:bg-transparent transition-all duration-300 text-center">
            Cliente
          </Link>
          
          <Link 
          href={"/empresa"} 
          className="text-white font-semibold bg-indigo-900 px-7 py-4 rounded-md w-[120px]
                    hover:bg-transparent transition-all duration-300 text-center">
            Empresa
          </Link>
        </div>
      </section>
    </main>
  );
}
