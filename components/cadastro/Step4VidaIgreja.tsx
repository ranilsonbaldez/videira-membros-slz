"use client";

import { useState } from "react";
import { CadastroFormData, CelulaVideira, OpcaoCelula } from "@/types/videira";

interface Props {
  formData: CadastroFormData;
  updateFields: (fields: Partial<CadastroFormData>) => void;
  celulas: CelulaVideira[];
}

export default function Step4VidaIgreja({
  formData,
  updateFields,
  celulas,
}: Props) {
  const [mostrarTermos, setMostrarTermos] = useState(false);
  const isKids = formData.rede === "kids";

  const celulasFiltradas = celulas.filter((c) =>
    formData.rede ? c.segmento === formData.rede : true,
  );

  return (
    <div className="space-y-6">
      {!isKids && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1B263B] mb-1">
                É batizado nas águas? *
              </label>
              <select
                value={formData.batizado}
                onChange={(e) =>
                  updateFields({
                    batizado: e.target.value as "sim" | "nao" | "",
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] bg-white focus:outline-none focus:border-[#5B2C83]"
              >
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1B263B] mb-1">
                Fez Encontro com Deus? *
              </label>
              <select
                value={formData.encontro_com_deus}
                onChange={(e) =>
                  updateFields({
                    encontro_com_deus: e.target.value as "sim" | "nao" | "",
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] bg-white focus:outline-none focus:border-[#5B2C83]"
              >
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2.5">
              <div className="text-sm font-semibold text-[#1B263B]">
                Trilho do Vencedor
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.fez_cursao}
                  onChange={(e) =>
                    updateFields({ fez_cursao: e.target.checked })
                  }
                  className="rounded border-slate-300 text-[#5B2C83]"
                />
                Cursão
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.fez_ctl}
                  onChange={(e) => updateFields({ fez_ctl: e.target.checked })}
                  className="rounded border-slate-300 text-[#5B2C83]"
                />
                CTL
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.fez_apocalipse}
                  onChange={(e) =>
                    updateFields({ fez_apocalipse: e.target.checked })
                  }
                  className="rounded border-slate-300 text-[#5B2C83]"
                />
                Apocalipse
              </label>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2.5">
              <div className="text-sm font-semibold text-[#1B263B]">
                Escola da Família
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.fez_curso_noivos}
                  onChange={(e) =>
                    updateFields({ fez_curso_noivos: e.target.checked })
                  }
                  className="rounded border-slate-300 text-[#5B2C83]"
                />
                Curso de Noivos
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.fez_casais_radicais}
                  onChange={(e) =>
                    updateFields({ fez_casais_radicais: e.target.checked })
                  }
                  className="rounded border-slate-300 text-[#5B2C83]"
                />
                Casais Radicais
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.fez_criacao_filhos}
                  onChange={(e) =>
                    updateFields({ fez_criacao_filhos: e.target.checked })
                  }
                  className="rounded border-slate-300 text-[#5B2C83]"
                />
                Criação de Filhos
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.fez_financas}
                  onChange={(e) =>
                    updateFields({ fez_financas: e.target.checked })
                  }
                  className="rounded border-slate-300 text-[#5B2C83]"
                />
                Finanças
              </label>
            </div>
          </div>
        </>
      )}

      <div className="space-y-3">
        <label className="block text-sm font-medium text-[#1B263B]">
          Participa de célula? *
        </label>
        <select
          value={formData.opcao_celula}
          onChange={(e) => {
            const val = e.target.value as OpcaoCelula | "";
            updateFields({
              opcao_celula: val,
              celula_id: val === "cadastrada" ? formData.celula_id : "",
              celula_outra_nome:
                val === "outra" ? formData.celula_outra_nome : "",
            });
          }}
          className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] bg-white focus:outline-none focus:border-[#5B2C83]"
        >
          <option value="">Selecione...</option>
          <option value="cadastrada">Sim, escolher célula da lista</option>
          <option value="outra">Sim, outra célula (digitar nome/líder)</option>
          <option value="nao_participa">Ainda não participo de célula</option>
        </select>

        {formData.opcao_celula === "cadastrada" && (
          <select
            value={formData.celula_id}
            onChange={(e) => updateFields({ celula_id: e.target.value })}
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] bg-white focus:outline-none focus:border-[#5B2C83]"
          >
            <option value="">Selecione a célula...</option>
            {celulasFiltradas.map((cel) => (
              <option key={cel.id} value={cel.id}>
                {cel.nome} {cel.lider ? `— Líder: ${cel.lider}` : ""}
              </option>
            ))}
          </select>
        )}

        {formData.opcao_celula === "outra" && (
          <input
            type="text"
            value={formData.celula_outra_nome}
            onChange={(e) =>
              updateFields({ celula_outra_nome: e.target.value })
            }
            placeholder="Digite o nome da célula ou do líder"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] focus:outline-none focus:border-[#5B2C83]"
          />
        )}
      </div>

      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
        <div className="flex items-start gap-2.5">
          <input
            id="aceite_lgpd"
            type="checkbox"
            checked={formData.aceite_termos}
            onChange={(e) => updateFields({ aceite_termos: e.target.checked })}
            className="mt-1 rounded border-slate-300 text-[#5B2C83]"
          />
          <label
            htmlFor="aceite_lgpd"
            className="text-xs sm:text-sm text-slate-700"
          >
            Declaro que li e concordo com o tratamento dos dados informados para
            fins de acompanhamento pastoral, organização de células e atividades
            da Igreja Videira São Luís (LGPD).{" "}
            <button
              type="button"
              onClick={() => setMostrarTermos((prev) => !prev)}
              className="text-[#3B5B9E] underline font-medium"
            >
              {mostrarTermos ? "Ocultar detalhes" : "Ver detalhes"}
            </button>
          </label>
        </div>

        {mostrarTermos && (
          <p className="text-xs text-slate-600 pl-6 pt-1">
            Os dados cadastrais são utilizados exclusivamente pela liderança
            autorizada para pastoral, comunicação de células e eventos
            ministeriais, em conformidade com a Lei nº 13.709/2018 (LGPD).
          </p>
        )}
      </div>
    </div>
  );
}
