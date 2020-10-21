import React, { FormEvent, useState } from 'react'

import { useLogin } from '../../contexts/login'
import logo from '../../assets/logo.svg'

import './styles.css'

const Login: React.FC = () => {
	const [nome, setNome] = useState('')
	const [senha, setSenha] = useState('')
	const [erroLogin, setErroLogin] = useState(false)

	const { logar } = useLogin()

	async function entrar(event: FormEvent) {
		event.preventDefault()

		setErroLogin(await logar(nome, senha))

		setNome('')
		setSenha('')
	}

	return (
		<section className="secLogin">
			<form onSubmit={entrar} autoComplete="off">
				<img src={logo} alt="Brasão da Paróquia" />

				<div className="insereDados">
					<input type="text" id="nome" value={nome} autoComplete="off" required className={erroLogin ? 'erro' : ''}
						onFocus={() => setErroLogin(false)} onChange={({ target }) => setNome(target.value)} />
					<span>Usuário</span>
				</div>

				<div className="insereDados">
					<input type="password" id="senha" value={senha} autoComplete="off" required className={erroLogin ? 'erro' : ''}
						onFocus={() => setErroLogin(false)} onChange={({ target }) => setSenha(target.value)} minLength={8} />
					<span>Senha</span>
				</div>

				<button type="submit">Entrar</button>
			</form>
		</section>
	)
}

export default Login