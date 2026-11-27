import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F4F6F9] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-2 w-full bg-videira-gradiente" />

        <div className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <Image
              src="/logo-videira.png"
              alt="Videira — Igreja em Células"
              width={260}
              height={130}
              className="h-auto w-56 sm:w-64 object-contain"
              priority
            />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-[#36B5A8]/15 text-[#1B263B]">
              São Luís • Maranhão
            </span>
            <h1 className="text-2xl font-bold text-[#1B263B]">
              Cadastro de Membros
            </h1>
            <p className="text-sm text-slate-600">
              Realize ou atualize seu cadastro nas redes Kids, Jovens ou Adultos
              em 4 etapas simples.
            </p>
          </div>

          <Link
            href="/cadastro"
            className="block w-full py-3 px-4 rounded-xl bg-[#5B2C83] hover:bg-[#461F66] text-white font-semibold transition-colors shadow-sm"
          >
            Iniciar Cadastro
          </Link>
        </div>
      </div>
    </main>
  );
}
