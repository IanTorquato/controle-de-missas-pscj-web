import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Login from '../pages/Login'

const RoutesDeslogado = () => {
	return (
		<BrowserRouter>
			<Route component={Login} path="/" exact />
		</BrowserRouter>
	)
}

export default RoutesDeslogado