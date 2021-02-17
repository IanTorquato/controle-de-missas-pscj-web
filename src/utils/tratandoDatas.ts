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

	return missas.map(missa => {
		const data_hora = process.env.REACT_APP_URL_BANCO === 'http://localhost:3333'
			? format(utcToZonedTime(missa.data_hora, 'America/Sao_Paulo'), formato)
			: missa.data_hora.replace(':00.000Z', '')

		return { ...missa, data_hora, dia_semana: retornaDiaSemana(missa.data_hora) }
	})
}

export { formatDataHoraMissas }