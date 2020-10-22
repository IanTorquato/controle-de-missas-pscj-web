import React, { useState } from 'react'
import { BiDotsVerticalRounded, BiEditAlt, BiTrash } from 'react-icons/bi'

import Missa from '../../utils/interfaces'
import TEMPORARIO from '../../assets/dentroIgrejaCentro.svg'

import './styles.css'

const ListaMissas: React.FC = () => {
	const [missas, setMissas] = useState<Missa[]>([])

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
				<div className="missa">
					<img src={TEMPORARIO} alt="Imagem da Igreja" />

					<h1>Santa Missa com Bênção da Saúde</h1>

					<hr />

					<h3>13/10</h3>
					<h3>19:00</h3>
					<h3>Termas</h3>
					<h3>52/80</h3>

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

				<div className="missa">
					<img src={TEMPORARIO} alt="Imagem da Igreja" />

					<h1>Santa Missa com Bênção da Saúde</h1>

					<hr />

					<h3>13/10</h3>
					<h3>19:00</h3>
					<h3>Termas</h3>
					<h3>52/80</h3>

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
			</div>
		</section>
	)
}

export default ListaMissas