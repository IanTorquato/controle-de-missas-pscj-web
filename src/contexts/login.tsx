import React, { createContext, useContext, useState } from 'react'
import { AxiosResponse } from 'axios'

import api from '../services/api'

interface Pascom {
	id: number
	nome: string
	senha: string
}

interface LoginContextData {
	logado: boolean
	pascom: Pascom | null
	logar(nome: string, senha: string): void
	deslogar(): void
}

interface ResponseData {
	pascom: Pascom
	token: string
}

const LoginContext = createContext<LoginContextData>({} as LoginContextData)

export const LoginProvider: React.FC = ({ children }) => {
	const [pascom, setPascom] = useState<Pascom | null>(pascomLogada())

	function pascomLogada() {
		const pascomLocalStorage = localStorage.getItem('@PSCJ:pascom')
		const tokenLocalStorage = localStorage.getItem('@PSCJ:token')

		if (pascomLocalStorage && tokenLocalStorage) {
			api.defaults.headers.Authorization = `Bearer ${tokenLocalStorage}`

			return JSON.parse(pascomLocalStorage)
		}

		return null
	}

	function logar(nome: string, senha: string) {
		api.post(`/login_pascom`, { nome, senha }).then(({ data }: AxiosResponse<ResponseData>) => {
			setPascom(data.pascom)

			api.defaults.headers.Authorization = `Bearer ${data.token}`

			localStorage.setItem('@PSCJ:pascom', JSON.stringify(data.pascom))
			localStorage.setItem('@PSCJ:token', data.token)
		}).catch(({ response }) => {
			console.log(response)
			return alert(response.data?.erro || 'Falha ao efetuar o login')
		})
	}

	function deslogar() {
		localStorage.clear()
		setPascom(null)
	}

	return <LoginContext.Provider value={{ logado: !!pascom, pascom, logar, deslogar }}> {children} </LoginContext.Provider>
}

export const useLogin = () => {
	return useContext(LoginContext)
}