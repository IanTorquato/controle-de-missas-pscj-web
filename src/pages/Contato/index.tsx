import React from 'react'
import { FaFacebook, FaEnvelope, FaInstagram, FaWhatsapp, FaGithub, FaLinkedin } from 'react-icons/fa'

import './styles.css'
import programador from '../../assets/programador.png'
import designer from '../../assets/designer.png'

const Contato = () => {
	return (
		<div className="imgFundoContato">
			<section className="secContato">
				<section className="pessoas">
					<img src={programador} alt="Foto do desenvolvedor" className="imgContato" />

					<div className="dadosPessoa">

						<div>
							<h1 className="nomeContato">Ian da Conceição da Silva</h1>
							<h2 className="setorContato">Programador</h2>
						</div>

						<ul className="redesSociaisContato">
							<div>
								<li>
									<span className="spanGmail"><FaEnvelope size={30} /></span>

									<a href="http://gmail.com" target="_blank" rel="noopener noreferrer">Gmail</a>
								</li>

								<li>
									<span className="spanFace"><FaFacebook size={30} /></span>

									<a href="https://www.facebook.com/ian.conceicaodasilva" target="_blank"
										rel="noopener noreferrer">Facebook</a>
								</li>

								<li>
									<span className="spanInsta"><FaInstagram size={30} /></span>

									<a href="https://www.instagram.com/ian_1408" target="_blank" rel="noopener noreferrer">Instagram</a>
								</li>
							</div>

							<div>
								<li>
									<span className="spanWhats"><FaWhatsapp size={30} /></span>

									<a href="https://api.whatsapp.com/send?phone=5548998224086" target="_blank"
										rel="noopener noreferrer">Whatsapp</a>
								</li>

								<li>
									<span className="spanLinkedin"><FaLinkedin size={30} /></span>

									<a href="https://www.linkedin.com/in/ian-da-concei%C3%A7%C3%A3o-da-silva-67549b1a2/" target="_blank"
										rel="noopener noreferrer">Linkedin</a>
								</li>

								<li>
									<span className="spanGithub"><FaGithub size={30} /></span>

									<a href="https://github.com/IanTorquato" target="_blank" rel="noopener noreferrer">GitHub</a>
								</li>
							</div>
						</ul>
					</div>
				</section>

				<section className="pessoas">
					<img src={designer} alt="Foto da designer" className="imgContato" />

					<div className="dadosPessoa">
						<div>
							<h1 className="nomeContato">Ana Clara Vargas Rodrigues</h1>
							<h2 className="setorContato">Designer</h2>
						</div>


						<ul className="redesSociaisContato">
							<div>
								<li>
									<span className="spanGmail"><FaEnvelope size={30} /></span>

									<a href="http://gmail.com" target="_blank" rel="noopener noreferrer">Gmail</a>
								</li>

								<li>
									<span className="spanFace"><FaFacebook size={30} /></span>

									<a href="https://pt-br.facebook.com/anaclara.vargasrodrigues" target="_blank"
										rel="noopener noreferrer">Facebook</a>
								</li>
							</div>

							<div>
								<li>
									<span className="spanInsta"><FaInstagram size={30} /></span>

									<a href="https://www.instagram.com/anaclaravargs" target="_blank" rel="noopener noreferrer">Instagram</a>
								</li>

								<li>
									<span className="spanWhats"><FaWhatsapp size={30} /></span>

									<a href="https://api.whatsapp.com/send?phone=5548998301146" target="_blank"
										rel="noopener noreferrer">Whatsapp</a>
								</li>
							</div>
						</ul>
					</div>
				</section>
			</section>
		</div>
	)
}

export default Contato