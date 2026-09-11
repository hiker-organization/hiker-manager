import type { TableColumn, TableRow } from "@/models/table/table-model"

const pseudoColumns: Array<TableColumn> = [
  {
    label: 'ID',
    value: 'id',
  },
  {
    label: 'Nome',
    value: 'nome',
  },
  {
    label: 'Cidade',
    value: 'cidade',
  },
]

const pseudoRows: Array<TableRow> = [
  {
    id: 1,
    nome: 'Pablo Valentin',
    cidade: 'Jaú',
  },
  {
    id: 2,
    nome: 'Vinícius Cruz Cassemira',
    cidade: 'Itaju',
  },
  {
    id: 3,
    nome: 'Gabriel Henrique Souza',
    cidade: 'Bauru',
  },
  {
    id: 4,
    nome: 'Lucas Gabriel Oliveira',
    cidade: 'Bariri',
  },
  {
    id: 5,
    nome: 'Mariana Alves Santos',
    cidade: 'Pederneiras',
  },
  {
    id: 6,
    nome: 'Rafael Augusto Lima',
    cidade: 'Dois Córregos',
  },
  {
    id: 7,
    nome: 'Beatriz Fernanda Costa',
    cidade: 'Bocaina',
  },
  {
    id: 8,
    nome: 'João Pedro Martins',
    cidade: 'Igaraçu do Tietê',
  },
  {
    id: 9,
    nome: 'Ana Clara Rodrigues',
    cidade: 'Barra Bonita',
  },
  {
    id: 10,
    nome: 'Matheus Henrique Silva',
    cidade: 'Mineiros do Tietê',
  },
  {
    id: 11,
    nome: 'Larissa Vitória Oliveira',
    cidade: 'São Manuel',
  },
  {
    id: 12,
    nome: 'Gustavo Felipe Almeida',
    cidade: 'Lençóis Paulista',
  },
  {
    id: 13,
    nome: 'Camila Beatriz Ferreira',
    cidade: 'Macatuba',
  },
  {
    id: 14,
    nome: 'Eduardo Vinícius Ramos',
    cidade: 'Areiópolis',
  },
  {
    id: 15,
    nome: 'Juliana Martins Carvalho',
    cidade: 'Agudos',
  },
  {
    id: 16,
    nome: 'Bruno César Mendes',
    cidade: 'Bauru',
  },
  {
    id: 17,
    nome: 'Isabela Cristina Souza',
    cidade: 'Jaú',
  },
  {
    id: 18,
    nome: 'Felipe André Barbosa',
    cidade: 'Itapuí',
  },
  {
    id: 19,
    nome: 'Letícia Gabriela Santos',
    cidade: 'Brotas',
  },
  {
    id: 20,
    nome: 'Daniel Henrique Castro',
    cidade: 'Torrinha',
  },
  {
    id: 21,
    nome: 'Amanda Vitória Martins',
    cidade: 'Dourado',
  },
  {
    id: 22,
    nome: 'Thiago Rafael Oliveira',
    cidade: 'Dois Córregos',
  },
  {
    id: 23,
    nome: 'Carolina Mendes Ferreira',
    cidade: 'Jaú',
  },
  {
    id: 24,
    nome: 'Rodrigo Augusto Pereira',
    cidade: 'Bariri',
  },
  {
    id: 25,
    nome: 'Manuela Beatriz Lima',
    cidade: 'Bocaina',
  },
  {
    id: 26,
    nome: 'Diego Henrique Santos',
    cidade: 'Pederneiras',
  },
  {
    id: 27,
    nome: 'Sofia Vitória Almeida',
    cidade: 'Barra Bonita',
  },
  {
    id: 28,
    nome: 'Leonardo Gabriel Costa',
    cidade: 'Itaju',
  },
  {
    id: 29,
    nome: 'Nicole Fernanda Silva',
    cidade: 'Bauru',
  },
  {
    id: 30,
    nome: 'André Luiz Rodrigues',
    cidade: 'São Carlos',
  },
  {
    id: 31,
    nome: 'Valentina Alves Martins',
    cidade: 'Araraquara',
  },
  {
    id: 32,
    nome: 'Henrique César Oliveira',
    cidade: 'Campinas',
  },
  {
    id: 33,
    nome: 'Laura Gabriela Souza',
    cidade: 'Ribeirão Preto',
  },
  {
    id: 34,
    nome: 'Caio Vinícius Ferreira',
    cidade: 'Piracicaba',
  },
  {
    id: 35,
    nome: 'Bianca Cristina Ramos',
    cidade: 'Botucatu',
  },
  {
    id: 36,
    nome: 'Arthur Felipe Mendes',
    cidade: 'Lençóis Paulista',
  },
  {
    id: 37,
    nome: 'Melissa Vitória Carvalho',
    cidade: 'Agudos',
  },
  {
    id: 38,
    nome: 'Pedro Henrique Barbosa',
    cidade: 'Jaú',
  },
  {
    id: 39,
    nome: 'Alice Fernanda Castro',
    cidade: 'Bauru',
  },
  {
    id: 40,
    nome: 'Murilo Augusto Pereira',
    cidade: 'Bariri',
  },
  {
    id: 41,
    nome: 'Clara Beatriz Lima',
    cidade: 'Itapuí',
  },
  {
    id: 42,
    nome: 'João Vitor Mendes',
    cidade: 'Pederneiras',
  },
  {
    id: 43,
    nome: 'Emanuelly Cristina Santos',
    cidade: 'Macatuba',
  },
  {
    id: 44,
    nome: 'Guilherme Rafael Costa',
    cidade: 'Bocaina',
  },
  {
    id: 45,
    nome: 'Heloísa Gabriela Ferreira',
    cidade: 'Barra Bonita',
  },
  {
    id: 46,
    nome: 'Samuel Henrique Almeida',
    cidade: 'Dois Córregos',
  },
  {
    id: 47,
    nome: 'Yasmin Vitória Rodrigues',
    cidade: 'São Manuel',
  },
  {
    id: 48,
    nome: 'Nicolas André Oliveira',
    cidade: 'Mineiros do Tietê',
  },
  {
    id: 49,
    nome: 'Luana Fernanda Martins',
    cidade: 'Igaraçu do Tietê',
  },
  {
    id: 50,
    nome: 'Enzo Gabriel Souza',
    cidade: 'Torrinha',
  },
]

export { pseudoColumns, pseudoRows }
