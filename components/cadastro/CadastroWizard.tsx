"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { onlyDigits } from "@/lib/masks";
import {
  CadastroFormData,
  CelulaVideira,
  NovoMembroPayload,
} from "@/types/videira";
import Step1DadosPessoais from "./Step1DadosPessoais";
import Step2Endereco from "./Step2Endereco";
import Step3Familia from "./Step3Familia";
import Step4VidaIgreja from "./Step4VidaIgreja";
import ConfirmacaoCadastro from "./ConfirmacaoCadastro";
import TelaSucesso from "./TelaSucesso";

const INITIAL_DATA: CadastroFormData = {
  rede: "",
  nome_completo: "",
  data_nascimento: "",
  sexo: "",
  celular: "",
  ocupacao: "",
  profissao: "",

  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  uf: "",

  pai_nome: "",
  pai_telefone: "",
  mae_nome: "",
  mae_telefone: "",
  responsavel_nome: "",
  responsavel_telefone: "",
  estado_civil: "",
  tem_filhos: "",
  quantidade_filhos: "",

  batizado: "",
  encontro_com_deus: "",
  fez_cursao: false,
  fez_ctl: false,
  fez_apocalipse: false,
  fez_curso_noivos: false,
  fez_casais_radicais: false,
  fez_criacao_filhos: false,
  fez_financas: false,
  opcao_celula: "",
  celula_id: "",
  celula_outra_nome: "",
  aceite_termos: false,
};

const ETAPAS = [
  { numero: 1, titulo: "Dados Pessoais" },
  { numero: 2, titulo: "Endereço" },
  { numero: 3, titulo: "Família" },
  { numero: 4, titulo: "Vida na Igreja" },
];

interface CadastroWizardProps {
  onConcluidoChange?: (concluido: boolean) => void;
}

