import React, { useEffect, useState } from 'react'
import { BiCalendar, BiEditAlt, BiTrash } from 'react-icons/bi'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { FiClock } from 'react-icons/fi'
import { HiUserGroup } from 'react-icons/hi'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Header from '../../components/Header'
import { Missa } from '../../utils/interfaces'
import { formatDataHoraMissas } from '../../utils/tratandoDatas'

import { mockedMissas } from '../../utils/mocks/missas'
import { mockedUsuarios } from '../../utils/mocks/usuarios'

import './styles.css'

export interface Usuario {
  id: number
  nome: string
  foto: string
  quantidade_pessoas: number
}

type RouteParams = {
  id: string
}

const DetalhesMissa: React.FC = () => {
  const [missa, setMissa] = useState<Missa | null>(null)
  const [usuarios, setUsuarios] = useState<Usuario[] | null>(null)

  const navigate = useNavigate()

  const { id } = useParams<RouteParams>()

  const [data, hora] = missa ? missa.data_hora.split('T') : []

  useEffect(() => {
    const randomMockedMissa = mockedMissas[Math.round(Math.random() * mockedMissas.length)]

    setMissa(formatDataHoraMissas([randomMockedMissa], true)[0])

    if (randomMockedMissa.pessoas_cadastradas > 0) {
      setUsuarios(mockedUsuarios)
    }

    // api.get(`missas?missa_id_usuarios=${id}`)
    //   .then(({ data }) => {
    //     setMissa(formatDataHoraMissas(data.missaLocalUrl, true)[0])

    //     if (data.usuarios) { setUsuarios(data.usuarios) }
    //   })
    //   .catch(({ response }) => {
    //     console.log(response)
    //     alert(response?.data.erro || 'Falha ao listar uma única missa.')
    //     navigate('/lista-missas')
    //   })
  }, [id])

  function excluirMissa(id: number) {
    // eslint-disable-next-line no-restricted-globals
    // if (confirm('Deseja realmente excluir esta missa?')) {
    //   api.delete(`missas/${id}`)
    //     .then(({ data }) => {
    //       alert(data.mensagem)
    //       navigate('/lista-missas')
    //     })
    //     .catch(({ response }) => {
    //       console.log(response)
    //       alert(response?.data.erro || 'Falha ao excluir missa.')
    //       window.location.reload()
    //     })
    // }
  }

  function bordaCantoUsuario(index: number, totalUsuarios: number) {
    // Verifica se é o primeiro usuário
    if (index === 0) { return { borderTopLeftRadius: 8 } }

    // Verifica se é o usuário ao final da primeira linha
    else if (index === 3) { return { borderTopRightRadius: 8 } }

    // Verifica se é o primeiro usuário da última linha
    else if (index % 4 === 0 && index >= (totalUsuarios - 4)) { return { borderBottomLeftRadius: 8 } }

    // Verifica se é o último usuário
    else if ((index + 1) % 4 === 0 && totalUsuarios === index + 1) { return { borderBottomRightRadius: 8 } }
  }

  // function usuariosManualmente() {
  // 	let usuariosManuais: Usuarios[] = []

  // 	for (let index = 0; index < 15; index++) {
  // 		usuariosManuais.push({
  // 			id: index, nome: `Usuario ${index}`, foto: `http://localhost:3333/uploads/fotosPerfis/${index}.png`, quantidade_pessoas: 8
  // 		})
  // 	}

  // 	return usuariosManuais
  // }

  return (
    <>
      <Header />

      <section className="secDetalhesMissa">
        {missa && (
          <>
            <header>
              <img src={missa.local_url} alt="Igreja" />

              <div className="dadosMissa">
                <div>
                  <h1>{missa.nome}</h1>

                  <div>
                    <div onClick={() => excluirMissa(Number(id))}>
                      <BiTrash size={24} color="#e5e5e5" />
                    </div>

                    <Link to={`/editar-missa/${id}`}>
                      <BiEditAlt size={24} color="#e5e5e5" />
                    </Link>
                  </div>
                </div>

                <div>
                  <span>
                    <BiCalendar size={24} color="#e5e5e5" />
                    {data}
                  </span>

                  <span>
                    <FiClock size={24} color="#e5e5e5" />
                    {hora}
                  </span>

                  <span>
                    <FaMapMarkedAlt size={24} color="#e5e5e5" />
                    {missa.local_nome}
                  </span>

                  <span>
                    <HiUserGroup size={24} color="#e5e5e5" />
                    {missa.pessoas_cadastradas}/{missa.max_pessoas}
                  </span>
                </div>
              </div>
            </header>

            <hr />

            {usuarios ?
              <div className="gridUsuarios">
                {usuarios.map((usuario, index) => (
                  <div className="usuario" key={usuario.id} style={bordaCantoUsuario(index, usuarios.length)}>
                    <img src={usuario.foto} alt="Avatar do Usuário" />

                    <div>
                      <span className="nomeUsuario">{usuario.nome}</span>
                      <br />
                      <span className="quantUsuario">
                        <HiUserGroup size={24} color="#e5e5e5" />
                        {usuario.quantidade_pessoas}/{missa.max_pessoas}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              : <div className="semUsuarios"> <h3>Ish! Ninguém se cadastrou ainda...</h3> </div>
            }
          </>
        )}
      </section>
    </>
  )
}

export default DetalhesMissa
