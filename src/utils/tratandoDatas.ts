import { parseISO, format } from 'date-fns'

import Missa from './interfaces'

function transformaEmData(missa: Missa) {
	return parseISO(`${missa.data.replace(/[/]/g, '-')}T${missa.hora}`)
}

// Cadastro Edição (mínimo select e defaultValue select) ==> 2020-10-22T10:00
export function formatParaSelect(missa?: Missa) {
	if (missa) {
		return `${missa.data.replace(/[/]/g, '-')}T${missa.hora}`
	}

	return format(new Date(), "yyyy-MM-dd'T'HH:mm")
}

// Home e Lista ==> data: "22/10" e hora: "10:00"
export function formatDiaMesHora(missas: Missa[]) {
	return missas.map(missa => {
		const formatDataMissa = format(transformaEmData(missa), "dd/MM HH:mm").split(' ')

		return { ...missa, data: formatDataMissa[0], hora: formatDataMissa[1] }
	})
}

// Banco e Cadastro Edição (clicouData) ==> data: "2020/10/22" e hora: "10:00"
export function formatParaBanco(missas?: Missa[], dataInput?: Date) {
	if (missas) {
		return missas.map(missa => {
			const formatDataMissa = format(transformaEmData(missa), "yyyy/MM/dd HH:mm").split(' ')

			return { ...missa, data: formatDataMissa[0], hora: formatDataMissa[1] }
		})
	}

	if (dataInput) {
		const dataInputCortada = format(dataInput, "yyyy/MM/dd HH:mm").split(' ')

		return { data: dataInputCortada[0], hora: dataInputCortada[1] }
	}
}