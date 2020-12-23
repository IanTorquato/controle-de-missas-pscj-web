import React, { FormEvent, useState } from 'react'

import { useLogin } from '../../contexts/login'
import logo from '../../assets/logo.svg'

import './styles.css'

const Login: React.FC = () => {
	const [nome, setNome] = useState('')
	const [senha, setSenha] = useState('')

	const { logar, erroLogin, setErroLogin } = useLogin()

	async function entrar(event: FormEvent) {
		event.preventDefault()

		logar(nome, senha)
	}

	return (
		<section className="secLogin">
			<form onSubmit={entrar}>
				<img src={logo} alt="Brasão da Paróquia" />

				<div className="insereDados">
					<input type="text" id="nome" value={nome} required className={erroLogin ? 'erro' : ''}
						onFocus={() => setErroLogin('')} onChange={({ target }) => setNome(target.value)} />
					<span>Usuário</span>
				</div>

				<div className="insereDados">
					<input type="password" id="senha" value={senha} required className={erroLogin ? 'erro' : ''} autoComplete="off"
						onFocus={() => setErroLogin('')} onChange={({ target }) => setSenha(target.value)} minLength={8} />
					<span>Senha</span>
				</div>

				{erroLogin && <label>{erroLogin}</label>}

				<button type="submit">Entrar</button>
			</form>
		</section>
	)
}

export default Login