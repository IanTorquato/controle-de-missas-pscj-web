import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BiChurch } from 'react-icons/bi'
import { GiHealthNormal } from 'react-icons/gi'
import { RiComputerLine } from 'react-icons/ri'
import { FiArrowUpCircle } from 'react-icons/fi'

import api from '../../services/api'
import { useLogin } from '../../contexts/login'
import Footer from '../../components/Footer'
import logo from '../../assets/logo.svg'
import igrejaCentro from '../../assets/dentroIgrejaCentro.svg'
import iconFlexaLoop from '../../assets/icons/flechaLoop.svg'
import iconFlexaCurva from '../../assets/icons/flechaCurva.svg'

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

	const { deslogar } = useLogin()

	useEffect(() => {
		api.get('missas?quantMissas=6').then(({ data }) => {
			setMissas(data.map((missa: Missa) => {
				const dataCortada = missa.data.split('/')
				missa.data = `${dataCortada[2]}/${dataCortada[1]}/${dataCortada[0]}`

				return missa
			}))
		}).catch(({ response }) => {
			console.log(response)
			return setErroMissas(response.data.erro || 'Falha ao listar missas.')
		})
	}, [])

	return (
		<>
			<header className="cabecalho">
				<div onClick={() => { window.location.reload() }}>
					<img className="logo" src={logo} alt="Brasão da Paróquia" />

					<h1 className="tituloPSCJ">PSCJ</h1>
				</div>

				<h2 className="tituloLocal">Gravatal - SC</h2>
			</header>

			<section className="secHome" onDoubleClick={deslogar}>
				<div>
					<h1 className="tituloSSCJ">Santuário Sagrado <br /> Coração de <br /> Jesus</h1>

					<div className="alinhaHorizontal">
						<div className="alinhaHorizontal">
							<div className="curiosidade" id="curiosidadeVermelha" >
								<BiChurch size={64} />
							</div>

							<div className="curiosidade" id="curiosidadeDourada" >
								<GiHealthNormal size={64} />
							</div>

							<div className="curiosidade" id="curiosidadeAzul" >
								<RiComputerLine size={64} />
							</div>
						</div>

						<div className="imagemDecorada">
							<img src={igrejaCentro} alt="Igreja do Centro" />

							<div className="decoracaoImagem" id="decoracaoImgVermelha"></div>
							<div className="decoracaoImagem" id="decoracaoImgDourada"></div>
							<div className="decoracaoImagem" id="decoracaoImgAzul"></div>
						</div>
					</div>
				</div>
			</section>

			<section className="secBotoes">
				<div>
					<div className="decoracaoBotoes" id="decoracaoBtnVermelho"></div>
					<div className="decoracaoBotoes" id="decoracaoBtnDourado"></div>
					<div className="decoracaoBotoes" id="decoracaoBtnAzul"></div>

					<div className="conteudoBotoes">
						<h1 className="tituloBotoes">Então, o que temos <br /> pra hoje?</h1>

						<div className="alinhaDireita">
							<div className="mensagensBotoes">
								<div className="descricaoBotao" id="txtAlinhadoDireita">
									Aqui, você pode cadastrar <br /> uma nova missa...
									<img className="flechaLoop" src={iconFlexaLoop} alt="Flecha" />
								</div>

								<nav>
									<Link className="btnsNavegacao" to="/cadastrar-missa" onClick={() => { window.scrollTo(0, 0) }}>
										Cadastro de Missas
									</Link>

									<Link className="btnsNavegacao" to="/editar-missa" onClick={() => { window.scrollTo(0, 0) }}>
										Lista de Missas
									</Link>
								</nav>

								<div className="descricaoBotao" id="txtcoladoDireita">
									<img className="flechaCurva" src={iconFlexaCurva} alt="Flecha" />
									...e aqui, você vê as missas <br /> cadastradas e pode editá-las <br /> ou excluí-las!
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="secCronograma">
				<div className="tituloCronograma"></div>

				<h2 className="erroListagem">{erroMissas}</h2>

				<aside className="gridMissas">
					{missas.map((missa, index) => {

						const dataCortada = missa.data.split('/')
						const dataInvertida = `${dataCortada[2]}/${dataCortada[1]}/${dataCortada[0]}`

						const diaMissa = new Date(Date.parse(`${dataInvertida}`))

						const diasSemana = ['DOMINGO', 'SEGUNDA-FEIRA', 'TERÇA-FEIRA', 'QUARTA-FEIRA',
							'QUINTA-FEIRA', 'SEXTA-FEIRA', 'SÁBADO']

						return (
							<div key={missa.id} className="detalhesMissa" id={
								index < 2 ? 'detalhesMissaVermelha' : index < 4 ? 'detalhesMissaDourada' : 'detalhesMissaAzul'
							}>
								<h1>{missa.data.slice(0, 5)} - {missa.hora}</h1>

								<h2>
									{diasSemana[diaMissa.getDay()]} | {missa.local_id === 1 ? 'CENTRO' : 'TERMAS'}
								</h2>
							</div>
						)
					})}
				</aside>
			</section>
			<Footer />
		</>
	)
}

export default Home