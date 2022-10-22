import express, { Application } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'

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
  // erros
}
