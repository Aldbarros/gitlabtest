import dotenv from 'dotenv'
import { createServer } from 'http'
import { resolve } from 'path'
import app from './app'

// Setting up vars
dotenv.config({ path: resolve(__dirname, '..', '.env') })

const startServer = (): void => {
  const porta = process.env.PORT ?? 4343
  const servidor = createServer(app)
  servidor.listen(porta, () => {
    console.log(`Servidor sendo executado na porta ${porta}`)
  })
}

startServer()
