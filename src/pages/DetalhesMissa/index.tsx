import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BiEditAlt, BiTrash, BiCalendar } from 'react-icons/bi'
import { FiClock } from 'react-icons/fi'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { HiUserGroup } from 'react-icons/hi'

import api from '../../services/api'
import Missa from '../../utils/interfaces'

import imgTemporaria from '../../assets/dentroIgrejaCentro.svg'

import './styles.css'

interface RouteParams {
	id: string
}

const DetalhesMissa: React.FC = () => {
	// const { id } = useParams<RouteParams>()
	// const [missa, setMissa] = useState<Missa | null>(null)

	// useEffect(() => {
	// 	api.get(`missas?missa_id=${id}`)
	// 		.then(({ data }) => setMissa(data))
	// 		.catch(({ response }) => {
	// 			console.log(response)
	// 			alert(response.data.erro || 'Falha ao listar uma única missa.')
	// 		})
	// }, [])

	return (
		<section className="secDetalhesMissa">
			<header>
				<img src={imgTemporaria} alt="Igreja" />

				<div className="dadosMissa">
					<div>
						<h1>Solenidade de N. Srª. Aparecida</h1>

						<div>
							<div><BiTrash size={24} color="#e5e5e5" /></div>
							<div><BiEditAlt size={24} color="#e5e5e5" /></div>
						</div>
					</div>

					<div>
						<span>
							<BiCalendar size={24} color="#e5e5e5" />
							12/10
						</span>

						<span>
							<FiClock size={24} color="#e5e5e5" />
							19:00
						</span>

						<span>
							<FaMapMarkedAlt size={24} color="#e5e5e5" />
							Centro
						</span>

						<span>
							<HiUserGroup size={24} color="#e5e5e5" />
							94/100
						</span>

					</div>
				</div>
			</header>

			<hr />

			<div className="gridUsuarios">
				<div className="usuario">
					<img src={imgTemporaria} alt="Avatar do Usuário" />

					<div>
						<span className="nomeUsuario">Ian da Conceição da SIlva</span>
						<br />
						<span className="quantUsuario">
							<HiUserGroup size={24} color="#e5e5e5" />
							16/100
						</span>
					</div>
				</div>
			</div>
		</section>
	)
}

export default DetalhesMissa