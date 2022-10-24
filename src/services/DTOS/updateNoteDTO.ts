import { InsertNoteDTO } from './insertNoteDTO'

export interface UpdateNoteDTO extends Partial<InsertNoteDTO> {
  idNota: string
}
