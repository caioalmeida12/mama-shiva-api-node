/* eslint-disable @typescript-eslint/naming-convention */
import { type Request, type Response } from 'express'
import { UsuarioModel } from '../models/usuarioModel'
import { handleSequelizeValidationError } from '../lib/handleSequelizeValidationError'

class UsuarioController {
  async findAll (_req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const usuarios = await UsuarioModel.findAll()

      return res.status(200).json({ usuarios })
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }

  async findOne (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const { usuario_id } = req.params

      const usuario = await UsuarioModel.findOne({ where: { usuario_id } })

      if (usuario == null) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
      }

      return res.status(200).json(usuario)
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }

  async create (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const usuario_body: UsuarioModel = req.body

      const usuario = await UsuarioModel.create(usuario_body)

      return res.status(201).json(usuario)
    } catch (error: any) {
      return res.status(500).json(handleSequelizeValidationError(error))
    }
  }

  async update (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const { usuario_id } = req.params
      const usuario_body: UsuarioModel = req.body

      if (Object.values(usuario_body).length === 0) {
        return res.status(400).json({ message: 'Nenhum campo foi informado' })
      }

      const usuario = await UsuarioModel.findOne({ where: { usuario_id } })

      if (usuario == null) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
      }

      await UsuarioModel.update(usuario_body, { where: { usuario_id } })

      return res.status(200).json({ message: 'Usuário atualizado com sucesso' })
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }

  async delete (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const { usuario_id } = req.params

      const usuario = await UsuarioModel.findOne({ where: { usuario_id } })

      if (usuario == null) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
      }

      await UsuarioModel.destroy({ where: { usuario_id } })

      return res.status(200).json({ message: 'Usuário excluído com sucesso' })
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }

  async authenticate (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const { usuario_email, usuario_senha } = req.body

      const isAutenticado = await UsuarioModel.authenticate(usuario_email, usuario_senha)

      if (!isAutenticado) {
        return res.status(401).json({ message: 'E-mail ou senha inválidos' })
      }

      const usuario = await UsuarioModel.findOne({ where: { usuario_email } })

      return res.status(200).json({ usuario })
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export default new UsuarioController()
