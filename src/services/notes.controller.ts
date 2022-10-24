import type { Request, Response, NextFunction } from 'express'
// import { ErrorHandler } from '../utils/ErrorHandler'
import { IResponse } from '../utils/protocols/IResponse'
import { adicionarNota, listarNotas } from './notes.service'
import { validarNota } from './notes.validation'

export const listarNotasHttp = async (req: Request, res: Response<IResponse>, next: NextFunction): Promise<any> => {
  try {
    const resultado = await listarNotas(req.query.pagina as string, req.query.porPagina as string, req.query.sq as string)
    return res.status(200).json({
      statusCode: 200,
      body: resultado
    })
  } catch (err: unknown) {
    console.error(err)
  }
}

export const adicionarNotaHttp = async (req: Request, res: Response<IResponse>, next: NextFunction): Promise<any> => {
  try {
    const nota = await validarNota.validateAsync(req.body)
    await adicionarNota(nota)
    return res.status(201).json({
      statusCode: 200,
      body: {
        timestamp: new Date().toLocaleDateString('pt-pt', { day: 'numeric', month: 'long', year: 'numeric' }),
        message: 'Nota criada',
        method: req.method
      }
    })
  } catch (err: any) {
    console.error(err)
    if (err.name === 'ValidationError') {
      for (const message of err.messages) {
        return res.status(400).json({
          statusCode: 400,
          body: {
            timestamp: new Date().toLocaleDateString('pt-pt', { day: 'numeric', month: 'long', year: 'numeric' }),
            message,
            method: req.method
          }
        })
      }
    }
  }
}
