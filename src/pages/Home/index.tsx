import React, { useState, useEffect, useContext } from 'react'
import { BiChurch } from 'react-icons/bi'
import { GiHealthNormal } from 'react-icons/gi'
import { RiComputerLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

// import logo from '../../assets/logo.webp'
// 					<img className="logo" src={logo} alt="Brasão da Paróquia" />
import igrejaCentro from '../../assets/dentroIgrejaCentro.webp'
import Footer from '../../components/Footer'
import api from '../../services/api'
import LoginContext from '../../contexts/login'

import './styles.css'

interface Missa {
	id: number
	local_id: number
	data: string
	hora: string
	max_pessoas: number
	pessoas_cadastradas: number
}

const Home = () => {
	const [missas, setMissas] = useState<Missa[]>([])
	const [erroMissas, setErroMissas] = useState('')

	const { deslogar } = useContext(LoginContext)

	useEffect(() => {
		api.get('missas?quantMissas=6').then(({ data }) => {
			setMissas(data.map((missa: Missa) => {
				const dataCortada = missa.data.split('/')
				missa.data = `${dataCortada[2]}/${dataCortada[1]}/${dataCortada[0]}`

				return missa
			}))
		}).catch(({ response }) => { setErroMissas(response.data.erro) })
	}, [])

	function scrollCronograma() { window.scrollTo(0, window.innerHeight) }

	function scrollTopo() { window.scrollTo(0, 0) }

	return (
		<>
			<section className="secHome" onDoubleClick={deslogar}>
				<h1 className="tituloSSCJ">Santuário Sagrado <br /> Coração de <br /> Jesus</h1>

				<div className="alinhaHorizontal">
					<div className="alinhaHorizontal">
						<div className="curiosidade" id="corVermelha" >
							<BiChurch size={64} />
						</div>
						<div className="curiosidade" id="corDourada" >
							<GiHealthNormal size={64} />
						</div>
						<div className="curiosidade" id="corAzul" >
							<RiComputerLine size={64} />
						</div>
					</div>

					<div className="imagemDecorada">
						<img src={igrejaCentro} alt="Igreja do Centro" />
					</div>
				</div>
			</section>

			<section className="sectionBotoes">
				<div className="alinhaCentro">
					<Link to="/cadastrar-missa" className="btnCadastrar" onClick={scrollTopo}>Cadastrar Missa</Link>
					<Link to="/editar-missa" className="btnEditar" onClick={scrollTopo}>Editar Missa</Link>
				</div>
			</section>

			<section className="cronograma">
				<h1 className="proximasMissas">PRÓXIMAS MISSAS</h1>

				<h2>{erroMissas}</h2>

				<div className="gridMissas">
					{missas.map(missa => {

						const dataCortada = missa.data.split('/')
						const dataInvertida = `${dataCortada[2]}/${dataCortada[1]}/${dataCortada[0]}`

						const diaMissa = new Date(Date.parse(`${dataInvertida}`))

						const diasSemana = ['DOMINGO', 'SEGUNDA-FEIRA', 'TERÇA-FEIRA', 'QUARTA-FEIRA',
							'QUINTA-FEIRA', 'SEXTA-FEIRA', 'SÁBADO']

						return (
							<div key={missa.id} className="detalhesMissa">
								<h1 className="tituloMissa">{missa.data.slice(0, 5)} - {missa.hora}</h1>

								<h2 className="subTituloMissa">
									{diasSemana[diaMissa.getDay()]} | {missa.local_id === 1 ? 'CENTRO' : 'TERMAS'}
								</h2>
							</div>
						)
					})}
				</div>
			</section>
			<Footer />
		</>
	)
}

export default Home