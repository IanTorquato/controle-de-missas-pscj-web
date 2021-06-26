import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import api from '../../services/api'
import FormMissas from '../../components/FormMissas'
import { Missa } from '../../utils/interfaces'
import { formatDataHoraMissas } from '../../utils/tratandoDatas'

interface RouteParams {
  id: string
}

const EditarMissa = () => {
  const [missa, setMissa] = useState<Missa | null>(null)

  const { push } = useHistory()
  const { id } = useParams<RouteParams>()

  useEffect(() => {
    api.get(`missas?missa_id=${id}`)
      .then(({ data }) => setMissa(formatDataHoraMissas(data, true)[0]))
      .catch(({ response }) => {
        console.log(response)
        alert(response?.data.erro || 'Falha ao listar uma única missa.')
        push('/lista-missas')
      })
  }, [id, push])

  return (
    missa && <FormMissas titulo="Editando..." txtBtn="Editar" missa={missa} mensagemDireita="Eu avisei! [Risos]" />
  )
}

export default EditarMissa
