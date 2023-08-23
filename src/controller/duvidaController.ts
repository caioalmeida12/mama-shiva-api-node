/* eslint-disable @typescript-eslint/naming-convention */
import { type Request, type Response } from 'express'
import { DuvidaModel } from '../models/duvidaModel'
import { handleSequelizeValidationError } from '../lib/handleSequelizeValidationError'

class DuvidaController {
  async findAll (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const duvidas = await DuvidaModel.findAll()
      return res.json({ duvidas })
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }

  async findOne (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const { duvida_id } = req.params
      const duvida = await DuvidaModel.findByPk(duvida_id)

      if (duvida == null) {
        return res.status(404).json({ message: 'Dúvida não encontrada' })
      }

      return res.json({ duvida })
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }

  async findByUser (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const { fk_usuario_id } = req.params
      const duvidas = await DuvidaModel.findAll({ where: { fk_usuario_id } })

      if (duvidas == null) {
        return res.status(404).json({ message: 'Dúvidas não encontradas' })
      }

      return res.json({ duvidas })
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }

  async create (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const { duvida_assunto, duvida_mensagem, fk_usuario_id } = req.body

      const duvida = await DuvidaModel.create({ duvida_assunto, duvida_mensagem, fk_usuario_id })

      return res.status(201).json({ duvida })
    } catch (error: any) {
      return res.status(500).json(handleSequelizeValidationError(error))
    }
  }
}

export default new DuvidaController()
