import React from 'react'
import { useHistory } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'

import { useLogin } from '../../contexts/login'

import logo from '../../assets/logo.svg'

import './styles.css'

const Header: React.FC = () => {
	const { deslogar } = useLogin()
	const { push } = useHistory()

	return (
		<header className="cabecalho">
			<div onClick={() => { push('/') }}>
				<img src={logo} alt="Brasão da Paróquia" />

				<h1>PSCJ</h1>
			</div>

			<div>
				<h2>Gravatal - SC</h2>

				<FiLogOut size={32} onClick={deslogar} />
			</div>
		</header>
	)
}

export default Header