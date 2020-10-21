import React from 'react'

import FormMissas from '../../components/FormMissas'
import Footer from '../../components/Footer'

const CadastrarMissa = () => {
	return (
		<>
			<FormMissas titulo="Crie uma nova missa" txtBtn="Cadastrar" mensagemEsquerda="Confira bem os dados antes de salvar!" />

			<Footer />
		</>
	)
}

export default CadastrarMissa