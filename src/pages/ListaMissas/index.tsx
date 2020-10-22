import React, { useState } from 'react'

import Missa from '../../utils/interfaces'

const ListaMissas: React.FC = () => {
	const [missas, setMissas] = useState<Missa[]>([])

	return (
		<h2>Funcionando!</h2>
	)
}

export default ListaMissas