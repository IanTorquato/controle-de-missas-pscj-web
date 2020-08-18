import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from '../pages/Home'
import CadastrarMissa from '../pages/CadastrarMissa'
import EditarMissa from '../pages/EditarMissa'
import Contato from '../pages/Contato'

const RoutesLogado = () => {
	return (
		<BrowserRouter>
			<Route component={Home} path="/" exact />
			<Route component={CadastrarMissa} path="/cadastrar-missa" />
			<Route component={EditarMissa} path='/editar-missa' />
			<Route component={Contato} path='/contato' />
		</BrowserRouter>
	)
}

export default RoutesLogado