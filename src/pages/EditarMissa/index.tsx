import React, { useState, useEffect } from 'react'

import FormMissas from '../../components/FormMissas'
import Footer from '../../components/Footer'
import api from '../../services/api'

interface Missa {
	id: number
	nome: string
	local_id: number
	data: string
	hora: string
	max_pessoas: number
	pessoas_cadastradas: number
}

const EditarMissa = () => {
	const [missas, setMissas] = useState<Missa[]>([])

	useEffect(() => {
		api.get('missas?quantMissas=1').then(response => {
			setMissas(response.data.map((missa: Missa) => {
				const dataCortada = missa.data.split('/')
				missa.data = `${dataCortada[2]}/${dataCortada[1]}/${dataCortada[0]}`

				return missa
			}))
		})
	}, [])

	return (
		<>
			{
				!missas[0] ? <section className="secCadastrarEditar"></section> :
					<FormMissas titulo="Editando..." txtBtn="Editar" missa={missas[0]} mensagemDireita="Eu avisei! [Risos]" />
			}

			<Footer />
		</>
	)
}

export default EditarMissa