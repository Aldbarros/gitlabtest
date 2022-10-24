import type { Request, Response, NextFunction } from 'express'
// import { ErrorHandler } from '../utils/ErrorHandler'
import { IResponse } from '../utils/protocols/IResponse'
import { listarNotas } from './notes.service'

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
