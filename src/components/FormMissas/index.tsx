import React, { useState, FormEvent, ChangeEvent } from 'react'
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

interface DataMissa {
	data?: string
	hora?: string
}

const FormMissas: React.FC<FormMissa> = ({ titulo, txtBtn, missa, mensagemEsquerda, mensagemDireita }) => {
	const [nome, setNome] = useState(missa?.nome || '')
	const [local_id, setLocal_id] = useState(missa?.local_id || 0)
	const [max_pessoas, setMax_pessoas] = useState(missa?.max_pessoas)
	const [dataMissa, setDataMissa] = useState<DataMissa>({ data: missa?.data, hora: missa?.hora })

	function clicouData(event: ChangeEvent<HTMLInputElement>) {
		const dataMissaCortada = event.target.value.split('T')

		setDataMissa({ data: dataMissaCortada[0], hora: dataMissaCortada[1] })
	}

	function criarEditarMissa(event: FormEvent) {
		event.preventDefault()

		if (dataMissa) {
			const { data, hora } = dataMissa

			const dadosMissa = { nome, local_id, data, hora, max_pessoas }

			if (!missa) {
				api.post('missas', dadosMissa)
					.then(({ data }) => {
						alert(data.mensagem)
					})
					.catch(({ response }) => {
						console.log(response)
						return alert(response.data.erro || 'Falha ao cadastrar a missa')
					})
			} else {
				api.put(`missas/${missa.id}`, dadosMissa)
					.then(({ data }) => {
						alert(data.mensagem)
					})
					.catch(({ response }) => {
						console.log(response)
						return alert(response.data.erro || 'Falha ao atualizar a missa')
					})
			}

			setNome('')
			setLocal_id(0)
			setMax_pessoas(0)
			setDataMissa({ data: undefined, hora: undefined })
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
						<input type="text" name="nome" className="nome" placeholder="Dê um nome à missa" required
							onChange={({ target }) => setNome(target.value)} value={nome} />

						<BiChurch size={20} fill="#747474" />
					</div>

					<div>
						<select name="local" value={local_id} onChange={({ target }) => setLocal_id(+target.value)} required>
							<option value="" hidden>Selecione um local</option>
							<option value="1">Centro</option>
							<option value="2">Termas</option>
						</select>

						<FaMapMarkedAlt size={20} fill="#747474" />
					</div>

					<div className="maxPessoasData">
						<div>
							<input type="number" name="maxPessoas" className="maxPessoas" placeholder="Máximo de pessoas" min={1} required
								onChange={({ target }) => setMax_pessoas(+target.value)} value={max_pessoas} />

							<HiUserGroup size={20} fill="#747474" />
						</div>

						<input type="datetime-local" name="dataHora" className="dataHora" onChange={clicouData} required
							min={format(new Date(), "yyyy-MM-dd'T'HH:mm")} value={`${dataMissa.data}T${dataMissa.hora}`} />
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