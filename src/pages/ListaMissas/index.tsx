import React, { useEffect, useState } from 'react'
import { BiDotsVerticalRounded, BiEditAlt, BiTrash } from 'react-icons/bi'

import api from '../../services/api'
import Missa from '../../utils/interfaces'
import { formatDiaMesHora } from '../../utils/tratandoDatas'

import './styles.css'

const ListaMissas: React.FC = () => {
	const [missas, setMissas] = useState<Missa[]>([])

	useEffect(() => {
		api.get('missas')
			.then(({ data }) => setMissas(data))
			.catch(({ response }) => {
				console.log(response)
				alert(response.data.erro || 'Falha ao listar missas.')
			})
	}, [])

	return (
		<section className="secListaMissas">
			<div className="headerLista">
				<h3>Missa</h3>
				<h3>Data</h3>
				<h3>Horário</h3>
				<h3>Local</h3>
				<h3>Pessoas</h3>
			</div>

			<div>
				{missas.map(missa => {
					const { missaSerializada } = formatDiaMesHora(missa)
					const nomeLocal = missaSerializada.local_id === 1 ? 'Centro' : 'Termas'

					const urlImagem = `${process.env.REACT_APP_URL_BANCO}/uploads/fotosLocais/igreja${nomeLocal}.png`

					return (
						<div className="missa">
							<img src={urlImagem} alt="Imagem da Igreja" />

							<h1>{missaSerializada.nome}</h1>

							<hr />

							<h3>{missaSerializada.data}</h3>
							<h3>{missaSerializada.hora}</h3>
							<h3>{nomeLocal}</h3>
							<h3>{missaSerializada.pessoas_cadastradas}/{missaSerializada.max_pessoas}</h3>

							<hr />

							<div className="iconEditar">
								<BiEditAlt size={32} color="#e5e5e5" />
							</div>

							<div className="iconExcluir">
								<BiTrash size={32} color="#e5e5e5" />
							</div>

							<div className="iconDetalhes">
								<BiDotsVerticalRounded size={32} color="#e5e5e5" />
							</div>
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default ListaMissas