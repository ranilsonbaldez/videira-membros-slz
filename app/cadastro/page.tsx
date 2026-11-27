import Image from "next/image";
import Link from "next/link";
import CadastroWizard from "@/components/cadastro/CadastroWizard";

export const metadata = {
  title: "Cadastro de Membros | Videira São Luís",
  description:
    "Formulário unificado de cadastro de membros — Kids, Jovens e Adultos.",
};

export default function CadastroPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#3B5B9E] via-[#5B2C83] to-[#2F144A]">
      {/* Faixa superior nas cores da Videira */}
      <div className="h-1.5 w-full bg-videira-gradiente" />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <header className="flex flex-col items-center text-center mb-6">
            <Link
              href="/"
              className="mb-3 inline-flex items-center justify-center rounded-2xl bg-white/95 px-5 py-3 shadow-md"
            >
              <Image
                src="/logo-videira.png"
                alt="Videira — Igreja em Células"
                width={220}
                height={110}
                className="h-auto w-44 sm:w-52 object-contain"
                priority
              />
            </Link>

            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-white/15 text-white border border-white/25 mb-2">
              Cadastro de Membros
            </span>
            {/* <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Cadastro de Membros
            </h1> */}
            <p className="text-sm text-white/85 mt-1">
              Preencha as 4 etapas abaixo para concluir seu registro.
            </p>
          </header>

          <CadastroWizard />
        </div>
      </main>

      {/* Faixa inferior nas cores da Videira */}
      <div className="h-1.5 w-full bg-videira-gradiente" />
    </div>
  );
}
