"use client";

import { useState } from "react";
import { CadastroFormData, CelulaVideira } from "@/types/videira";

interface Props {
  formData: CadastroFormData;
  celulas: CelulaVideira[];
  enviando: boolean;
  onVoltar: () => void;
  onToggleTermos: (aceito: boolean) => void;
  onConfirmarEnvio: () => void;
}

function formatarDataBR(dataIso: string): string {
  if (!dataIso) return "—";
  const partes = dataIso.split("-");
  if (partes.length !== 3) return dataIso;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function rotuloEstadoCivil(estado: CadastroFormData["estado_civil"]): string {
  switch (estado) {
    case "solteiro":
      return "Solteiro(a)";
    case "casado":
      return "Casado(a)";
    case "viuvo":
      return "Viúvo(a)";
    case "divorciado":
      return "Divorciado(a)";
    default:
      return "—";
  }
}

function rotuloOcupacao(ocupacao: CadastroFormData["ocupacao"]): string {
  switch (ocupacao) {
    case "estudante":
      return "Estudante/Universitário(a)";
    case "trabalhando":
      return "Trabalhando";
    case "outro":
      return "Outro";
    default:
      return "—";
  }
}

export default function ConfirmacaoCadastro({
  formData,
  celulas,
  enviando,
  onVoltar,
  onToggleTermos,
  onConfirmarEnvio,
}: Props) {
  const [mostrarTermos, setMostrarTermos] = useState(false);
  const isKids = formData.rede === "kids";

  const celulaSelecionada = celulas.find((c) => c.id === formData.celula_id);

  let descricaoCelula = "—";
  if (formData.opcao_celula === "cadastrada") {
    descricaoCelula = celulaSelecionada
      ? `${celulaSelecionada.nome}${celulaSelecionada.lider ? ` (${celulaSelecionada.lider})` : ""}`
      : "Célula selecionada";
  } else if (formData.opcao_celula === "outra") {
    descricaoCelula = `Outra: ${formData.celula_outra_nome || "—"}`;
  } else if (formData.opcao_celula === "nao_participa") {
    descricaoCelula = "Ainda não participa de célula";
  }

  const trilhoMarcados = [
    formData.fez_cursao && "Cursão",
    formData.fez_ctl && "CTL",
    formData.fez_apocalipse && "Apocalipse",
  ].filter(Boolean) as string[];

  const escolaFamiliaMarcados = [
    formData.fez_curso_noivos && "Curso de Noivos",
    formData.fez_casais_radicais && "Casais Radicais",
    formData.fez_criacao_filhos && "Criação de Filhos",
    formData.fez_financas && "Finanças",
  ].filter(Boolean) as string[];

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-[#3B5B9E]/10 border border-[#3B5B9E]/25 p-4">
        <h2 className="text-base font-bold text-[#1B263B]">
          Confira seus dados antes de concluir
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
          Revise as informações abaixo. Se precisar ajustar algo, clique em{" "}
          <strong className="text-[#1B263B]">Voltar para Corrigir</strong>.
        </p>
      </div>

      {/* Dados Pessoais */}
      <div className="rounded-xl border border-slate-200 p-4 space-y-2.5 text-sm">
        <div className="text-xs font-bold uppercase tracking-wider text-[#5B2C83]">
          1. Dados Pessoais
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[#1B263B]">
          <div>
            <span className="text-slate-500">Rede: </span>
            <strong className="capitalize">{formData.rede || "—"}</strong>
          </div>
          <div>
            <span className="text-slate-500">Nome: </span>
            <strong>{formData.nome_completo || "—"}</strong>
          </div>
          <div>
            <span className="text-slate-500">Nascimento: </span>
            <strong>{formatarDataBR(formData.data_nascimento)}</strong>
          </div>
          <div>
            <span className="text-slate-500">Sexo: </span>
            <strong className="capitalize">{formData.sexo || "—"}</strong>
          </div>
          {!isKids && (
            <>
              <div>
                <span className="text-slate-500">Celular: </span>
                <strong>{formData.celular || "—"}</strong>
              </div>
              <div>
                <span className="text-slate-500">Ocupação: </span>
                <strong>{rotuloOcupacao(formData.ocupacao)}</strong>
              </div>
              {formData.profissao && (
                <div className="sm:col-span-2">
                  <span className="text-slate-500">
                    Profissão / Atividade:{" "}
                  </span>
                  <strong>{formData.profissao}</strong>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Endereço */}
      <div className="rounded-xl border border-slate-200 p-4 space-y-2 text-sm">
        <div className="text-xs font-bold uppercase tracking-wider text-[#5B2C83]">
          2. Endereço
        </div>
        <div className="text-[#1B263B] space-y-1">
          <p>
            <strong>{formData.logradouro || "—"}</strong>,{" "}
            {formData.numero || "—"}
            {formData.complemento ? ` — ${formData.complemento}` : ""}
          </p>
          <p className="text-slate-600">
            Bairro:{" "}
            <strong className="text-[#1B263B]">{formData.bairro || "—"}</strong>{" "}
            • {formData.cidade || "—"}/{formData.uf || "—"} • CEP:{" "}
            <strong className="text-[#1B263B]">{formData.cep || "—"}</strong>
          </p>
        </div>
      </div>

      {/* Família */}
      <div className="rounded-xl border border-slate-200 p-4 space-y-2 text-sm">
        <div className="text-xs font-bold uppercase tracking-wider text-[#5B2C83]">
          3. Família
        </div>
        {isKids ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#1B263B]">
            {formData.pai_nome && (
              <div>
                <span className="text-slate-500">Pai: </span>
                <strong>{formData.pai_nome}</strong> (
                {formData.pai_telefone || "—"})
              </div>
            )}
            {formData.mae_nome && (
              <div>
                <span className="text-slate-500">Mãe: </span>
                <strong>{formData.mae_nome}</strong> (
                {formData.mae_telefone || "—"})
              </div>
            )}
            {formData.responsavel_nome && (
              <div className="sm:col-span-2">
                <span className="text-slate-500">Responsável: </span>
                <strong>{formData.responsavel_nome}</strong> (
                {formData.responsavel_telefone || "—"})
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#1B263B]">
            <div>
              <span className="text-slate-500">Estado civil: </span>
              <strong>{rotuloEstadoCivil(formData.estado_civil)}</strong>
            </div>
            <div>
              <span className="text-slate-500">Possui filhos: </span>
              <strong>
                {formData.tem_filhos === "sim"
                  ? `Sim (${formData.quantidade_filhos || 1})`
                  : formData.tem_filhos === "nao"
                    ? "Não"
                    : "—"}
              </strong>
            </div>
          </div>
        )}
      </div>

      {/* Vida na Igreja */}
      <div className="rounded-xl border border-slate-200 p-4 space-y-2 text-sm">
        <div className="text-xs font-bold uppercase tracking-wider text-[#5B2C83]">
          4. Vida na Igreja
        </div>
        <div className="space-y-1.5 text-[#1B263B]">
          <div>
            <span className="text-slate-500">Célula: </span>
            <strong>{descricaoCelula}</strong>
          </div>
          {!isKids && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500">Batizado nas águas: </span>
                  <strong>{formData.batizado === "sim" ? "Sim" : "Não"}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Encontro com Deus: </span>
                  <strong>
                    {formData.encontro_com_deus === "sim" ? "Sim" : "Não"}
                  </strong>
                </div>
              </div>
              <div>
                <span className="text-slate-500">Trilho do Vencedor: </span>
                <strong>
                  {trilhoMarcados.length > 0
                    ? trilhoMarcados.join(", ")
                    : "Nenhum marcado"}
                </strong>
              </div>
              <div>
                <span className="text-slate-500">Escola da Família: </span>
                <strong>
                  {escolaFamiliaMarcados.length > 0
                    ? escolaFamiliaMarcados.join(", ")
                    : "Nenhum marcado"}
                </strong>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Termos da LGPD na tela de confirmação */}
      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
        <div className="flex items-start gap-2.5">
          <input
            id="aceite_lgpd_confirmacao"
            type="checkbox"
            checked={formData.aceite_termos}
            onChange={(e) => onToggleTermos(e.target.checked)}
            className="mt-1 rounded border-slate-300 text-[#5B2C83]"
          />
          <label
            htmlFor="aceite_lgpd_confirmacao"
            className="text-xs sm:text-sm text-slate-700"
          >
            Concordo com o uso destes dados exclusivamente para fins pastorais e
            administrativos da Igreja Videira São Luis.{" "}
          </label>
        </div>
      </div>

      {/* Ações de Confirmação */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={onVoltar}
          disabled={enviando}
          className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors cursor-pointer"
        >
          Voltar para Corrigir
        </button>

        <button
          type="button"
          onClick={onConfirmarEnvio}
          disabled={enviando}
          className="px-6 py-2.5 rounded-xl bg-[#5B2C83] hover:bg-[#461F66] disabled:opacity-60 text-white font-semibold transition-colors cursor-pointer"
        >
          {enviando ? "Salvando..." : "Concluir Cadastro"}
        </button>
      </div>
    </div>
  );
}
