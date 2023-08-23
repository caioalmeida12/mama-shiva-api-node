import { Model, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes, DataTypes, type HasManyGetAssociationsMixin } from 'sequelize'
import { UsuarioModel } from './usuarioModel'
import sequelize from '../database/connection'

export class DuvidaModel extends Model<InferAttributes<DuvidaModel>, InferCreationAttributes<DuvidaModel>> {
  declare duvida_id: CreationOptional<string>
  declare duvida_assunto: string
  declare duvida_mensagem: string
  declare fk_usuario_id: ForeignKey<UsuarioModel['usuario_id']>
  declare getUsuario: HasManyGetAssociationsMixin<UsuarioModel>
}

DuvidaModel.init({
  duvida_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  duvida_assunto: {
    type: DataTypes.STRING(128),
    allowNull: false,
    validate: {
      len: {
        args: [3, 128],
        msg: 'O assunto da dúvida deve ter entre 3 e 128 caracteres'
      },
      notEmpty: {
        msg: 'O assunto da dúvida não pode ser vazio'
      },
      notNull: {
        msg: 'O assunto da dúvida não pode ser nulo'
      }
    }
  },
  duvida_mensagem: {
    type: DataTypes.STRING(1024),
    allowNull: false,
    validate: {
      len: {
        args: [64, 1024],
        msg: 'A mensagem da dúvida deve ter entre 64 e 1024 caracteres'
      },
      notEmpty: {
        msg: 'A mensagem da dúvida não pode ser vazia'
      },
      notNull: {
        msg: 'A mensagem da dúvida não pode ser nula'
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
  tableName: 'duvidas'
})

DuvidaModel.belongsTo(UsuarioModel, {
  foreignKey: 'fk_usuario_id'
})
