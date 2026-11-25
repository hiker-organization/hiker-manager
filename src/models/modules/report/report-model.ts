interface AutorApiDTO {
  nome_usuario: string
}

interface ReviewApiDTO {
  descricao: string
  createdAt: string
  autor: {
    id: number
    nome_usuario: string
  }
}

export interface ReportListRow {
  id?: number
  categoria: string
  descricao: string
  createdAt: string
  status: ReportStatus
  // Decisão que fechou a denúncia. Nula nas abertas e nas fechadas antes de ser registrada.
  decisao: Exclude<ReportModerationStats, 'ANALISE'> | null
  revisado_em: string | null
  revisor: AutorApiDTO | null
  id_usuario: number
  autor: AutorApiDTO
  id_review: number
  review: ReviewApiDTO
}

export type ReportModerationStats = 'AUTORIZADA' | 'OFENSIVA' | 'ANALISE'

export type ReportStatus = 'ATIVA' | 'FECHADA'

// Tabelas exibidas na página: ativas, fechadas ou as duas.
export type ReportFilterStats = 'TODAS' | 'ATIVAS' | 'FECHADAS'

export interface ReportModerationParameters {
  status: Omit<ReportModerationStats, 'ANALISE'>
}
