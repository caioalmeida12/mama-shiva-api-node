/* eslint-disable @typescript-eslint/naming-convention */
import { type Request, type Response } from 'express'
import EnderecoModel from '../models/enderecoModel'
import { handleSequelizeValidationError } from '../lib/handleSequelizeValidationError'

class EnderecoController {
  async findAll (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const enderecos = await EnderecoModel.findAll()

      return res.json({ enderecos })
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }

  async findOne (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const { endereco_id } = req.params
      const endereco = await EnderecoModel.findByPk(endereco_id)

      if (endereco == null) {
        return res.status(404).json({ message: 'Endereço não encontrado' })
      }

      return res.json({ endereco })
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }

  async findByUser (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const { fk_usuario_id } = req.params
      const enderecos = await EnderecoModel.findAll({ where: { fk_usuario_id } })

      if (enderecos == null) {
        return res.status(404).json({ message: 'Endereços não encontrados' })
      }

      return res.json({ enderecos })
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }

  async create (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const endereco_body: EnderecoModel = req.body

      const endereco = await EnderecoModel.create(endereco_body)

      return res.status(201).json({ endereco })
    } catch (error: any) {
      return res.status(500).json(handleSequelizeValidationError(error))
    }
  }
}

export default new EnderecoController()
