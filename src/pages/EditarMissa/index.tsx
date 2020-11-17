import React, { useState, useEffect } from 'react'

import api from '../../services/api'
import FormMissas from '../../components/FormMissas'
import Missa from '../../utils/interfaces'
import { useParams } from 'react-router-dom'

interface RouteParams {
	id: string
}

const EditarMissa = () => {
	const [missa, setMissa] = useState<Missa | null>(null)

	const { id } = useParams<RouteParams>()

	useEffect(() => {
		api.get(`missas?missa_id=${id}`)
			.then(({ data }) => setMissa(data))
			.catch(({ response }) => {
				console.log(response)
				alert(response?.data.erro || 'Falha ao listar uma única missa.')
			})
	}, [id])

	return (
		missa && <FormMissas titulo="Editando..." txtBtn="Editar" missa={missa} mensagemDireita="Eu avisei! [Risos]" />
	)
}

export default EditarMissa