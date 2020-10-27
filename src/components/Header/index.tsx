import React from 'react'

import logo from '../../assets/logo.svg'

import './styles.css'

const Header: React.FC = () => {
	return (
		<header className="cabecalho">
			<div onClick={() => { window.location.reload() }}>
				<img className="logo" src={logo} alt="Brasão da Paróquia" />

				<h1 className="tituloPSCJ">PSCJ</h1>
			</div>

			<h2 className="tituloLocal">Gravatal - SC</h2>
		</header>
	)
}

export default Header