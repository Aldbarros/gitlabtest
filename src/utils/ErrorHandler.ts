import type { Request, Response, NextFunction } from 'express'
import { IResponse } from './protocols/IResponse'

export class ErrorHandler extends Error {
  constructor (public nomeErro: string, public mensagemErro: string, public statusCode: number) {
    super('Aconteceu um erro inesperado no servidor, tente novamente')
    this.name = nomeErro
    this.mensagemErro = mensagemErro || this.message
    this.statusCode = statusCode
  }

  print (): void {
    console.error(`Foi encontrado um erro\nNome do erro: ${this.nomeErro}\nMensagem: ${this.mensagemErro}\nStatus Code: ${this.statusCode}\n${JSON.stringify(this.stack, null, 2)}`)
    console.error('Causa: ', this.cause)
  }
}

export const errorMiddleware = (err: ErrorHandler | unknown, req: Request, res: Response<IResponse>, _next: NextFunction): any => {
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
