import { notesDBinst } from '../utils/dbInstances'
// import { ErrorHandler } from '../utils/ErrorHandler'
import { paginate } from 'arrpag'
import Fuse from 'fuse.js'
import { InsertNoteDTO } from './DTOS/insertNoteDTO'
import { Nota } from '@prisma/client'
// import { Notes, Note } from './protocols/note'

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
