/* eslint-disable @typescript-eslint/naming-convention */
import { type InferAttributes, type InferCreationAttributes, Model, type ForeignKey, DataTypes } from 'sequelize'
import { UsuarioModel } from './usuarioModel'
import sequelize from '../database/connection'

export default class ReservaModel extends Model<InferAttributes<ReservaModel>, InferCreationAttributes<ReservaModel>> {
  declare reserva_data: Date
  declare reserva_horario: string
  declare fk_usuario_id: ForeignKey<UsuarioModel['usuario_id']>
  declare static findHorariosDisponiveis: (reserva_data: string) => Promise<string[]>
}

ReservaModel.findHorariosDisponiveis = async (reserva_data: string): Promise<string[]> => {
  reserva_data = new Date(reserva_data).toISOString().split('T')[0]

  const reservas = await ReservaModel.findAll({ where: { reserva_data } })

  const horariosReservados = reservas.map((reserva) => reserva.reserva_horario)
  const horariosDisponiveis = ['07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].filter((horario) => !horariosReservados.includes(horario))
  return horariosDisponiveis
}

ReservaModel.init({
  reserva_data: {
    type: DataTypes.DATE,
    allowNull: false,
    primaryKey: true,
    validate: {
      notEmpty: {
        msg: 'Data não pode ser vazia'
      },
      notNull: {
        msg: 'Data não pode ser nula'
      },
      isDate: {
        args: true,
        msg: 'Data inválida'
      },
      isAfter: {
        args: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        msg: 'Data deve ser hoje ou após isso'
      }
    }
  },
  reserva_horario: {
    type: DataTypes.ENUM('07:00', '08:00', '09:00', '10:00', '11:00',
      '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'),
    allowNull: false,
    primaryKey: true,
    validate: {
      notEmpty: {
        msg: 'Horário não pode ser vazio'
      },
      notNull: {
        msg: 'Horário não pode ser nulo'
      },
      isIn: {
        args: [['07:00', '08:00', '09:00', '10:00', '11:00',
          '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']],
        msg: 'Horário inválido'
      }
    }

  },
  fk_usuario_id: {
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: UsuarioModel,
      key: 'usuario_id'
    },
    validate: {
      notEmpty: {
        msg: 'O id do usuário não pode ser vazio'
      },
      notNull: {
        msg: 'O id do usuário não pode ser nulo'
      },
      isUUID: {
        args: 4,
        msg: 'O id do usuário deve ser um UUID válido'
      },
      async isUsuarioExistente (value: string) {
        const usuario = await UsuarioModel.findByPk(value)
        if (usuario == null) {
          throw new Error('O id do usuário deve ser um usuário existente')
        }
      }
    }
  }
}, {
  sequelize,
  tableName: 'reservas'
})
