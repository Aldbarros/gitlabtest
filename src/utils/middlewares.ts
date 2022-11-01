import express, { Application } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import { errorMiddleware, erro404 } from './ErrorHandler'
import { appRoutes } from '../app.routes'
import swaggerUi from 'swagger-ui-express'
import { resolve } from 'path'
import { readFileSync } from 'fs'

const swaggerFile = resolve(__dirname, 'swagger.json')
const swaggerData = JSON.parse(readFileSync(swaggerFile, 'utf-8'))

export const useMiddlewares = (app: Application): void => {
  app.use(compression())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(helmet())
  app.use(cors({
    origin: '*',
    credentials: true
  }))
  app.use(morgan('dev'))
  // rotas
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerData))
  app.use('/api', appRoutes)
  // erros
  app.use(erro404)
  app.use(errorMiddleware)
}
