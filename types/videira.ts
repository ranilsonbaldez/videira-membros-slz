export type RedeVideira = "kids" | "jovens" | "adultos";
export type Sexo = "masculino" | "feminino";
export type Ocupacao = "estudante" | "universitario" | "trabalhando" | "outro";
export type EstadoCivil = "solteiro" | "casado" | "viuvo" | "divorciado";
export type OpcaoCelula = "cadastrada" | "nao_participa" | "outra";

export interface CelulaVideira {
  id: string;
  nome: string;
  segmento: RedeVideira;
  lider: string | null;
  ativa: boolean;
}

export interface NovoMembroPayload {
  rede: RedeVideira;
  nome_completo: string;
  data_nascimento: string;
  sexo: Sexo;
  celular?: string | null;
  ocupacao?: Ocupacao | null;
  profissao?: string | null;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string | null;
  bairro: string;
  cidade: string;
  uf: string;
  pai_nome?: string | null;
  pai_telefone?: string | null;
  mae_nome?: string | null;
  mae_telefone?: string | null;
  responsavel_nome?: string | null;
  responsavel_telefone?: string | null;
  estado_civil?: EstadoCivil | null;
  tem_filhos?: boolean | null;
  quantidade_filhos?: number | null;
  batizado?: boolean | null;
  encontro_com_deus?: boolean | null;
  fez_cursao?: boolean;
  fez_ctl?: boolean;
  fez_apocalipse?: boolean;
  fez_curso_noivos?: boolean;
  fez_casais_radicais?: boolean;
  fez_criacao_filhos?: boolean;
  fez_financas?: boolean;
  celula_id?: string | null;
  celula_status_ou_outra?: string | null;
  aceite_termos: boolean;
}

export interface CadastroFormData {
  // Etapa 1
  rede: RedeVideira | "";
  nome_completo: string;
  data_nascimento: string;
  sexo: Sexo | "";
  celular: string;
  ocupacao: Ocupacao | "";
  profissao: string;

  // Etapa 2
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;

  // Etapa 3
  pai_nome: string;
  pai_telefone: string;
  mae_nome: string;
  mae_telefone: string;
  responsavel_nome: string;
  responsavel_telefone: string;
  estado_civil: EstadoCivil | "";
  tem_filhos: "sim" | "nao" | "";
  quantidade_filhos: string;

  // Etapa 4
  batizado: "sim" | "nao" | "";
  encontro_com_deus: "sim" | "nao" | "";
  fez_cursao: boolean;
  fez_ctl: boolean;
  fez_apocalipse: boolean;
  fez_curso_noivos: boolean;
  fez_casais_radicais: boolean;
  fez_criacao_filhos: boolean;
  fez_financas: boolean;
  opcao_celula: OpcaoCelula | "";
  celula_id: string;
  celula_outra_nome: string;
  aceite_termos: boolean;
}
