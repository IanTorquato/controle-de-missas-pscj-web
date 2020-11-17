import React from 'react'

import pageNotFound from '../../assets/pageNotFound.svg'

import './styles.css'

const NotFound: React.FC = () => {
	return (
		<section className="secNotFound">
			<h1>Algo de errado não está certo...</h1>

			<div>Hmm... Acho que você veio parar na dimensão errada. Que tal voltar ao ponto de partida?</div>

			<img src={pageNotFound} alt="Página não encontrada" />
		</section>
	)
}

export default NotFound