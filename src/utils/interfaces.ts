export interface Missa {
  id: number
  nome: string
  local_id: number
  data_hora: string
  dia_semana: string
  max_pessoas: number
  pessoas_cadastradas: number
  local_nome: string
  local_url: string
}

export interface Local {
  id: number
  nome: string
}
