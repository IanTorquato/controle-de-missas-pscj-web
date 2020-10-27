import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { BiEditAlt, BiTrash, BiCalendar } from 'react-icons/bi'
import { FiClock } from 'react-icons/fi'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { HiUserGroup } from 'react-icons/hi'

import api from '../../services/api'
import Header from '../../components/Header'
import Missa from '../../utils/interfaces'
import { formatDiaMesHora } from '../../utils/tratandoDatas'

import './styles.css'

interface Usuarios {
	id: number
	nome: string
	foto: string
	quantidade_pessoas: number
}

interface RouteParams {
	id: string
}

const DetalhesMissa: React.FC = () => {
	const [missa, setMissa] = useState<Missa | null>(null)
	const [usuarios, setUsuarios] = useState<Usuarios[] | null>(null)

	const { goBack } = useHistory()

	const { id } = useParams<RouteParams>()

	useEffect(() => {
		api.get(`missas?missa_id_usuarios=${id}`)
			.then(({ data }) => {
				setMissa(formatDiaMesHora(data.missa).missaSerializada)
				if (data.usuarios) { setUsuarios(data.usuarios) }
			})
			.catch(({ response }) => {
				console.log(response)
				alert(response.data.erro || 'Falha ao listar uma única missa.')
			})
	}, [])

	function excluirMissa(id: number) {
		// eslint-disable-next-line no-restricted-globals
		if (confirm('Deseja realmente excluir esta missa?')) {
			api.delete(`missas/${id}`)
				.then(({ data }) => {
					alert(data.mensagem)
					goBack()
				})
				.catch(({ response }) => {
					console.log(response)
					alert(response.data.erro || 'Falha ao excluir missa.')
				})
		}
	}

	const nomeLocal = missa?.local_id === 1 ? 'Centro' : 'Termas'
	const urlImagem = `${process.env.REACT_APP_URL_BANCO}/uploads/fotosLocais/igreja${nomeLocal}.png`

	return (
		<>
			<Header />

			<section className="secDetalhesMissa">
				{missa && (
					<>
						<header>
							<img src={urlImagem} alt="Igreja" />

							<div className="dadosMissa">
								<div>
									<h1>{missa.nome}</h1>

									<div>
										<div onClick={() => excluirMissa(+id)}>
											<BiTrash size={24} color="#e5e5e5" />
										</div>

										<Link to={`/editar-missa/${id}`}>
											<BiEditAlt size={24} color="#e5e5e5" />
										</Link>
									</div>
								</div>

								<div>
									<span>
										<BiCalendar size={24} color="#e5e5e5" />
										{missa.data}
									</span>

									<span>
										<FiClock size={24} color="#e5e5e5" />
										{missa.hora}
									</span>

									<span>
										<FaMapMarkedAlt size={24} color="#e5e5e5" />
										{missa.local_id === 1 ? 'Centro' : 'Termas'}
									</span>

									<span>
										<HiUserGroup size={24} color="#e5e5e5" />
										{missa.pessoas_cadastradas}/{missa.max_pessoas}
									</span>
								</div>
							</div>
						</header>

						<hr />

						{usuarios ?
							<div className="gridUsuarios">
								{usuarios.map(usuario => (
									<div className="usuario" key={usuario.id}>
										<img src={usuario.foto} alt="Avatar do Usuário" />

										<div>
											<span className="nomeUsuario">{usuario.nome}</span>
											<br />
											<span className="quantUsuario">
												<HiUserGroup size={24} color="#e5e5e5" />
												{usuario.quantidade_pessoas}/{missa.max_pessoas}
											</span>
										</div>
									</div>
								))}
							</div> :
							<div>
								<h3>Nenhum usuário cadastrado</h3>
							</div>
						}
					</>
				)}
			</section>
		</>
	)
}

export default DetalhesMissa