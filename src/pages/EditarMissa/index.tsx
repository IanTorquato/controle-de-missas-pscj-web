import React, { useState, useEffect } from 'react'

import FormMissas from '../../components/FormMissas'
import Footer from '../../components/Footer'
import Missa from '../../utils/interfaces'

const EditarMissa = (missaParaEditar: Missa) => {
	// const [missa, setMissa] = useState<Missa>(missaParaEditar)

	return (
		<>
			<FormMissas titulo="Editando..." txtBtn="Editar" missa={missaParaEditar} mensagemDireita="Eu avisei! [Risos]" />

			<Footer />
		</>
	)
}

export default EditarMissa