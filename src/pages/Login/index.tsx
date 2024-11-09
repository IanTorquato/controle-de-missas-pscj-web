import React, { FormEvent, useState } from 'react'

import logo from '../../assets/logo.svg'
import { useLogin } from '../../contexts/login'

import './styles.css'

const Login: React.FC = () => {
  const [nome, setNome] = useState('')
  const [senha, setSenha] = useState('')
  const [focoInput, setFocoInput] = useState(true)

  const { logar, erroLogin, setErroLogin } = useLogin()

  async function entrar(event: FormEvent) {
    event.preventDefault()

    logar(nome, senha)
  }

  return (
    <section className="secLogin">
      <form onSubmit={entrar} autoComplete="off">
        <img src={logo} alt="Brasão da Paróquia" />

        <div className="insereDados">
          <input
            title="123pascom-Admin"
            autoComplete="off"
            className={erroLogin ? 'erro' : ''}
            type="text"
            value={nome}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNome(event.target.value)} readOnly={focoInput} onFocus={() => {
              setErroLogin('')
              setFocoInput(false)
            }}
            required
          />

          <span>Usuário</span>
        </div>

        <div className="insereDados">
          <input
            title="Admin-pascom123"
            className={erroLogin ? 'erro' : ''}
            type="password"
            value={senha}
            autoComplete="off"
            onChange={({ target }) => setSenha(target.value)} minLength={8} onFocus={() => {
              setErroLogin('')
              setFocoInput(false)
            }}
            required
          />

          <span>Senha</span>
        </div>

        {erroLogin && <label>{erroLogin}</label>}

        <button type="submit">Entrar</button>
      </form>
    </section>
  )
}

export default Login
