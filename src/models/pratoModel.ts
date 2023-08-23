import { Model, type InferAttributes, type InferCreationAttributes, type CreationOptional, DataTypes } from 'sequelize'
import sequelize from '../database/connection'

export class PratoModel extends Model<InferAttributes<PratoModel>, InferCreationAttributes<PratoModel>> {
  declare prato_id: CreationOptional<string>
  declare prato_nome: string
  declare prato_categoria: string
  declare prato_descricao: string
}

PratoModel.init({
  prato_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  prato_nome: {
    type: DataTypes.STRING(128),
    allowNull: false,
    validate: {
      len: {
        args: [3, 128],
        msg: 'O nome deve conter entre 3 e 128 caracteres'
      },
      notEmpty: {
        msg: 'O nome é obrigatório'
      },
      notNull: {
        msg: 'O nome é obrigatório'
      }
    }
  },
  prato_categoria: {
    type: DataTypes.ENUM('ENTRADA', 'PRINCIPAL', 'BEBIDA', 'SOBREMESA'),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'A categoria é obrigatória'
      },
      notNull: {
        msg: 'A categoria é obrigatória'
      },
      notIn: {
        args: [['ENTRADA', 'PRINCIPAL', 'BEBIDA', 'SOBREMESA']],
        msg: 'A categoria deve ser uma das opções: ENTRADA, PRINCIPAL, BEBIDA, SOBREMESA'
      }
    }
  },
  prato_descricao: {
    type: DataTypes.STRING(256),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'A descrição é obrigatória'
      },
      notNull: {
        msg: 'A descrição é obrigatória'
      }
    }
  }
}, {
  sequelize,
  tableName: 'pratos'
})
