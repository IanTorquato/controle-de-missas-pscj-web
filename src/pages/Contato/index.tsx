import React from 'react'
import { FaFacebookSquare, FaEnvelopeSquare, FaInstagramSquare, FaWhatsappSquare, FaGithubSquare, FaLinkedin }
	from 'react-icons/fa'

import './styles.css'

const Contato = () => {
	return (
		<section className="secContato">
			<section className="contatoPessoa" id="programador">
				<div className="decoracaoContato" id="corContatoVermelha"></div>
				<div className="decoracaoContato" id="corContatoDourada"></div>
				<div className="decoracaoContato" id="corContatoAzul"></div>

				<div className="conteudoContato">
					<div>
						<img src="https://avatars3.githubusercontent.com/u/61882248?s=460&u=fbacf3b2ab7fbe9e721081f8774169d9f243fffc&v=4"
							alt="Foto do desenvolvedor" />

						<div>
							<h1 className="nomeContato">Ian da Conceição da Silva</h1>
							<h2 className="setorContato">Programador</h2>
						</div>
					</div>

					<ul>
						<div>
							<li>
								<a href="https://www.facebook.com/ian.conceicaodasilva" target="_blank" rel="noopener noreferrer">
									<span className="spanFace"> <FaFacebookSquare size={40} /> </span>
										Facebook
									</a>
							</li>

							<li>
								<a href="https://www.linkedin.com/in/ian-da-concei%C3%A7%C3%A3o-da-silva-67549b1a2/" target="_blank"
									rel="noopener noreferrer">
									<span className="spanLinkedin"> <FaLinkedin size={40} /> </span>
										Linkedin
									</a>
							</li>

							<li>
								<a href="https://github.com/IanTorquato" target="_blank" rel="noopener noreferrer">
									<span className="spanGithub"> <FaGithubSquare size={40} /> </span>
										GitHub
									</a>
							</li>
						</div>

						<div>
							<li>
								<a href="http://gmail.com" target="_blank" rel="noopener noreferrer">
									<span className="spanGmail"> <FaEnvelopeSquare size={40} /> </span>
										Gmail
									</a>
							</li>

							<li>
								<a href="https://www.instagram.com/ian_1408" target="_blank" rel="noopener noreferrer">
									<span className="spanInsta"> <FaInstagramSquare size={40} /> </span>
										Instagram
									</a>
							</li>

							<li>
								<a href="https://api.whatsapp.com/send?phone=5548998224086" target="_blank" rel="noopener noreferrer">
									<span className="spanWhats"> <FaWhatsappSquare size={40} /> </span>
										Whatsapp
									</a>
							</li>
						</div>
					</ul>
				</div>
			</section>

			<section className="contatoPessoa" id="designer">
				<div className="decoracaoContato" id="corContatoVermelha"></div>
				<div className="decoracaoContato" id="corContatoDourada"></div>
				<div className="decoracaoContato" id="corContatoAzul"></div>

				<div className="conteudoContato">
					<div>
						<img src="https://i.pinimg.com/280x280_RS/81/3d/00/813d00a74318486536d85b2edbf828a2.jpg"
							alt="Foto da designer" />

						<div>
							<h1 className="nomeContato">Ana Clara V. Rodrigues</h1>
							<h2 className="setorContato">Designer</h2>
						</div>
					</div>

					<ul>
						<div>
							<li>
								<a href="https://pt-br.facebook.com/anaclara.vargasrodrigues" target="_blank"
									rel="noopener noreferrer">
									<span className="spanFace"> <FaFacebookSquare size={40} /> </span>
										Facebook
									</a>
							</li>

							<li>
								<a href="https://www.instagram.com/anaclaravargs" target="_blank" rel="noopener noreferrer">
									<span className="spanInsta"> <FaInstagramSquare size={40} /> </span>
										Instagram
									</a>
							</li>
						</div>

						<div>
							<li>
								<a href="http://gmail.com" target="_blank" rel="noopener noreferrer">
									<span className="spanGmail"> <FaEnvelopeSquare size={40} /> </span>
										Gmail
									</a>
							</li>

							<li>
								<a href="https://api.whatsapp.com/send?phone=5548998301146" target="_blank"
									rel="noopener noreferrer">
									<span className="spanWhats"> <FaWhatsappSquare size={40} /> </span>
										Whatsapp
									</a>
							</li>
						</div>
					</ul>
				</div>
			</section>
		</section>
	)
}

export default Contato