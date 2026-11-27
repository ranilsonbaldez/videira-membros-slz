"use client";

interface Props {
  nomeCompleto: string;
  rede: string;
  onNovoCadastro: () => void;
}

export default function TelaSucesso({
  nomeCompleto,
  rede,
  onNovoCadastro,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center space-y-6">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#36B5A8]/15 text-[#36B5A8] text-2xl font-bold mx-auto">
        ✓
      </div>

      <div className="space-y-2">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#3B5B9E]/15 text-[#3B5B9E]">
          Rede {rede}
        </span>
        <h2 className="text-2xl font-bold text-[#1B263B]">
          Cadastro Concluído!
        </h2>
        <p className="text-sm text-slate-600">
          Obrigado, <strong className="text-[#1B263B]">{nomeCompleto}</strong>.
          Seu registro foi salvo com sucesso.
        </p>
      </div>

      <button
        type="button"
        onClick={onNovoCadastro}
        className="w-full py-3 px-4 rounded-xl bg-[#5B2C83] hover:bg-[#461F66] text-white font-semibold transition-colors cursor-pointer"
      >
        Realizar Novo Cadastro
      </button>
    </div>
  );
}
