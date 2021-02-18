import { parseISO } from 'date-fns'
import { format, utcToZonedTime } from 'date-fns-tz'

import { Missa } from './interfaces'

const diasSemana = ['DOMINGO', 'SEGUNDA-FEIRA', 'TERÇA-FEIRA', 'QUARTA-FEIRA', 'QUINTA-FEIRA', 'SEXTA-FEIRA', 'SÁBADO']

function retornaDiaSemana(dataMissa: string) {
	const diaSemana = parseISO(dataMissa).getDay()

	return diasSemana[diaSemana]
}

function formatDataHoraMissas(missas: Missa[], dataComAno = false) {
	const formato = dataComAno ? "dd/MM/yyyy'T'HH:mm" : "dd/MM'T'HH:mm"
	const local = process.env.REACT_APP_URL_BANCO === 'http://localhost:3333' ? 'America/Sao_Paulo' : 'Europe/London'

	return missas.map(missa => {
		const data_hora = format(utcToZonedTime(missa.data_hora, local), formato)

		return { ...missa, data_hora, dia_semana: retornaDiaSemana(missa.data_hora) }
	})
}

// 2021-02-22T20:00
function dataParaSelect(dataHora: string) {
	const [data, hora] = dataHora.split('T')
	const [dia, mes, ano] = data.split('/')

	return `${ano}-${mes}-${dia}T${hora}`
}

export { dataParaSelect, formatDataHoraMissas }