import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BiChurch } from 'react-icons/bi'
import { GiHealthNormal } from 'react-icons/gi'
import { RiComputerLine } from 'react-icons/ri'

import api from '../../services/api'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Missa } from '../../utils/interfaces'
import { formatDataHoraMissas } from '../../utils/tratandoDatas'
import igrejaCentro from '../../assets/dentroIgrejaCentro.jpg'
import iconFlexaLoop from '../../assets/icons/flechaLoop.png'
import iconFlexaCurva from '../../assets/icons/flechaCurva.png'

import './styles.css'

const Home = () => {
  const [missas, setMissas] = useState<Missa[]>([])
  const [erroMissas, setErroMissas] = useState('')
  const [imgIgrejaLoad, setImgIgrejaLoad] = useState(false)

  useEffect(() => {
    api.get('missas?quantidade_missas=6')
      .then(({ data }) => setMissas(formatDataHoraMissas(data)))
      .catch(({ response }) => {
        console.log(response)
        return setErroMissas(response?.data.erro || 'Falha ao listar missas.')
      })
  }, [])

  return (
    <div className="scrollFixado">
      <Header />

      <section className="secHome">
        <div>
          <h1 className="tituloSSCJ">Santuário Sagrado <br /> Coração de <br /> Jesus</h1>

          <div className="alinhaHorizontal">
            <div className="alinhaHorizontal">
              <div className="curiosidade" id="curiosidadeVermelha" >
                <BiChurch size={64} />
              </div>

              <div className="curiosidade" id="curiosidadeDourada" >
                <GiHealthNormal size={64} />
              </div>

              <div className="curiosidade" id="curiosidadeAzul" >
                <RiComputerLine size={64} />
              </div>
            </div>

            <div className="imagemDecorada">
              <img src={igrejaCentro} alt="Igreja do Centro" onLoad={() => setImgIgrejaLoad(true)} />

              {imgIgrejaLoad && (
                <>
                  <div className="decoracaoImagem" id="decoracaoImgVermelha"></div>
                  <div className="decoracaoImagem" id="decoracaoImgDourada"></div>
                  <div className="decoracaoImagem" id="decoracaoImgAzul"></div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="secBotoes">
        <div className="conteudoBotoes">
          <h1 className="tituloBotoes">Então, o que temos <br /> pra hoje?</h1>

          <div className="alinhaDireita">
            <div className="mensagensBotoes">
              <div className="descricaoBotao" id="txtAlinhadoDireita">
                Aqui, você pode cadastrar <br /> uma nova missa...
                <img className="flechaLoop" src={iconFlexaLoop} alt="Flecha" />
              </div>

              <nav>
                <Link className="btnsNavegacao" to="/cadastrar-missa" onClick={() => { window.scrollTo(0, 0) }}>
                  Cadastro de Missas
                </Link>

                <Link className="btnsNavegacao" to="/lista-missas" onClick={() => { window.scrollTo(0, 0) }}>
                  Lista de Missas
                </Link>
              </nav>

              <div className="descricaoBotao" id="txtColadoDireita">
                <img className="flechaCurva" src={iconFlexaCurva} alt="Flecha" />
                ...e aqui, você vê as missas <br /> cadastradas e pode editá-las <br /> ou excluí-las!
              </div>
            </div>
          </div>
        </div>

        <div className="decoracaoBotoes" id="decoracaoBtnVermelho"></div>
        <div className="decoracaoBotoes" id="decoracaoBtnDourado"></div>
        <div className="decoracaoBotoes" id="decoracaoBtnAzul"></div>
      </section>

      <section className="secCronograma">
        <div className="tituloCronograma"></div>

        <h2 className="semMissas">{erroMissas}</h2>

        <aside className="gridMissas">
          {missas.map((missa, index) => {
            const [data, hora] = missa.data_hora.split('T')

            return (
              <Link className="detalhesMissa" to={`/detalhes-missa/${missa.id}`} key={missa.id} id={
                index < 2 ? 'detalhesMissaVermelha' : index < 4 ? 'detalhesMissaDourada' : 'detalhesMissaAzul'
              }>
                <h1>{data} - {hora}</h1>

                <h2>{missa.dia_semana} | {missa.local_nome.toUpperCase()}</h2>
              </Link>
            )
          })}
        </aside>
      </section>

      <Footer />
    </div>
  )
}

export default Home
