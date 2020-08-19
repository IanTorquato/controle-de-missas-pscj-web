import React, { useState, FormEvent, ChangeEvent } from 'react'

import './styles.css'
import Footer from '../../components/Footer'
import Sucesso from '../../components/Sucesso'
import api from '../../services/api'

interface DataMissa {
	data: string
	hora: string
}

const CadastrarMissa = () => {
	const [local_id, setLocal_id] = useState(0)
	const [max_pessoas, setMax_pessoas] = useState(0)
	const [dataMissa, setDataMissa] = useState<DataMissa>({} as DataMissa)

	function clicouLocal(event: ChangeEvent<HTMLSelectElement>) { setLocal_id(event.target.selectedIndex) }

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

		setDataMissa({ data: `${anoMissa}/${mesMissa}/${diaMissa}`, hora: `${horaMissa}:${minutosMissa}` })
	}

	async function handleSubmit(event: FormEvent) {
		event.preventDefault()

		const { data, hora } = dataMissa

		// Verificações de Entrada de Dados
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

		const dadosMissa = { local_id, data, hora, max_pessoas }

		await api.post('missas', dadosMissa)

		window.scrollTo(0, 0)
		window.onscroll = () => (window.scrollTo(0, 0))
		const teste = document.body.querySelector<HTMLDivElement>('div.divSucesso')
		if (teste) teste.style.zIndex = '1'
	}

	return (
		<>
			<div className="imgFundo">
				<Sucesso />
				<section className="secCadastrar">
					<form onSubmit={handleSubmit}>
						<h1>CADASTRAR MISSA</h1>
						<hr />

						<fieldset className="fieldsetCadastrar">
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

						<fieldset className="fieldsetCadastrar">
							<legend>
								<h2>Data e Horário</h2>
							</legend>

							<div className="field">
								<input type="datetime-local" name="dataHora" className="dataHora" onChange={clicouData} />
							</div>
						</fieldset>

						<button type="submit" className="cadastrarMissa">Cadastrar Missa</button>
					</form>
				</section>
			</div>
			<Footer />
		</>
	)
}

export default CadastrarMissa