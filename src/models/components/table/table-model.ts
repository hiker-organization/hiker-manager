export interface TableColumn {
  label: string
  value: string
  type: string
}

export interface TableRow {
  [key: string]: unknown
}
