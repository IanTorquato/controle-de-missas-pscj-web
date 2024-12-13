import { Missa } from "../interfaces";

const anoAtual = new Date().getFullYear()

const imgDentroIgrejaCentro = `${process.env.REACT_APP_URL_FRONT}/assets/dentroIgrejaCentro.jpg`
const imgIgrejaCentroFrente = `${process.env.REACT_APP_URL_FRONT}/assets/igrejaCentroFrente.png`
const imgIgrejaCentroLateral = `${process.env.REACT_APP_URL_FRONT}/assets/igrejaCentroLateral.jpg`

const imgIgrejaTermas = `${process.env.REACT_APP_URL_FRONT}/assets/igrejaTermas.jpg`

export const mockedMissas: Missa[] = [
  {
    data_hora: `${anoAtual}-07-06T22:00:00.000Z`,
    dia_semana: 'Quarta-feira',
    id: 1,
    local_id: 1,
    local_nome: 'Termas',
    local_url: imgIgrejaTermas,
    max_pessoas: 100,
    nome: 'Missa Comum',
    pessoas_cadastradas: 56
  },
  {
    data_hora: `${anoAtual}-08-14T22:00:00.000Z`,
    dia_semana: 'Quinta-feira',
    id: 2,
    local_id: 2,
    local_nome: 'Centro',
    local_url: imgDentroIgrejaCentro,
    max_pessoas: 200,
    nome: 'Missa Comum',
    pessoas_cadastradas: 120
  },
  {
    data_hora: `${anoAtual}-11-16T13:30:00.000Z`,
    dia_semana: 'Sexta-feira',
    id: 3,
    local_id: 2,
    local_nome: 'Centro',
    local_url: imgIgrejaCentroFrente,
    max_pessoas: 200,
    nome: 'Casamento',
    pessoas_cadastradas: 80
  },
  {
    data_hora: `${anoAtual}-12-24T22:00:00.000Z`,
    dia_semana: 'Sábado',
    id: 4,
    local_id: 2,
    local_nome: 'Centro',
    local_url: imgIgrejaCentroLateral,
    max_pessoas: 250,
    nome: 'Missa de Natal',
    pessoas_cadastradas: 0
  },
  {
    data_hora: `${anoAtual}-12-25T12:00:00.000Z`,
    dia_semana: 'Domingo',
    id: 5,
    local_id: 2,
    local_nome: 'Centro',
    local_url: imgDentroIgrejaCentro,
    max_pessoas: 250,
    nome: 'Missa de Natal',
    pessoas_cadastradas: 250
  },
  {
    data_hora: `${anoAtual}-12-31T22:00:00.000Z`,
    dia_semana: 'Sábado',
    id: 6,
    local_id: 2,
    local_nome: 'Centro',
    local_url: imgIgrejaCentroFrente,
    max_pessoas: 200,
    nome: 'Missa da Virada',
    pessoas_cadastradas: 0
  }
]
