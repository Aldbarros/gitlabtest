export interface IResponse {
  statusCode: number
  body: {
    timestamp: string
    method: string
    message: string
  }
}
