import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react'
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
	const [dataMissaSerializada, setDataMissaSerializada] = useState('')

	// Data mínima do elemento select
	let dataAtual = new Date().toLocaleString()
	const dataAtualCortada = dataAtual.slice(0, 16).replace(' ', '/').split('/')
	dataAtual = `${dataAtualCortada[2]}-${dataAtualCortada[1]}-${dataAtualCortada[0]}T${dataAtualCortada[3]}`

	useEffect(() => {
		if (missa) {
			const dataMissaCortada = dataMissa.data?.split('/')

			if (dataMissaCortada) {
				setDataMissaSerializada(`${dataMissaCortada[2]}-${dataMissaCortada[1]}-${dataMissaCortada[0]}T${missa.hora}`)
			}
		}
	}, [dataAtual, dataMissa.data, missa])

	function clicouData(event: ChangeEvent<HTMLInputElement>) {
		const dataHoraMissa = new Date(event.target.value)

		function validaQuantNum(campo: string) { return campo.length === 1 ? `0${campo}` : campo }

		const anoMissa = dataHoraMissa.getFullYear()
		const mesMissa = validaQuantNum((dataHoraMissa.getMonth() + 1).toString())
		const diaMissa = validaQuantNum(dataHoraMissa.getDate().toString())
		const horaMissa = validaQuantNum(dataHoraMissa.getHours().toString())
		const minutosMissa = validaQuantNum(dataHoraMissa.getMinutes().toString())

		setDataMissa({ data: `${anoMissa}/${mesMissa}/${diaMissa}`, hora: `${horaMissa}:${minutosMissa}` })
	}

	function criarEditarMissa(event: FormEvent) {
		event.preventDefault()

		if (dataMissa) {
			const { data, hora } = dataMissa

			const dadosMissa = { nome, local_id, data, hora, max_pessoas }

			if (!missa) {
				api.post('missas', dadosMissa).then(({ data }) => {
					alert(data.mensagem)
					window.location.reload()
				}).catch(({ response }) => {
					console.log(response)
					return alert(response.data.erro || 'Falha ao cadastrar a missa')
				})
			} else {
				api.put(`missas/${missa.id}`, dadosMissa).then(({ data }) => {
					alert(data.mensagem)
					//window.location.reload()
				}).catch(({ response }) => {
					console.log(response)
					return alert(response.data.erro || 'Falha ao atualizar a missa')
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
						<input type="text" name="nome" className="nome" placeholder="Dê um nome à missa" required
							onChange={({ target }) => setNome(target.value)} defaultValue={nome} />

						<BiChurch size={20} fill="#747474" />
					</div>

					<div>
						<select name="local" defaultValue={local_id} onChange={({ target }) => setLocal_id(+target.value)} required>
							<option value="" hidden>Selecione um local</option>
							<option value="1">Centro</option>
							<option value="2">Termas</option>
						</select>

						<FaMapMarkedAlt size={20} fill="#747474" />
					</div>

					<div className="maxPessoasData">
						<div>
							<input type="number" name="maxPessoas" className="maxPessoas" placeholder="Máximo de pessoas" min={1} required
								onChange={({ target }) => setMax_pessoas(+target.value)} defaultValue={max_pessoas} />

							<HiUserGroup size={20} fill="#747474" />
						</div>

						<input type="datetime-local" name="dataHora" className="dataHora" onChange={clicouData} required min={dataAtual}
							defaultValue={dataMissaSerializada} />
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