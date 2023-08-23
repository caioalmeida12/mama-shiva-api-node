/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import reservaController from '../controller/reservaController'

const reservaRouter = Router()

reservaRouter.get('/', reservaController.findAll)
reservaRouter.get('/:reserva_id', reservaController.findOne)
reservaRouter.get('/usuario/:fk_usuario_id', reservaController.findByUser)
reservaRouter.get('/horarios-disponiveis/:reserva_data', reservaController.findHorariosDisponiveis)
reservaRouter.post('/', reservaController.create)

export default reservaRouter
