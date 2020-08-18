import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react'

import './styles.css'
import Footer from '../../components/Footer'
import Sucesso from '../../components/Sucesso'
import api from '../../services/api_node'

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
	const [missa_id, setMissa_id] = useState(0)
	const [local_id, setLocal_id] = useState(0)
	const [max_pessoas, setMax_pessoas] = useState(0)
	const [dataMissa, setDataMissa] = useState<DataMissa>({} as DataMissa)

	useEffect(() => {
		api.get('missas').then(response => {
			setMissas(response.data.map((missa: Missa) => {
				const dataCortada = missa.data.split('/')
				missa.data = `${dataCortada[2]}/${dataCortada[1]}/${dataCortada[0]}`

				return missa
			}))
		})
	}, [])

	function clicouMissa(event: ChangeEvent<HTMLSelectElement>) {
		setMissa_id(Number(event.target.value))

		const { local_id, max_pessoas, data, hora } = missas[event.target.selectedIndex - 1] ||
			{ local_id: 0, max_pessoas: 0, data: '01/01/0001', hora: '00:00' }

		const setarData = { data, hora }

		setLocal_id(local_id)
		setMax_pessoas(max_pessoas)
		setDataMissa(setarData)

		const selectLocal = document.querySelector<HTMLSelectElement>('.local')
		const inputMaxP = document.querySelector<HTMLInputElement>('.maxPessoas')
		const inputData = document.querySelector<HTMLInputElement>('.dataHora')

		if (selectLocal !== null) {
			selectLocal.value = local_id.toString()
		}

		if (inputMaxP !== null) {
			inputMaxP.value = max_pessoas.toString()
		}

		if (inputData !== null) {
			const dataCortada = data.split('/')

			inputData.value = `${dataCortada[2]}-${dataCortada[1]}-${dataCortada[0]}T${hora}`
		}
	}

	function clicouLocal(event: ChangeEvent<HTMLSelectElement>) { setLocal_id(Number(event.target.value)) }

	function digitouMaxP(event: ChangeEvent<HTMLInputElement>) { setMax_pessoas(Number(event.target.value)) }

	function clicouData(event: ChangeEvent<HTMLInputElement>) {
		const dataHoraMissa = new Date(event.target.value)

		const anoMissa = dataHoraMissa.getFullYear()
		let mesMissa = (dataHoraMissa.getMonth() + 1).toString()
		let diaMissa = (dataHoraMissa.getDate()).toString()
		let horaMissa = (dataHoraMissa.getHours()).toString()
		let minutosMissa = (dataHoraMissa.getMinutes()).toString()

		function validaQuantNum(campo: string) {
			if (campo.length === 1) { campo = `0${campo}` }

			return campo
		}

		mesMissa = validaQuantNum(mesMissa)
		diaMissa = validaQuantNum(diaMissa)
		horaMissa = validaQuantNum(horaMissa)
		minutosMissa = validaQuantNum(minutosMissa)

		setDataMissa({ data: `${diaMissa}/${mesMissa}/${anoMissa}`, hora: `${horaMissa}:${minutosMissa}` })
	}

	async function handleSubmit(event: FormEvent) {
		event.preventDefault()

		let { data, hora } = dataMissa

		// Verificações de Entrada de Dados
		if (missa_id === 0) {
			alert('[ERRO] O campo "Missa" é obrigatório!')
			return
		}

		if (local_id === 0) {
			alert('[ERRO] O campo "Local" é obrigatório!')
			return
		}

		if (data === undefined) {
			alert('[ERRO] O campo "Data e Horário" é obrigatório!')
			return
		}
		if (max_pessoas <= 0) {
			alert('[ERRO] O campo "Quantidade Máxima de Pessoas" não pode ser Nulo ou Negativo!')
			return
		}

		const dataCortada = data.split('/')
		data = `${dataCortada[2]}/${dataCortada[1]}/${dataCortada[0]}`
		const dadosMissa = { missa_id, local_id, data, hora, max_pessoas }

		await api.put('missas', dadosMissa)

		window.scrollTo(0, 0)
		window.onscroll = () => (window.scrollTo(0, 0))
		const teste = document.body.querySelector<HTMLDivElement>('div.divSucesso')
		if (teste) teste.style.zIndex = '1'
	}

	return (
		<>
			<div className="imgFundo">
				<Sucesso />
				<section className="secEditar">
					<form onSubmit={handleSubmit}>
						<h1>EDITAR MISSA</h1>
						<hr />

						<fieldset className="fieldsetEditar">
							<legend>
								<h2>Missas Cadastradas</h2>
							</legend>

							<div className="field">
								<select name="missa" className="missa" onChange={clicouMissa}>
									<option value="0">Selecione uma Missa</option>
									{missas.map(missa => (
										<option value={missa.id} key={missa.id}>
											{missa.local_id === 1 ? 'Centro' : 'Termas'} - {missa.data.slice(0, 5)} - {missa.hora}
										</option>
									))}
								</select>
							</div>
						</fieldset>

						<fieldset className="fieldsetEditar">
							<legend>
								<h2>Local e Quantidade Máxima de Pessoas</h2>
							</legend>

							<div className="field">
								<select name="local" className="local" onChange={clicouLocal}>
									<option value="0" disabled selected hidden>Selecione um Local</option>
									<option value="1">Centro</option>
									<option value="2">Termas</option>
								</select>

								<input type="number" name="maxPessoas" className="maxPessoas" defaultValue={0} onChange={digitouMaxP} />
							</div>
						</fieldset>

						<fieldset className="fieldsetEditar">
							<legend>
								<h2>Data e Horário</h2>
							</legend>

							<div className="field">
								<input type="datetime-local" name="dataHora" className="dataHora" onChange={clicouData} />
							</div>
						</fieldset>

						<button type="submit" className="editarMissa">Editar Missa</button>
					</form>
				</section>
			</div>
			<Footer />
		</>
	)
}

export default EditarMissa