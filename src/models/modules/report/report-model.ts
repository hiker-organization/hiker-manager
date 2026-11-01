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

export interface Report {
  id?: number
  categoria: string
  descricao: string
  createdAt: string
  status: 'ATIVA' | 'FECHADA'
  id_usuario: number
  autor: AutorApiDTO
  id_review: number
  review: ReviewApiDTO
}
