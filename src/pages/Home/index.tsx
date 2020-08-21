import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './styles.css'
import logo from '../../assets/logo.webp'
import Footer from '../../components/Footer'
import api from '../../services/api'

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

	useEffect(() => {
		api.get('missas?quantMissas=6').then(response => {
			setMissas(response.data.map((missa: Missa) => {
				const dataCortada = missa.data.split('/')
				missa.data = `${dataCortada[2]}/${dataCortada[1]}/${dataCortada[0]}`

				return missa
			}))
		})
	}, [])

	function rolarScroll() { window.scrollTo(0, window.innerHeight) }

	function voltarTopo() { window.scrollTo(0, 0) }

	return (
		<>
			<div className="imgFundo" onDoubleClick={() => (localStorage.clear())}>
				<section className="secHome">
					<div className="centralInfo" onClick={rolarScroll}>
						<img className="logo" src={logo} alt="Brasão da Paróquia" />
						<hr className="linha" />

						<h1 className="tituloSCJ">Santuário Sagrado <br /> Coração de Jesus</h1>

						<hr className="linha" />
						<h2 className="subTituloSCJ">Gravatal - SC</h2>
					</div>
				</section>

				<section className="sectionBotoes">
					<div className="alinhaCentro">
						<Link to="/cadastrar-missa" className="btnCadastrar" onClick={voltarTopo}>Cadastrar Missa</Link>
						<Link to="/editar-missa" className="btnEditar" onClick={voltarTopo}>Editar Missa</Link>
					</div>
				</section>

				<section className="cronograma">
					<h1 className="proximasMissas">PRÓXIMAS MISSAS</h1>

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

									<h2 className="subTituloMissa">{diasSemana[diaMissa.getDay()]} | {
										missa.local_id === 1 ? 'CENTRO' : 'TERMAS'
									} </h2>

								</div>
							)
						})}
					</div>
				</section>
			</div>
			<Footer />
		</>
	)
}

export default Home