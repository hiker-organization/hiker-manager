interface AutorApiDTO {
  nome_usuario: string
}

interface LocaleApiDTO {
  cidade: string
  nome: string
  sigla_estado: string
}

interface ClassificationApiDTO {
  probabilidade: number
  modelo_versao: string
  revisado_em: string | null
  decisao_admin: AutoBlockModerationStats | null
  revisor: AutorApiDTO | null
}

export interface AutoBlockedReviewListRow {
  id?: number
  descricao: string
  status: AutoBlockModerationStats
  createdAt: string
  autor: AutorApiDTO
  lugar: LocaleApiDTO
  classificacao: ClassificationApiDTO
}

export type AutoBlockModerationStats = 'AUTORIZADA' | 'OFENSIVA'

// Valores do filtro "pendentes" da API, em string porque vêm da URL.
// 'true' lista as pendentes e 'false' as já revisadas (liberadas ou mantidas).
export type AutoBlockedReviewFilterStats = 'true' | 'false'

export interface AutoBlockModerationParameters {
  status: AutoBlockModerationStats
}
