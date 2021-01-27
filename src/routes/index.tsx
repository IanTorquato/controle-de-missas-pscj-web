import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { useLogin } from '../contexts/login'

import Login from '../pages/Login'
import Home from '../pages/Home'
import CadastrarMissa from '../pages/CadastrarMissa'
import EditarMissa from '../pages/EditarMissa'
import ListaMissas from '../pages/ListaMissas'
import DetalhesMissa from '../pages/DetalhesMissa'
import Contato from '../pages/Contato'
import NotFound from '../pages/NotFound'

const Routes = () => {
	const { logado } = useLogin()

	return (
		!logado ? (
			<Switch>
				<Route component={Login} path="/" />
				<Redirect to="/" />
			</Switch>
		) : (
				<Switch>
					<Route component={Home} path="/" exact />
					<Route component={CadastrarMissa} path="/cadastrar-missa" />
					<Route component={EditarMissa} path='/editar-missa/:id' />
					<Route component={ListaMissas} path='/lista-missas' />
					<Route component={DetalhesMissa} path='/detalhes-missa/:id' />
					<Route component={Contato} path='/contato' />
					<Route component={NotFound} />
				</Switch>
			)
	)
}

export default Routes