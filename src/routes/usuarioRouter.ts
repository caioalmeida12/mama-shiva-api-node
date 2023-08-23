/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import usuarioController from '../controller/usuarioController'

const usuarioRouter = Router()

usuarioRouter.get('/', usuarioController.findAll)
usuarioRouter.get('/:usuario_id', usuarioController.findOne)
usuarioRouter.post('/', usuarioController.create)
usuarioRouter.put('/:usuario_id', usuarioController.update)
usuarioRouter.delete('/:usuario_id', usuarioController.delete)
usuarioRouter.post('/authenticate', usuarioController.authenticate)

export default usuarioRouter
