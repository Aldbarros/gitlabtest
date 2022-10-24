export interface Note {
  id: string
  nota: string
}

export interface Notes {
  totalResults: number
  results: any
  pages: number
  currentPage: number
  prevPage: number
  nextPage: number
  perPage: number
  totalCurrentResults: number
}
