import { notesDBinst } from '../utils/dbInstances'
import { paginate } from 'arrpag'
import Fuse from 'fuse.js'
import { InsertNoteDTO } from './DTOS/insertNoteDTO'
import { Nota } from '@prisma/client'
import { ErrorHandler } from '../utils/ErrorHandler'
import { UpdateNoteDTO } from './DTOS/updateNoteDTO'

export const listarNotas = async (pagina: string, porPagina: string, sq?: string): Promise<any> => {
  const notas = await notesDBinst.findMany()
  const notasPag = paginate(notas, parseInt(pagina), parseInt(porPagina))
  if ((sq != null) && sq?.length > 0) {
    const fuse = new Fuse(notas, {
      keys: ['nota']
    })
    const lista = fuse.search(sq).map((nota: { item: { idNota: string, nota: string } }) => ({ idNota: nota.item.idNota, nota: nota.item.nota }))
    return lista
  }
  return notasPag
}

export const adicionarNota = async (nota: InsertNoteDTO): Promise<Nota> => {
  const notaInput = await notesDBinst.create({ data: nota })
  return notaInput
}

export const listarUmaNota = async (idNota: string): Promise<Nota> => {
  const nota = await notesDBinst.findUnique({ where: { idNota } })
  if (nota === null) {
    throw new ErrorHandler('NOTFOUND', 'Nota não encontrada', 404)
  }
  return nota
}

export const atualizarUmaNota = async ({ idNota, nota }: UpdateNoteDTO): Promise<Nota> => {
  await listarUmaNota(idNota)
  const notaAtualizada = await notesDBinst.update({ where: { idNota }, data: { nota } })
  return notaAtualizada
}

export const eliminarUmaNota = async (idNota: string): Promise<Nota> => {
  const notaFound = await listarUmaNota(idNota)
  const notaEliminada = await notesDBinst.delete({ where: { idNota: notaFound.idNota } })
  return notaEliminada
}
