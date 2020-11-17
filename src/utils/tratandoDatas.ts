import { parseISO, format } from 'date-fns'

import Missa from './interfaces'

// Home e Lista ==> data: "22/10" e hora: "10:00"
export function formatDiaMesHora(missa: Missa) {
	const dataMissa = parseISO(`${missa.data}T${missa.hora}`)

	const formatDataMissa = format(dataMissa, "dd/MM HH:mm").split(' ')

	const missaSerializada = { ...missa, data: formatDataMissa[0], hora: formatDataMissa[1] }

	return { missaSerializada, dataMissa }
}

// Detalhes ==> data: "22/10/2021" e hora: "10:00"
export function formatDataHora(missa: Missa) {
	const dataMissa = parseISO(`${missa.data}T${missa.hora}`)

	const formatDataMissa = format(dataMissa, "dd/MM/yyyy HH:mm").split(' ')

	const missaSerializada = { ...missa, data: formatDataMissa[0], hora: formatDataMissa[1] }

	return { missaSerializada, dataMissa }
}