import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import FormMissas from '../../components/FormMissas'
import { Missa } from '../../utils/interfaces'
import { mockedMissas } from '../../utils/mocks/missas'

type RouteParams = {
  id: string
}

const EditarMissa = () => {
  const [missa, setMissa] = useState<Missa | null>(null)

  // const navigate = useNavigate()
  const { id } = useParams<RouteParams>()

  useEffect(() => {
    // api.get(`missas?missa_id=${id}`)
    //   .then(({ data }) => setMissa(formatDataHoraMissas(data, true)[0]))
    //   .catch(({ response }) => {
    //     console.log(response)
    //     alert(response?.data.erro || 'Falha ao listar uma única missa.')
    //     navigate('/lista-missas')
    //   })

    setMissa(mockedMissas.find(m => m.id === Number(id)) || null)
  }, [id])

  return (
    missa && <FormMissas titulo="Editando..." txtBtn="Editar" missa={missa} mensagemDireita="Eu avisei! [Risos]" />
  )
}

export default EditarMissa
