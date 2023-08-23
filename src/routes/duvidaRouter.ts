/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import duvidaController from '../controller/duvidaController'

const duvidaRouter = Router()

duvidaRouter.get('/', duvidaController.findAll)
duvidaRouter.get('/:duvida_id', duvidaController.findOne)
duvidaRouter.get('/usuario/:fk_usuario_id', duvidaController.findByUser)
duvidaRouter.post('/', duvidaController.create)

export default duvidaRouter
