import React from 'react'

import './App.css'
import Routes from './routes'
import { LoginProvider } from './contexts/login'

const App = () => {
	return (
		<LoginProvider>
			<Routes />
		</LoginProvider>
	)
}

export default App