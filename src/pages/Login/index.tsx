import React, { useContext, FormEvent } from 'react'

import './styles.css'
import LoginContext from '../../contexts/login'
import logo from '../../assets/logo.svg'

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
					<input type="text" id="nome" placeholder="Nome de Usuário" autoComplete="off" required />

					<svg>
						<path d="M10 11.25C13.1055 11.25 15.625 8.73047 15.625 5.625C15.625 2.51953 13.1055 0 10 0C6.89453 0 4.375 2.51953 4.375 5.625C4.375 8.73047 6.89453 11.25 10 11.25ZM15 12.5H12.8477C11.9805 12.8984 11.0156 13.125 10 13.125C8.98438 13.125 8.02344 12.8984 7.15234 12.5H5C2.23828 12.5 0 14.7383 0 17.5V18.125C0 19.1602 0.839844 20 1.875 20H18.125C19.1602 20 20 19.1602 20 18.125V17.5C20 14.7383 17.7617 12.5 15 12.5Z" />
					</svg>
				</div>

				<div className="insereDados">
					<input type="password" id="senha" placeholder="Senha" autoComplete="off" required minLength={8} />

					<svg>
						<path d="M15.625 8.75H14.6875V5.9375C14.6875 2.66406 12.0234 0 8.75 0C5.47656 0 2.8125 2.66406 2.8125 5.9375V8.75H1.875C0.839844 8.75 0 9.58984 0 10.625V18.125C0 19.1602 0.839844 20 1.875 20H15.625C16.6602 20 17.5 19.1602 17.5 18.125V10.625C17.5 9.58984 16.6602 8.75 15.625 8.75ZM11.5625 8.75H5.9375V5.9375C5.9375 4.38672 7.19922 3.125 8.75 3.125C10.3008 3.125 11.5625 4.38672 11.5625 5.9375V8.75Z" />
					</svg>
				</div>

				<button type="submit">Entrar</button>
			</form>
		</section>
	)
}

export default Login