import React from 'react'
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import flechaTorta from '../../assets/icons/flechaTorta.png'
import './styles.css'

const Footer = () => {
	const anoAtual = new Date().getFullYear()

	function voltarTopo() {
		window.scrollTo(0, 0)
	}

	return (
		<footer className="rodape">
			<div>
				<nav>
					<ul>
						<li>
							<a href="https://api.whatsapp.com/send?phone=554836422121" className="whatsapp" target="_blank"
								rel="noopener noreferrer">
								<FaWhatsapp size={40} />
							</a>
						</li>

						<li>
							<a href="https://www.facebook.com/Paróquia-Santuário-Sagrado-Coração-de-Jesus-108271214142847"
								className="facebook" target="_blank" rel="noopener noreferrer">
								<FaFacebookF size={40} />
							</a>
						</li>

						<li>
							<a href="https://www.instagram.com/santuariogravatal" className="instagram" target="_blank"
								rel="noopener noreferrer">
								<FaInstagram size={40} />
							</a>
						</li>

						<li>
							<a href="https://www.youtube.com/channel/UCoWwECJDCgyMggNyKJ14jnA" className="youtube" target="_blank"
								rel="noopener noreferrer">
								<FaYoutube size={40} />
							</a>
						</li>
					</ul>
				</nav>

				<p className="copyright">&copy; 2020 - {anoAtual} por Paróquia Sagrado Coração de Jesus</p>
			</div>

			<div>
				Conheça os <br /> desenvolvedores <br /> deste projeto! <br />

				<img src={flechaTorta} alt="Flexa" />

				<Link to="/contato" className="contatos" onClick={voltarTopo}>{"< Fale Conosco />"}</Link>
			</div>
		</footer>
	)
}

export default Footer