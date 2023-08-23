/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import pratoController from '../controller/pratoController'

const pratoRouter = Router()

pratoRouter.get('/', pratoController.findAll)

export default pratoRouter
