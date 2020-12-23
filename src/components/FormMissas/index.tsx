import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { format } from 'date-fns'
import { BiChurch } from 'react-icons/bi'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { HiUserGroup } from 'react-icons/hi'

import api from '../../services/api'
import Missa from '../../utils/interfaces'
import flechaTorta from '../../assets/icons/flechaTorta.svg'
import sublinhado from '../../assets/sublinhado.png'

import './styles.css'

interface FormMissa {
	titulo: string,
	txtBtn: string,
	missa?: Missa,
	mensagemEsquerda?: string,
	mensagemDireita?: string
}

const FormMissas: React.FC<FormMissa> = ({ titulo, txtBtn, missa, mensagemEsquerda, mensagemDireita }) => {
	const [nome, setNome] = useState(missa?.nome || '')
	const [local_id, setLocal_id] = useState(missa?.local_id || 0)
	const [max_pessoas, setMax_pessoas] = useState(missa?.max_pessoas || '')
	const [data_hora, setData_hora] = useState(missa?.data_hora ? ordenaData(missa.data_hora.split('T')) : '')

	const { push } = useHistory()

	function ordenaData([data, hora]: string[]) {
		const [dia, mes, ano] = data.split('/')

		return `${ano}-${mes}-${dia}T${hora}`
	}

	function criarEditarMissa(event: FormEvent) {
		event.preventDefault()

		if (data_hora) {
			const dadosMissa = { nome, local_id, data_hora, max_pessoas }

			if (!missa) {
				api.post('missas', dadosMissa)
					.then(({ data }) => {
						setNome('')
						setLocal_id(0)
						setMax_pessoas('')
						setData_hora('')

						alert(data.mensagem)
					})
					.catch(({ response }) => {
						console.log(response)
						alert(response.data.erro || 'Falha ao cadastrar a missa')
					})
			} else {
				api.put(`missas/${missa.id}`, dadosMissa)
					.then(({ data }) => {
						alert(data.mensagem)
						push('/lista-missas')
					})
					.catch(({ response }) => {
						console.log(response)
						alert(response.data.erro || 'Falha ao atualizar a missa')
					})
			}
		}
	}

	return (
		<section className="secCadastrarEditar">
			<div className="decoracaoFormMissa" id="decoracaoFormVermelha"></div>
			<div className="decoracaoFormMissa" id="decoracaoFormDourada"></div>
			<div className="decoracaoFormMissa" id="decoracaoFormAzul"></div>

			<form onSubmit={criarEditarMissa}>
				<h1>{titulo}</h1>

				<div className="containerInputsForm">
					<div>
						<input type="text" className="nome" placeholder="Dê um nome à missa" required
							onChange={({ target }) => setNome(target.value)} value={nome} />

						<BiChurch size={20} fill="#747474" />
					</div>

					<div>
						<input className="dataHora" type="datetime-local" onChange={({ target }) => setData_hora(target.value)} required
							min={format(new Date(), "yyyy-MM-dd'T'HH:mm")} value={data_hora} />
					</div>

					<div>
						<div>
							<select value={local_id} onChange={({ target }) => setLocal_id(+target.value)} required>
								<option value="" hidden>Selecione um local</option>
								<option value="1">Centro</option>
								<option value="2">Termas</option>
							</select>

							<FaMapMarkedAlt size={20} fill="#747474" />
						</div>

						<div>
							<input type="number" className="maxPessoas" placeholder="Máximo de pessoas" min={1} required
								onChange={({ target }) => setMax_pessoas(+target.value)} value={max_pessoas} />

							<HiUserGroup size={20} fill="#747474" />
						</div>
					</div>
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