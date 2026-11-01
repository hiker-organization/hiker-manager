interface AutorApiDTO {
  nome_usuario: string
}

interface LocaleApiDTO {
  cidade: string
  nome: string
  sigla_estado: string
}

interface TagApiDTO {
  tag: {
    descritivo: string
  }
}

export interface ReviewListRow {
  id?: number
  descricao: string
  createdAt: string
  qnt_denuncia: number
  autor: AutorApiDTO
  lugar: LocaleApiDTO
  tags: Array<TagApiDTO>
}
