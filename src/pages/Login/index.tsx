import React, { FormEvent, useState } from 'react'

import { useLogin } from '../../contexts/login'
import logo from '../../assets/logo.svg'

import './styles.css'

const Login: React.FC = () => {
	const [nome, setNome] = useState('')
	const [senha, setSenha] = useState('')
	const [focoInput, setFocoInput] = useState(true)

	const { logar, erroLogin, setErroLogin } = useLogin()

	async function entrar(event: FormEvent) {
		event.preventDefault()

		logar(nome, senha)
	}

	return (
		<section className="secLogin">
			<form onSubmit={entrar} autoComplete="off">
				<img src={logo} alt="Brasão da Paróquia" />

				<div className="insereDados">
					<input type="text" value={nome} required className={erroLogin ? 'erro' : ''} autoComplete="off"
						onChange={({ target }) => setNome(target.value)} readOnly={focoInput} onFocus={() => {
							setErroLogin('')
							setFocoInput(false)
						}} />
					<span>Usuário</span>
				</div>

				<div className="insereDados">
					<input type="password" value={senha} required className={erroLogin ? 'erro' : ''} autoComplete="off"
						onChange={({ target }) => setSenha(target.value)} minLength={8} onFocus={() => {
							setErroLogin('')
							setFocoInput(false)
						}} />
					<span>Senha</span>
				</div>

				{erroLogin && <label>{erroLogin}</label>}

				<button type="submit">Entrar</button>
			</form>
		</section>
	)
}

export default Login