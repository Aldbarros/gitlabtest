import { Router } from 'express'
import { listarNotasHttp, adicionarNotaHttp, atualizarUmaNotaHttp, eliminarUmaNotaHttp, listarUmaNotaHttp } from './notes.controller'

export const roteadorNotes = Router()

roteadorNotes.route('/')
  .get(listarNotasHttp)
  .post(adicionarNotaHttp)

roteadorNotes.route('/:idNota')
  .get(listarUmaNotaHttp)
  .delete(eliminarUmaNotaHttp)
  .put(atualizarUmaNotaHttp)
