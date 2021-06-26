import React from 'react'
import { useHistory } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'

import { useLogin } from '../../contexts/login'

import logo from '../../assets/logo.svg'

import './styles.css'

const Header: React.FC = () => {
  const { deslogar } = useLogin()
  const { push } = useHistory()

  function confirmarDeslogar() {
    // eslint-disable-next-line no-restricted-globals
    confirm('Deseja realmente deslogar?') && deslogar()
  }

  return (
    <header className="cabecalho">
      <div onClick={() => { push('/') }}>
        <img src={logo} alt="Brasão da Paróquia" />

        <h1><abbr title="Paróquia Sagrado Coração de Jesus">PSCJ</abbr></h1>
      </div>

      <div>
        <h2>Gravatal - <abbr title="Santa Catarina">SC</abbr></h2>

        <div className="btnDeslogar" onClick={confirmarDeslogar}>
          <FiLogOut size={32} />
        </div>
      </div>
    </header>
  )
}

export default Header
