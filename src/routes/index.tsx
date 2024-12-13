import { Navigate, Route, Routes } from 'react-router-dom'

import { useLogin } from '../contexts/login'

import CadastrarMissa from '../pages/CadastrarMissa'
import Contato from '../pages/Contato'
import DetalhesMissa from '../pages/DetalhesMissa'
import EditarMissa from '../pages/EditarMissa'
import Home from '../pages/Home'
import ListaMissas from '../pages/ListaMissas'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'

const MyRoutes = () => {
  const { logado } = useLogin()

  return (
    !logado ? (
      <Routes>
        <Route element={<Login/>} path="/" />
        <Route element={<Navigate to="/" />}  />
      </Routes>
    ) : (
      <Routes>
        <Route element={<Home/>} path="/"  index />
        <Route element={<CadastrarMissa/>} path="/cadastrar-missa" />
        <Route element={<EditarMissa/>} path='/editar-missa/:id' />
        <Route element={<ListaMissas/>} path='/lista-missas' />
        <Route element={<DetalhesMissa/>} path='/detalhes-missa/:id' />
        <Route element={<Contato/>} path='/contato' />
        <Route element={<NotFound/>} />
      </Routes>
    )
  )
}

export default MyRoutes
