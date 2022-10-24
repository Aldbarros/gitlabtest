import { Router } from 'express'
import { roteadorNotes } from './services/notes.routes'

export const appRoutes = Router()

appRoutes.use('/notes', roteadorNotes)
