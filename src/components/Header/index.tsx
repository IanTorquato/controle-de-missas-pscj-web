import React from 'react'

import logo from '../../assets/logo.webp'

import './styles.css'

const Header = () => {
	return (
		<header className="cabecalho">
			<div>
				<img className="logo" src={logo} alt="Brasão da Paróquia" />

				<h1 className="tituloPSCJ">PSCJ</h1>
			</div>

			<h2 className="tituloLocal">Gravatal - SC</h2>
		</header>
	)
}

export default Header