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
		const data_hora = format(utcToZonedTime(missa.data_hora, 'America/Sao_Paulo'), formato)

		return { ...missa, data_hora, dia_semana: retornaDiaSemana(missa.data_hora) }
	})
}

export { formatDataHoraMissas }