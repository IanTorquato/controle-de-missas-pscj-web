import React, { useContext } from 'react'

import LoginContext from '../contexts/login'
import RoutesLogado from './logado.routes'
import RoutesDeslogado from './deslogado.routes'

const Routes = () => {
	const { logado } = useContext(LoginContext)

	return logado ? <RoutesLogado /> : <RoutesDeslogado />
}

export default Routes