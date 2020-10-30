import React, { createContext, useContext, useState } from 'react'
import { AxiosResponse } from 'axios'
import { fromUnixTime, compareAsc } from 'date-fns'

import api from '../services/api'

interface LoginContextData {
	logado: boolean
	erroLogin: string
	setErroLogin(msnErro: string): void
	logar(nome: string, senha: string): Promise<void>
	deslogar(): void
}

interface ResponseData {
	token: string
}

const LoginContext = createContext<LoginContextData>({} as LoginContextData)

export const LoginProvider: React.FC = ({ children }) => {
	const [erroLogin, setErroLogin] = useState('')
	const [tokenPascom, setTokenPascom] = useState<string | null>(pascomLogada())

	function pascomLogada() {
		const tokenLocalStorage = localStorage.getItem('@PSCJ:token')

		if (tokenLocalStorage) {
			const { exp } = JSON.parse(atob(tokenLocalStorage.split('.')[1]))

			const dataTokenVencimento = fromUnixTime(exp)

			if (compareAsc(dataTokenVencimento, new Date()) > 0) {
				api.defaults.headers.Authorization = `Bearer ${tokenLocalStorage}`

				return tokenLocalStorage
			}

			localStorage.clear()
			setErroLogin('Infelizmente, sua sessão expirou! Por favor, faça o login novamente.')
		}

		return null
	}

	async function logar(nome: string, senha: string) {
		api.post(`/login_pascom`, { nome, senha }).then(({ data }: AxiosResponse<ResponseData>) => {
			localStorage.setItem('@PSCJ:token', data.token)
			api.defaults.headers.Authorization = `Bearer ${data.token}`

			setTokenPascom(data.token)
		}).catch((error) => {
			console.log(error)
			setErroLogin(error.response.data.erro || 'Falha ao efetuar o login')
		})
	}

	function deslogar() {
		localStorage.clear()
		setTokenPascom(null)
	}

	return (
		<LoginContext.Provider value={{ logado: !!tokenPascom, erroLogin, setErroLogin, logar, deslogar }}>
			{children}
		</LoginContext.Provider>
	)
}

export const useLogin = () => {
	return useContext(LoginContext)
}