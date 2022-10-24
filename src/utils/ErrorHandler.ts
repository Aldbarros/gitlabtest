import type { Request, Response, NextFunction } from 'express'
import { IResponse } from './protocols/IResponse'

export class ErrorHandler extends Error {
  public readonly statusCode: number
  public readonly mensagemErro: string
  public readonly nomeErro: string

  constructor (nomeErro: string, mensagemErro: string, statusCode: number) {
    super()
    this.name = nomeErro
    this.nomeErro = nomeErro
    this.mensagemErro = mensagemErro
    this.statusCode = statusCode
  }
}

export const errorMiddleware = (err: ErrorHandler | unknown, req: Request, res: Response<IResponse>, next: NextFunction): any => {
  console.error(err)
  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      body: {
        timestamp: new Date().toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' }),
        method: req.method,
        message: err.mensagemErro
      }
    })
  }
  res.status(500).json({
    statusCode: 500,
    body: {
      timestamp: new Date().toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' }),
      method: req.method,
      message: 'Aconteceu um erro inesperado, tente novamente'
    }
  })
}

export const erro404 = (_req: Request, _res: Response, next: NextFunction): void => next(new ErrorHandler('NOTFOUND', 'Recurso não encontrado', 404))
