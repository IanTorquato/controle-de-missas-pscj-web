import { parseISO, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Missa } from './interfaces'

const diasSemana = ['DOMINGO', 'SEGUNDA-FEIRA', 'TERÇA-FEIRA', 'QUARTA-FEIRA', 'QUINTA-FEIRA', 'SEXTA-FEIRA', 'SÁBADO']

// Home e Lista ==> data: "22/10" e hora: "10:00"
export function formatDiaMesHora(missas: Missa[]) {
	return missas.map(missa => {
		const dataMissa = parseISO(missa.data_hora)

		const data_hora = format(dataMissa, "dd/MM'T'HH:mm", { locale: ptBR })

		return { ...missa, data_hora, dia_semana: diasSemana[dataMissa.getDay()] }
	})
}

// Detalhes ==> data: "22/10/2021" e hora: "10:00"
export function formatDataHora(missas: Missa[]) {
	return missas.map(missa => {
		const dataMissa = parseISO(missa.data_hora)

		const data_hora = format(dataMissa, "dd/MM/yyyy'T'HH:mm", { locale: ptBR })

		return { ...missa, data_hora, dia_semana: diasSemana[dataMissa.getDay()] }
	})
}