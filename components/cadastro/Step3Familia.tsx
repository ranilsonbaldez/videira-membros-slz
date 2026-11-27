"use client";

import { maskPhone } from "@/lib/masks";
import { CadastroFormData, EstadoCivil } from "@/types/videira";

interface Props {
  formData: CadastroFormData;
  updateFields: (fields: Partial<CadastroFormData>) => void;
}

export default function Step3Familia({ formData, updateFields }: Props) {
  if (formData.rede === "kids") {
    return (
      <div className="space-y-5">
        <p className="text-sm text-slate-600">
          Informe os dados de contato dos pais ou responsável (ao menos um
          contato completo é obrigatório).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1B263B] mb-1">
              Nome do pai
            </label>
            <input
              type="text"
              value={formData.pai_nome}
              onChange={(e) => updateFields({ pai_nome: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] focus:outline-none focus:border-[#5B2C83]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1B263B] mb-1">
              Telefone do pai
            </label>
            <input
              type="tel"
              value={formData.pai_telefone}
              onChange={(e) =>
                updateFields({ pai_telefone: maskPhone(e.target.value) })
              }
              placeholder="(98) 99999-9999"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] focus:outline-none focus:border-[#5B2C83]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1B263B] mb-1">
              Nome da mãe
            </label>
            <input
              type="text"
              value={formData.mae_nome}
              onChange={(e) => updateFields({ mae_nome: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] focus:outline-none focus:border-[#5B2C83]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1B263B] mb-1">
              Telefone da mãe
            </label>
            <input
              type="tel"
              value={formData.mae_telefone}
              onChange={(e) =>
                updateFields({ mae_telefone: maskPhone(e.target.value) })
              }
              placeholder="(98) 99999-9999"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] focus:outline-none focus:border-[#5B2C83]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1B263B] mb-1">
              Outro responsável (se aplicável)
            </label>
            <input
              type="text"
              value={formData.responsavel_nome}
              onChange={(e) =>
                updateFields({ responsavel_nome: e.target.value })
              }
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] focus:outline-none focus:border-[#5B2C83]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1B263B] mb-1">
              Telefone do responsável
            </label>
            <input
              type="tel"
              value={formData.responsavel_telefone}
              onChange={(e) =>
                updateFields({
                  responsavel_telefone: maskPhone(e.target.value),
                })
              }
              placeholder="(98) 99999-9999"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] focus:outline-none focus:border-[#5B2C83]"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-[#1B263B] mb-1">
          Estado civil *
        </label>
        <select
          value={formData.estado_civil}
          onChange={(e) =>
            updateFields({ estado_civil: e.target.value as EstadoCivil | "" })
          }
          className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] bg-white focus:outline-none focus:border-[#5B2C83]"
        >
          <option value="">Selecione...</option>
          <option value="solteiro">Solteiro(a)</option>
          <option value="casado">Casado(a)</option>
          <option value="viuvo">Viúvo(a)</option>
          <option value="divorciado">Divorciado(a)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1B263B] mb-1">
            Possui filhos? *
          </label>
          <select
            value={formData.tem_filhos}
            onChange={(e) => {
              const val = e.target.value as "sim" | "nao" | "";
              updateFields({
                tem_filhos: val,
                ...(val !== "sim" ? { quantidade_filhos: "" } : {}),
              });
            }}
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] bg-white focus:outline-none focus:border-[#5B2C83]"
          >
            <option value="">Selecione...</option>
            <option value="nao">Não</option>
            <option value="sim">Sim</option>
          </select>
        </div>

        {formData.tem_filhos === "sim" && (
          <div>
            <label className="block text-sm font-medium text-[#1B263B] mb-1">
              Quantidade de filhos *
            </label>
            <input
              type="number"
              min={1}
              max={20}
              value={formData.quantidade_filhos}
              onChange={(e) =>
                updateFields({ quantidade_filhos: e.target.value })
              }
              placeholder="Ex: 2"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] focus:outline-none focus:border-[#5B2C83]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
