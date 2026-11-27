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
    <main className="min-h-screen bg-[#F4F6F9] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="flex flex-col items-center text-center mb-6">
          <Link href="/" className="mb-3 inline-block">
            <Image
              src="/logo-videira.png"
              alt="Videira — Igreja em Células"
              width={220}
              height={110}
              className="h-auto w-48 sm:w-56 object-contain"
              priority
            />
          </Link>

          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#3B5B9E]/15 text-[#3B5B9E] mb-2">
            São Luís • Ficha Cadastral
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1B263B]">
            Cadastro de Membros
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Preencha as 4 etapas abaixo para concluir seu registro.
          </p>
        </header>

        <CadastroWizard />
      </div>
    </main>
  );
}
