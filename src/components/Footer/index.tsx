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
              <a className="whatsapp" href="https://api.whatsapp.com/send?phone=554836422121" target="_blank"
                rel="noopener noreferrer">
                <FaWhatsapp size={40} />
              </a>
            </li>

            <li>
              <a className="facebook" target="_blank" rel="noopener noreferrer"
                href="https://www.facebook.com/Paróquia-Santuário-Sagrado-Coração-de-Jesus-108271214142847">
                <FaFacebookF size={40} />
              </a>
            </li>

            <li>
              <a className="instagram" href="https://www.instagram.com/santuariogravatal" target="_blank"
                rel="noopener noreferrer">
                <FaInstagram size={40} />
              </a>
            </li>

            <li>
              <a className="youtube" href="https://www.youtube.com/channel/UCoWwECJDCgyMggNyKJ14jnA" target="_blank"
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

        <Link className="contatos" to="/contato" onClick={voltarTopo}>{"< Fale Conosco />"}</Link>
      </div>
    </footer>
  )
}

export default Footer
