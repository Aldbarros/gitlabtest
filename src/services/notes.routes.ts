import { Router } from 'express'
import { listarNotasHttp, adicionarNotaHttp } from './notes.controller'

export const roteadorNotes = Router()

roteadorNotes.route('/')
  .get(listarNotasHttp)
  .post(adicionarNotaHttp)
