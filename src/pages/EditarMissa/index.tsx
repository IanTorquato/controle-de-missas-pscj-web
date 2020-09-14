import React, { useState, useEffect } from 'react'

import Sucesso from '../../components/Sucesso'
import FormMissas from '../../components/FormMissas'
import Footer from '../../components/Footer'
import api from '../../services/api'

//import './styles.css'

interface Missa {
	id: number
	local_id: number
	data: string
	hora: string
	max_pessoas: number
	pessoas_cadastradas: number
}

interface DataMissa {
	data: string
	hora: string
}

const EditarMissa = () => {
	const [missas, setMissas] = useState<Missa[]>([])
	// const [missa_id, setMissa_id] = useState(0)
	// const [local_id, setLocal_id] = useState(0)
	// const [max_pessoas, setMax_pessoas] = useState(0)
	// const [dataMissa, setDataMissa] = useState<DataMissa>({} as DataMissa)

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
			<Sucesso />

			{
				!missas[0] ? <section className="secCadastrarEditar"></section> :
					<FormMissas titulo="Editando..." txtBtn="Editar" missa={missas[0]} mensagemDireita="Eu avisei! [Risos]" />
			}

			<Footer />
		</>
	)
}

export default EditarMissa