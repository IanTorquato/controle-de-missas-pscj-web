import React, { useState, FormEvent, ChangeEvent } from 'react'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { HiUserGroup } from 'react-icons/hi'

import flechaTorta from '../../assets/icons/flechaTorta.svg'
import sublinhado from '../../assets/sublinhado.png'
import api from '../../services/api'

import './styles.css'

interface FormMissa {
	titulo: string,
	txtBtn: string,
	mensagemEsquerda?: string,
	mensagemDireita?: string
}

interface DataMissa {
	data: string
	hora: string
}

const FormMissas: React.FC<FormMissa> = ({ titulo, txtBtn, mensagemEsquerda, mensagemDireita }) => {
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
		<section className="secCadastrarEditar">
			<div className="decoracaoFormMissa" id="decoracaoFormVermelha"></div>
			<div className="decoracaoFormMissa" id="decoracaoFormDourada"></div>
			<div className="decoracaoFormMissa" id="decoracaoFormAzul"></div>

			<form onSubmit={handleSubmit}>
				<h1>{titulo}</h1>

				<div>

					<div>
						<select name="local" defaultValue={0} onChange={clicouLocal}>
							<option value="0" disabled hidden>Selecione um local</option>
							<option value="1">Centro</option>
							<option value="2">Termas</option>
						</select>

						<FaMapMarkedAlt size={20} fill="#747474" />
					</div>

					<div>
						<input type="number" name="maxPessoas" className="maxPessoas" placeholder="Máximo de pessoas"
							onChange={digitouMaxP} />

						<HiUserGroup size={20} fill="#747474" />
					</div>

					<input type="datetime-local" name="dataHora" className="dataHora" onChange={clicouData} />
				</div>

				{mensagemEsquerda &&
					<div className="msgEsquerda">
						{mensagemEsquerda} <br />
						<img src={flechaTorta} alt="Flecha" />
					</div>
				}

				{mensagemDireita &&
					<div className="msgDireita">
						{mensagemDireita} <br />
						<img src={sublinhado} alt="Sublinhado" />
					</div>
				}

				<button type="submit">{txtBtn}</button>
			</form>
		</section>
	)
}

export default FormMissas