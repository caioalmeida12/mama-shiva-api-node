/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import enderecoController from '../controller/enderecoController'

const enderecoRouter = Router()

enderecoRouter.get('/', enderecoController.findAll)
enderecoRouter.get('/:endereco_id', enderecoController.findOne)
enderecoRouter.get('/usuario/:fk_usuario_id', enderecoController.findByUser)
enderecoRouter.post('/', enderecoController.create)

export default enderecoRouter
