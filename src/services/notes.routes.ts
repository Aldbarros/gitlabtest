import { Router } from 'express'
import { listarNotasHttp } from './notes.controller'

export const roteadorNotes = Router()

roteadorNotes.route('/')
  .get(listarNotasHttp)
