import { type Request, type Response } from 'express'
import { PratoModel } from '../models/pratoModel'

class PratoController {
  async findAll (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const pratos = await PratoModel.findAll()
      return res.status(200).json({ pratos })
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export default new PratoController()
