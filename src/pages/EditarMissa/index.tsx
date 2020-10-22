import React, { useState, useEffect } from 'react'

import api from '../../services/api'
import FormMissas from '../../components/FormMissas'
import Footer from '../../components/Footer'
import Missa from '../../utils/interfaces'

const EditarMissa = () => {
	const [missas, setMissas] = useState<Missa[]>([])
	const [MOSTRA, setMOSTRA] = useState(0)

	useEffect(() => {
		api.get('missas?quantMissas=1')
			.then(({ data }) => setMissas(data))
			.catch(({ response }) => {
				console.log(response)
				alert(response.data.erro || 'Falha ao listar missa para editar.')
			})
	}, [])

	return (
		<>
			<button type="button" onClick={() => setMOSTRA(1)} style={{ color: "#000" }}>MOSTRAR</button>

			{MOSTRA && <FormMissas titulo="Editando..." txtBtn="Editar" missa={missas[0]} mensagemDireita="Eu avisei! [Risos]" />}

			<Footer />
		</>
	)
}

export default EditarMissa