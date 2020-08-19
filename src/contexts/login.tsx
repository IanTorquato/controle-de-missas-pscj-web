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
			const response = await api.post(`/pascom/login`, user)

			if (response.data.user) {
				localStorage.setItem('@PSCJ:user', JSON.stringify(response.data.user))
				setUsuario(response.data)
			}
			else (
				alert(response.data.erro)
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