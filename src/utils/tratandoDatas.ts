import { parseISO, format } from 'date-fns'

import Missa from './interfaces'

// Cadastro Edição (mínimo select e defaultValue select) ==> 2020-10-22T10:00
export function formatParaSelect(missa?: Missa) {
	if (missa) {
		return `${missa.data.replace(/[/]/g, '-')}T${missa.hora}`
	}

	return format(new Date(), "yyyy-MM-dd'T'HH:mm")
}

// Home e Lista ==> data: "22/10" e hora: "10:00"
export function formatDiaMesHora(missa: Missa) {
	const dataMissa = parseISO(`${missa.data}T${missa.hora}`)

	const formatDataMissa = format(dataMissa, "dd/MM HH:mm").split(' ')

	const missaSerializada = { ...missa, data: formatDataMissa[0], hora: formatDataMissa[1] }

	return { missaSerializada, dataMissa }
}

// Banco e Cadastro Edição (clicouData) ==> data: "2020/10/22" e hora: "10:00"
export function formatParaBanco(missas?: Missa[], dataInput?: Date) {
	if (missas) {
		return missas.map(missa => {
			const formatDataMissa = format(parseISO(`${missa.data}T${missa.hora}`), "yyyy/MM/dd HH:mm").split(' ')

			return { ...missa, data: formatDataMissa[0], hora: formatDataMissa[1] }
		})
	}

	if (dataInput) {
		const dataInputCortada = format(dataInput, "yyyy/MM/dd HH:mm").split(' ')

		return { data: dataInputCortada[0], hora: dataInputCortada[1] }
	}
}