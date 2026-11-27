"use client";

import { useState } from "react";
import { maskCep, onlyDigits } from "@/lib/masks";
import { CadastroFormData } from "@/types/videira";

interface Props {
  formData: CadastroFormData;
  updateFields: (fields: Partial<CadastroFormData>) => void;
}

export default function Step2Endereco({ formData, updateFields }: Props) {
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [avisoCep, setAvisoCep] = useState<string | null>(null);

  async function buscarViaCep(cepFormatado: string) {
    const cepLimpo = onlyDigits(cepFormatado);
    if (cepLimpo.length !== 8) return;

    setBuscandoCep(true);
    setAvisoCep(null);

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();

      if (data.erro) {
        setAvisoCep("CEP não encontrado. Preencha o endereço manualmente.");
      } else {
        updateFields({
          logradouro: data.logradouro || formData.logradouro,
          bairro: data.bairro || formData.bairro,
          cidade: data.localidade || formData.cidade,
          uf: data.uf || formData.uf,
        });
      }
    } catch {
      setAvisoCep(
        "Não foi possível consultar o CEP agora. Preencha manualmente.",
      );
    } finally {
      setBuscandoCep(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1B263B] mb-1">
            CEP *
          </label>
          <input
            type="text"
            value={formData.cep}
            onChange={(e) => {
              const masked = maskCep(e.target.value);
              updateFields({ cep: masked });
              if (onlyDigits(masked).length === 8) {
                buscarViaCep(masked);
              }
            }}
            onBlur={() => buscarViaCep(formData.cep)}
            placeholder="65000-000"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] focus:outline-none focus:border-[#5B2C83]"
          />
          {buscandoCep && (
            <p className="text-xs text-[#3B5B9E] mt-1">Buscando CEP...</p>
          )}
          {avisoCep && (
            <p className="text-xs text-amber-700 mt-1">{avisoCep}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[#1B263B] mb-1">
            Logradouro (Rua / Av.) *
          </label>
          <input
            type="text"
            value={formData.logradouro}
            onChange={(e) => updateFields({ logradouro: e.target.value })}
            placeholder="Ex: Av. Jerônimo de Albuquerque"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] focus:outline-none focus:border-[#5B2C83]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1B263B] mb-1">
            Número *
          </label>
          <input
            type="text"
            value={formData.numero}
            onChange={(e) => updateFields({ numero: e.target.value })}
            placeholder="Ex: 120 ou S/N"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] focus:outline-none focus:border-[#5B2C83]"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[#1B263B] mb-1">
            Complemento (opcional)
          </label>
          <input
            type="text"
            value={formData.complemento}
            onChange={(e) => updateFields({ complemento: e.target.value })}
            placeholder="Ex: Apto 202, Bloco B, Casa"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] focus:outline-none focus:border-[#5B2C83]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1B263B] mb-1">
            Bairro *
          </label>
          <input
            type="text"
            value={formData.bairro}
            onChange={(e) => updateFields({ bairro: e.target.value })}
            placeholder="Ex: Cohama"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] focus:outline-none focus:border-[#5B2C83]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1B263B] mb-1">
            Cidade *
          </label>
          <input
            type="text"
            value={formData.cidade}
            onChange={(e) => updateFields({ cidade: e.target.value })}
            placeholder="São Luís"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] focus:outline-none focus:border-[#5B2C83]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1B263B] mb-1">
            UF *
          </label>
          <input
            type="text"
            maxLength={2}
            value={formData.uf}
            onChange={(e) => updateFields({ uf: e.target.value.toUpperCase() })}
            placeholder="MA"
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-[#1B263B] uppercase focus:outline-none focus:border-[#5B2C83]"
          />
        </div>
      </div>
    </div>
  );
}
