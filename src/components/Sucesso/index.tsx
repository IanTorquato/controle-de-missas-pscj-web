import React from 'react'
import { FiCheckCircle, FiX } from 'react-icons/fi'

import './styles.css'

const Sucesso = () => {
	function fecharSucesso() {
		const divSucesso = document.body.querySelector<HTMLDivElement>('div.divSucesso')?.style
		if (divSucesso) divSucesso.zIndex = '-1'
		window.onscroll = null
	}

	return (
		<div className="divSucesso">
			<div className="fecharSucesso" onClick={fecharSucesso}><FiX size={32} /></div>

			<div className="zoom">
				<div className="logoSucesso"><FiCheckCircle size={50} /></div>
				<h1 className="txtSucesso">Concluído!</h1>
			</div>
		</div>
	)
}

export default Sucesso