export default function CadastroWizard({
  onConcluidoChange,
}: CadastroWizardProps) {
  const [etapaAtual, setEtapaAtual] = useState<number>(1);
  const [emConfirmacao, setEmConfirmacao] = useState<boolean>(false);
  const [formData, setFormData] = useState<CadastroFormData>(INITIAL_DATA);
  const [celulas, setCelulas] = useState<CelulaVideira[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState<boolean>(false);
  const [codigoGerado, setCodigoGerado] = useState<string | null>(null);

  useEffect(() => {
    onConcluidoChange?.(Boolean(codigoGerado) || emConfirmacao);
  }, [codigoGerado, emConfirmacao, onConcluidoChange]);

  useEffect(() => {
    async function carregarCelulas() {
      const { data, error } = await supabase
        .from("videira_celulas")
        .select("id, nome, segmento, lider, ativa")
        .eq("ativa", true)
        .order("nome", { ascending: true });

      if (!error && data) {
        setCelulas(data as CelulaVideira[]);
      }
    }
    carregarCelulas();
  }, []);

  function updateFields(fields: Partial<CadastroFormData>) {
    setFormData((prev) => ({ ...prev, ...fields }));
    if (erro) setErro(null);
  }

  function validarEtapa(etapa: number): string | null {
    if (etapa === 1) {
      if (!formData.rede) return "Selecione a rede (Kids, Jovens ou Adultos).";
      if (formData.nome_completo.trim().length < 3) {
        return "Informe o nome completo.";
      }
      if (!formData.data_nascimento) {
        return "Informe a data de nascimento.";
      }
      if (!formData.sexo) return "Selecione o sexo.";

      if (formData.rede !== "kids") {
        if (onlyDigits(formData.celular).length < 10) {
          return "Informe um número de celular válido com DDD.";
        }
        if (!formData.ocupacao) {
          return "Selecione sua ocupação atual.";
        }
        if (
          (formData.ocupacao === "trabalhando" ||
            formData.ocupacao === "outro") &&
          !formData.profissao.trim()
        ) {
          return "Informe sua profissão ou atividade.";
        }
      }
    }

    if (etapa === 2) {
      if (onlyDigits(formData.cep).length !== 8) {
        return "Informe um CEP válido com 8 dígitos.";
      }
      if (!formData.logradouro.trim()) {
        return "Informe o logradouro (rua/avenida).";
      }
      if (!formData.numero.trim()) return "Informe o número do endereço.";
      if (!formData.bairro.trim()) return "Informe o bairro.";
      if (!formData.cidade.trim() || !formData.uf.trim()) {
        return "Informe a cidade e o estado (UF).";
      }
    }

    if (etapa === 3) {
      if (formData.rede === "kids") {
        const paiOk =
          formData.pai_nome.trim() !== "" &&
          onlyDigits(formData.pai_telefone).length >= 10;
        const maeOk =
          formData.mae_nome.trim() !== "" &&
          onlyDigits(formData.mae_telefone).length >= 10;
        const respOk =
          formData.responsavel_nome.trim() !== "" &&
          onlyDigits(formData.responsavel_telefone).length >= 10;

        if (!paiOk && !maeOk && !respOk) {
          return "Informe o nome e telefone válido do pai, da mãe ou de um responsável.";
        }
      } else {
        if (!formData.estado_civil) return "Selecione o estado civil.";
        if (!formData.tem_filhos) return "Informe se possui filhos.";
        if (
          formData.tem_filhos === "sim" &&
          (!formData.quantidade_filhos ||
            Number(formData.quantidade_filhos) < 1)
        ) {
          return "Informe a quantidade de filhos.";
        }
      }
    }

    if (etapa === 4) {
      if (formData.rede !== "kids") {
        if (!formData.batizado) return "Informe se já é batizado.";
        if (!formData.encontro_com_deus) {
          return "Informe se já participou do Encontro com Deus.";
        }
      }
      if (!formData.opcao_celula) {
        return "Selecione uma opção sobre sua participação em célula.";
      }
      if (formData.opcao_celula === "cadastrada" && !formData.celula_id) {
        return "Selecione sua célula na lista.";
      }
      if (
        formData.opcao_celula === "outra" &&
        formData.celula_outra_nome.trim().length < 2
      ) {
        return "Digite o nome da sua célula ou do líder.";
      }
    }

    return null;
  }

  function handleProximo() {
    const msgErro = validarEtapa(etapaAtual);
    if (msgErro) {
      setErro(msgErro);
      return;
    }
    setEtapaAtual((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleVoltar() {
    setErro(null);
    setEtapaAtual((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleIrParaConfirmacao() {
    const msgErro = validarEtapa(4);
    if (msgErro) {
      setErro(msgErro);
      return;
    }
    setErro(null);
    setEmConfirmacao(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleVoltarDaConfirmacao() {
    setErro(null);
    setEmConfirmacao(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function executarCadastro() {
    if (enviando) return;

    if (!formData.aceite_termos) {
      setErro(
        "É necessário ler e aceitar os termos da LGPD para concluir o cadastro.",
      );
      return;
    }

    if (!formData.rede || !formData.sexo) {
      setErro("Revise os dados obrigatórios antes de concluir.");
      return;
    }

    setEnviando(true);
    setErro(null);

    const isKids = formData.rede === "kids";

    const payload: NovoMembroPayload = {
      rede: formData.rede,
      nome_completo: formData.nome_completo.trim(),
      data_nascimento: formData.data_nascimento,
      sexo: formData.sexo,
      celular: isKids ? null : onlyDigits(formData.celular) || null,
      ocupacao: isKids ? null : formData.ocupacao || null,
      profissao: isKids ? null : formData.profissao.trim() || null,

      cep: onlyDigits(formData.cep),
      logradouro: formData.logradouro.trim(),
      numero: formData.numero.trim(),
      complemento: formData.complemento.trim() || null,
      bairro: formData.bairro.trim(),
      cidade: formData.cidade.trim(),
      uf: formData.uf.trim().toUpperCase(),

      pai_nome: isKids ? formData.pai_nome.trim() || null : null,
      pai_telefone: isKids ? onlyDigits(formData.pai_telefone) || null : null,
      mae_nome: isKids ? formData.mae_nome.trim() || null : null,
      mae_telefone: isKids ? onlyDigits(formData.mae_telefone) || null : null,
      responsavel_nome: isKids
        ? formData.responsavel_nome.trim() || null
        : null,
      responsavel_telefone: isKids
        ? onlyDigits(formData.responsavel_telefone) || null
        : null,

      estado_civil: isKids ? null : formData.estado_civil || null,
      tem_filhos: isKids ? null : formData.tem_filhos === "sim",
      quantidade_filhos:
        !isKids && formData.tem_filhos === "sim"
          ? Number(formData.quantidade_filhos)
          : null,

      batizado: isKids ? null : formData.batizado === "sim",
      encontro_com_deus: isKids ? null : formData.encontro_com_deus === "sim",
      fez_cursao: isKids ? false : formData.fez_cursao,
      fez_ctl: isKids ? false : formData.fez_ctl,
      fez_apocalipse: isKids ? false : formData.fez_apocalipse,
      fez_curso_noivos: isKids ? false : formData.fez_curso_noivos,
      fez_casais_radicais: isKids ? false : formData.fez_casais_radicais,
      fez_criacao_filhos: isKids ? false : formData.fez_criacao_filhos,
      fez_financas: isKids ? false : formData.fez_financas,

      celula_id:
        formData.opcao_celula === "cadastrada" ? formData.celula_id : null,
      celula_status_ou_outra:
        formData.opcao_celula === "nao_participa"
          ? "nao_participa"
          : formData.opcao_celula === "outra"
            ? formData.celula_outra_nome.trim()
            : null,

      aceite_termos: true,
    };

    try {
      const { error } = await supabase.from("videira_membros").insert(payload);

      if (error) {
        setEnviando(false);
        if (error.code === "23505") {
          setErro(
            isKids
              ? "Já existe um cadastro Kids com este nome, data de nascimento e telefone do responsável."
              : "Este número de celular já está cadastrado na base de membros.",
          );
        } else {
          setErro(`Erro ao salvar cadastro: ${error.message}`);
        }
        return;
      }

      setEnviando(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCodigoGerado("CONCLUIDO");
    } catch {
      setEnviando(false);
      setErro("Falha de conexão ao enviar o cadastro. Tente novamente.");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (emConfirmacao) {
      executarCadastro();
    } else if (etapaAtual === 4) {
      handleIrParaConfirmacao();
    }
  }

  function handleNovoCadastro() {
    setFormData(INITIAL_DATA);
    setCodigoGerado(null);
    setEmConfirmacao(false);
    setEnviando(false);
    setEtapaAtual(1);
    setErro(null);
  }

  if (codigoGerado) {
    return (
      <TelaSucesso
        nomeCompleto={formData.nome_completo}
        rede={formData.rede || "adultos"}
        onNovoCadastro={handleNovoCadastro}
      />
    );
  }

  const percentualBarra = emConfirmacao
    ? 100
    : Math.round((etapaAtual / 4) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-white/15 overflow-hidden">
      {/* Barra de Progresso */}
      <div className="bg-[#1B263B] text-white px-6 py-4">
        <div className="flex items-center justify-between text-xs font-medium mb-2">
          <span>
            {emConfirmacao
              ? "Confirmação Final — Revisão dos Dados e LGPD"
              : `Etapa ${etapaAtual} de 4 — ${ETAPAS[etapaAtual - 1].titulo}`}
          </span>
          <span>{percentualBarra}%</span>
        </div>
        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
          <div
            className="bg-videira-gradiente h-full transition-all duration-300"
            style={{ width: `${percentualBarra}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        {erro && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-medium">
            {erro}
          </div>
        )}

        {emConfirmacao ? (
          <ConfirmacaoCadastro
            formData={formData}
            celulas={celulas}
            enviando={enviando}
            onVoltar={handleVoltarDaConfirmacao}
            onToggleTermos={(aceito) => updateFields({ aceite_termos: aceito })}
            onConfirmarEnvio={executarCadastro}
          />
        ) : (
          <>
            {etapaAtual === 1 && (
              <Step1DadosPessoais
                formData={formData}
                updateFields={updateFields}
              />
            )}

            {etapaAtual === 2 && (
              <Step2Endereco formData={formData} updateFields={updateFields} />
            )}

            {etapaAtual === 3 && (
              <Step3Familia formData={formData} updateFields={updateFields} />
            )}

            {etapaAtual === 4 && (
              <Step4VidaIgreja
                formData={formData}
                updateFields={updateFields}
                celulas={celulas}
              />
            )}

            {/* Botões de Navegação */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              {etapaAtual > 1 ? (
                <button
                  type="button"
                  onClick={handleVoltar}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Voltar
                </button>
              ) : (
                <div />
              )}

              {etapaAtual < 4 ? (
                <button
                  type="button"
                  onClick={handleProximo}
                  className="px-6 py-2.5 rounded-xl bg-[#5B2C83] hover:bg-[#461F66] text-white font-semibold transition-colors cursor-pointer"
                >
                  Próxima Etapa
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleIrParaConfirmacao}
                  className="px-6 py-2.5 rounded-xl bg-[#5B2C83] hover:bg-[#461F66] text-white font-semibold transition-colors cursor-pointer"
                >
                  Finalizar
                </button>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
}
