import React, { createContext, useState } from 'react'

import api from '../services/api'

interface User {
	nome: string
	senha: string
}

interface LoginContextData {
	logado: boolean
	logar(user: User): Promise<void>
}

const LoginContext = createContext<LoginContextData>({} as LoginContextData)

export const LoginProvider: React.FC = ({ children }) => {
	const [usuario, setUsuario] = useState(localStorage.getItem('@PSCJ:user'))

	async function logar(user: User) {
		try {
			const { data } = await api.post(`/pascom/login`, user)

			if (data.nome && data.senha) {
				const usuarioPascom = { nome: data.nome, senha: data.senha }

				localStorage.setItem('@PSCJ:user', JSON.stringify(usuarioPascom))
				setUsuario(data)
			}
			else (
				alert(data.erro)
			)
		} catch (erro) {
			alert(erro)
		}
	}

	return (
		<LoginContext.Provider value={{ logado: !!usuario, logar }}>
			{children}
		</LoginContext.Provider>
	)
}
export default LoginContext