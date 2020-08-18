import React, { useContext, FormEvent } from 'react'

import './styles.css'
import LoginContext from '../../contexts/login'
import logo from '../../assets/logo.webp'

const Login = () => {
	const { logar } = useContext(LoginContext)

	function entrar(event: FormEvent) {
		event.preventDefault()

		const nome = document.querySelector<HTMLInputElement>('input#nome')?.value.trim()
		const senha = document.querySelector<HTMLInputElement>('input#senha')?.value.trim()

		if (nome && senha) {
			logar({ nome, senha })
		} else {
			alert('Preencha todos os campos para logar!')
		}
	}

	return (
		<section className="secLogin">
			<form onSubmit={entrar}>
				<img src={logo} alt="Brasão da Paróquia" />
				<div className="insereDados">
					<label htmlFor="nome">Usuário:</label>
					<input type="text" id="nome" placeholder="Insira o usuário" />
				</div>
				<div className="insereDados">
					<label htmlFor="senha">Senha:</label>
					<input type="text" id="senha" placeholder="Insira a senha" />
				</div>
				<button type="submit">Entrar</button>
			</form>
		</section>
	)
}

export default Login