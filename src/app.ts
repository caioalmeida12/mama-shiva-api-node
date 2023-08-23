import express from 'express'
import path from 'path'

import usuarioRouter from './routes/usuarioRouter'
import pratoRouter from './routes/pratoRouter'
import duvidaRouter from './routes/duvidaRouter'
import enderecoRouter from './routes/enderecoRouter'
import reservaRouter from './routes/reservaRouter'

export class App {
  public server: express.Application

  constructor () {
    this.server = express()
    this.middleware()
    this.routers()
  }

  private middleware (): void {
    this.server.use(express.json())
    this.server.use(express.urlencoded({ extended: true }))
    this.server.use(express.static(path.join(__dirname, 'public')))
  }

  private routers (): void {
    this.server.use('/usuario', usuarioRouter)
    this.server.use('/prato', pratoRouter)
    this.server.use('/duvida', duvidaRouter)
    this.server.use('/endereco', enderecoRouter)
    this.server.use('/reserva', reservaRouter)
  }
}
