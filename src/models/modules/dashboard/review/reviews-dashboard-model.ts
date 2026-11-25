interface AutorApiDTO {
  id: number
  nome_usuario: string
}

interface LocaleApiDTO {
  endereco: string
  cidade: string
  estado: string
}

export interface ReviewsModuleSummaryResponse {
  totalReviews: number
  common: {
    percentage: number
    count: number
  }
  reported: {
    percentage: number
    count: number
  }
  blocked: {
    percentage: number
    count: number
  }
}

export interface ReviewMostReportedCurrently {
  id?: number
  id_usuario: number
  descricao: string
  createdAt: string
  qnt_likes: number
  qnt_dislikes: number
  qnt_denuncia: number
  qnt_favoritos: number
  nota: number
  autor: AutorApiDTO
  lugar: LocaleApiDTO
  denuncias_abertas: number
}
