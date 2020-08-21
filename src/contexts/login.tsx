import React, { createContext, useState } from 'react'

import api from '../services/api'

interface User {
	nome: string
	senha: string
}

interface LoginContextData {
	logado: boolean
	logar(user: User): void
	deslogar(): void
}

const LoginContext = createContext<LoginContextData>({} as LoginContextData)

export const LoginProvider: React.FC = ({ children }) => {
	const [logado, setLogado] = useState(!!localStorage.getItem('@PSCJ:pascomLogada'))

	function logar(user: User) {
		api.post(`/pascom/login`, user).then(() => {

			localStorage.setItem('@PSCJ:pascomLogada', 'true')
			setLogado(true)
		}).catch(({ response }) => alert(response.data.erro))
	}

	function deslogar() {
		localStorage.clear()
		setLogado(false)
	}

	return <LoginContext.Provider value={{ logado, logar, deslogar }}> {children} </LoginContext.Provider>
}

export default LoginContext