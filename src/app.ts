import express, { Application } from 'express'
import { useMiddlewares } from './utils/middlewares'

const app: Application = express()

useMiddlewares(app)

export default app
