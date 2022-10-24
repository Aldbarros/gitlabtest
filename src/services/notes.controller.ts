import type { Request, Response, NextFunction } from 'express'
// import { ErrorHandler } from '../utils/ErrorHandler'
import { IResponse } from '../utils/protocols/IResponse'
import { adicionarNota, listarNotas, atualizarUmaNota, eliminarUmaNota, listarUmaNota } from './notes.service'
import { atualizarNota, validarNota } from './notes.validation'

export const listarUmaNotaHttp = async (req: Request, res: Response<any>, next: NextFunction): Promise<any> => {
  try {
    const resultado = await listarUmaNota(req.params.idNota)
    return res.status(200).json({
      statusCode: 200,
      body: resultado
    })
  } catch (err: unknown) {
    console.error(err)
  }
}

export const eliminarUmaNotaHttp = async (req: Request, res: Response<any>, next: NextFunction): Promise<any> => {
  try {
    const resultado = await eliminarUmaNota(req.params.idNota)
    return res.status(200).json({
      statusCode: 200,
      body: resultado
    })
  } catch (err: any) {
    console.error(err)
    if (err.name === 'NOTFOUND') {
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        body: {
          timestamp: new Date().toLocaleDateString('pt-pt', { day: 'numeric', month: 'long', year: 'numeric' }),
          message: err.mensagemErro,
          method: req.method
        }
      })
    }
  }
}

export const atualizarUmaNotaHttp = async (req: Request, res: Response<any>, next: NextFunction): Promise<any> => {
  try {
    const corpo = await atualizarNota.validateAsync(req.body)
    const body = {
      idNota: req.params.idNota,
      nota: corpo.nota
    }
    const resultado = await atualizarUmaNota(body)
    return res.status(200).json({
      statusCode: 200,
      body: resultado
    })
  } catch (err: any) {
    console.error(err)
    if (err.name === 'NOTFOUND') {
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        body: {
          timestamp: new Date().toLocaleDateString('pt-pt', { day: 'numeric', month: 'long', year: 'numeric' }),
          message: err.mensagemErro,
          method: req.method
        }
      })
    }
    if (err.name === 'ValidationError') {
      for (const message of err.details) {
        return res.status(400).json({
          statusCode: 400,
          body: {
            timestamp: new Date().toLocaleDateString('pt-pt', { day: 'numeric', month: 'long', year: 'numeric' }),
            message: message.message,
            method: req.method
          }
        })
      }
    }
  }
}

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
      for (const message of err.details) {
        return res.status(400).json({
          statusCode: 400,
          body: {
            timestamp: new Date().toLocaleDateString('pt-pt', { day: 'numeric', month: 'long', year: 'numeric' }),
            message: message.message,
            method: req.method
          }
        })
      }
    }
  }
}
