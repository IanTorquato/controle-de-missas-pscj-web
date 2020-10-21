import React from 'react'

import { useLogin } from '../contexts/login'
import RoutesLogado from './logado.routes'
import RoutesDeslogado from './deslogado.routes'

const Routes = () => {
	const { logado } = useLogin()

	return logado ? <RoutesLogado /> : <RoutesDeslogado />
}

export default Routes