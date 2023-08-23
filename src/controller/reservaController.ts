/* eslint-disable @typescript-eslint/naming-convention */
import { type Request, type Response } from 'express'
import ReservaModel from '../models/reservaModel'
import { handleSequelizeValidationError } from '../lib/handleSequelizeValidationError'

class ReservaController {
  async findAll (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const reservas = await ReservaModel.findAll()
      return res.json({ reservas })
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }

  async findOne (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const { reserva_id } = req.params
      const reserva = await ReservaModel.findByPk(reserva_id)

      if (reserva == null) {
        return res.status(404).json({ message: 'Reserva não encontrada' })
      }

      return res.json({ reserva })
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }

  async findByUser (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const { fk_usuario_id } = req.params
      const reservas = await ReservaModel.findAll({ where: { fk_usuario_id } })

      if (reservas == null) {
        return res.status(404).json({ message: 'Reservas não encontradas' })
      }

      return res.json({ reservas })
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }

  async create (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const reserva_body: ReservaModel = req.body

      const horariosDisponiveis = await ReservaModel.findHorariosDisponiveis(reserva_body.reserva_data as unknown as string)

      if (!horariosDisponiveis.includes(reserva_body.reserva_horario)) {
        return res.status(400).json({ message: 'Horário indisponível' })
      }

      const reserva = await ReservaModel.create(reserva_body)

      return res.status(201).json({ reserva })
    } catch (error: any) {
      return res.status(500).json(handleSequelizeValidationError(error))
    }
  }

  async findHorariosDisponiveis (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const { reserva_data } = req.params
      const horariosDisponiveis = await ReservaModel.findHorariosDisponiveis(reserva_data)

      return res.json({ horariosDisponiveis })
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export default new ReservaController()
