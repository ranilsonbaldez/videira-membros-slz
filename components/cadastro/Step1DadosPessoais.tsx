"use client";

import { maskPhone } from "@/lib/masks";
import { CadastroFormData, Ocupacao, RedeVideira, Sexo } from "@/types/videira";

interface Props {
  formData: CadastroFormData;
  updateFields: (fields: Partial<CadastroFormData>) => void;
}

const REDES: { valor: RedeVideira; titulo: string; desc: string }[] = [
  { valor: "kids", titulo: "Kids", desc: "Crianças com pais ou responsáveis" },
  { valor: "jovens", titulo: "Jovens", desc: "Juventude e universitários" },
  { valor: "adultos", titulo: "Adultos", desc: "Membros e visitantes adultos" },
];

export default function Step1DadosPessoais({ formData, updateFields }: Props) {
  const isKids = formData.rede === "kids";
  const exigeProfissao =
    formData.ocupacao === "trabalhando" || formData.ocupacao === "outro";

  const redeAtual = REDES.find((r) => r.valor === formData.rede);

  function selecionarRede(valor: RedeVideira) {
    updateFields({
      rede: valor,
      ...(valor === "kids" ? { celular: "", ocupacao: "", profissao: "" } : {}),
    });
  }

  return (
    <div className="space-y-5">
      {/* Seletor compacto em 3 colunas (funciona no toque e ocupa 1 linha no celular) */}
      <div>
        <label className="block text-sm font-semibold text-[#1B263B] mb-1.5">
          Selecione a sua Rede *
        </label>

        <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-slate-100 border border-slate-200 relative z-10">
          {REDES.map((item) => {
            const selecionada = formData.rede === item.valor;
            return (
              <button
                key={item.valor}
                type="button"
                onClick={() => selecionarRede(item.valor)}
                className={`relative z-10 pointer-events-auto touch-manipulation py-2.5 px-2 rounded-lg text-sm font-bold text-center cursor-pointer transition-colors ${
                  selecionada
                    ? "bg-[#5B2C83] text-white shadow-sm"
                    : "bg-transparent text-[#1B263B] hover:bg-white/70"
                }`}
              >
                {item.titulo}
              </button>
            );
          })}
        </div>

        <p className="text-xs text-slate-500 mt-1.5">
          {redeAtual
            ? redeAtual.desc
            : "Toque acima para escolher Kids, Jovens ou Adultos."}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1B263B] mb-1">
          Nome completo *
        </label>
        <input
          type="text"
          value={formData.nome_completo}
          onChange={(e) => updateFields({ nome_completo: e.target.value })}
          placeholder="Digite o nome completo"
          className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] focus:outline-none focus:border-[#5B2C83]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1B263B] mb-1">
            Data de nascimento *
          </label>
          <input
            type="date"
            value={formData.data_nascimento}
            onChange={(e) => updateFields({ data_nascimento: e.target.value })}
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] focus:outline-none focus:border-[#5B2C83]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1B263B] mb-1">
            Sexo *
          </label>
          <select
            value={formData.sexo}
            onChange={(e) =>
              updateFields({ sexo: e.target.value as Sexo | "" })
            }
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] bg-white focus:outline-none focus:border-[#5B2C83]"
          >
            <option value="">Selecione...</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>
        </div>
      </div>

      {!isKids && (
        <>
          <div>
            <label className="block text-sm font-medium text-[#1B263B] mb-1">
              Celular / WhatsApp *
            </label>
            <input
              type="tel"
              value={formData.celular}
              onChange={(e) =>
                updateFields({ celular: maskPhone(e.target.value) })
              }
              placeholder="(98) 99999-9999"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] focus:outline-none focus:border-[#5B2C83]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1B263B] mb-1">
                Ocupação *
              </label>
              <select
                value={formData.ocupacao}
                onChange={(e) =>
                  updateFields({ ocupacao: e.target.value as Ocupacao | "" })
                }
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] bg-white focus:outline-none focus:border-[#5B2C83]"
              >
                <option value="">Selecione...</option>
                <option value="estudante">Estudante</option>
                <option value="universitario">Universitário(a)</option>
                <option value="trabalhando">Trabalhando</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1B263B] mb-1">
                Profissão / Atividade {exigeProfissao ? "*" : "(opcional)"}
              </label>
              <input
                type="text"
                value={formData.profissao}
                onChange={(e) => updateFields({ profissao: e.target.value })}
                placeholder="Ex: Analista, Professor, Autônomo"
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] focus:outline-none focus:border-[#5B2C83]"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
