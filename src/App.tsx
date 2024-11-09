import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { LoginProvider } from './contexts/login'
import Routes from './routes'

import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <LoginProvider>
        <div className="avisoBackend">
          <span>O backend já não existe mais, dados totalmente mockados</span>
        </div>
        
        <Routes />
      </LoginProvider>
    </BrowserRouter>
  )
}

export default App
