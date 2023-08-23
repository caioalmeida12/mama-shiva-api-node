import { type CreationOptional, DataTypes, type ForeignKey, type InferAttributes, type InferCreationAttributes, Model, type HasManyGetAssociationsMixin, type NonAttribute } from 'sequelize'
import { UsuarioModel } from './usuarioModel'
import sequelize from '../database/connection'

export default class EnderecoModel extends Model<InferAttributes<EnderecoModel>, InferCreationAttributes<EnderecoModel>> {
  declare endereco_id: CreationOptional<string>
  declare endereco_rua: string
  declare endereco_numero: number
  declare endereco_bairro: string
  declare endereco_cidade: string
  declare endereco_estado: string
  declare fk_usuario_id: ForeignKey<UsuarioModel['usuario_id']>
  declare getUsuario: HasManyGetAssociationsMixin<UsuarioModel>
  declare endereco_usuario?: NonAttribute<UsuarioModel>
}

EnderecoModel.init({
  endereco_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  endereco_rua: {
    type: DataTypes.STRING(128),
    allowNull: false,
    validate: {
      len: {
        args: [3, 128],
        msg: 'O nome da rua deve ter entre 3 e 128 caracteres'
      },
      notEmpty: {
        msg: 'O nome da rua não pode ser vazio'
      },
      notNull: {
        msg: 'O nome da rua não pode ser nulo'
      }
    }
  },
  endereco_numero: {
    type: DataTypes.SMALLINT.UNSIGNED,
    allowNull: false,
    validate: {
      min: {
        args: [1],
        msg: 'O número do endereço deve ser maior que zero'
      },
      notEmpty: {
        msg: 'O número do endereço não pode ser vazio'
      },
      notNull: {
        msg: 'O número do endereço não pode ser nulo'
      }
    }
  },
  endereco_bairro: {
    type: DataTypes.STRING(32),
    allowNull: false,
    validate: {
      len: {
        args: [3, 32],
        msg: 'O nome do bairro deve ter entre 3 e 32 caracteres'
      },
      notEmpty: {
        msg: 'O nome do bairro não pode ser vazio'
      },
      notNull: {
        msg: 'O nome do bairro não pode ser nulo'
      }
    }
  },
  endereco_cidade: {
    type: DataTypes.STRING(64),
    allowNull: false,
    validate: {
      len: {
        args: [3, 64],
        msg: 'O nome da cidade deve ter entre 3 e 64 caracteres'
      },
      notEmpty: {
        msg: 'O nome da cidade não pode ser vazio'
      },
      notNull: {
        msg: 'O nome da cidade não pode ser nulo'
      }
    }
  },
  endereco_estado: {
    type: DataTypes.STRING(64),
    allowNull: false,
    validate: {
      len: {
        args: [3, 64],
        msg: 'O nome do estado deve ter entre 3 e 64 caracteres'
      },
      notEmpty: {
        msg: 'O nome do estado não pode ser vazio'
      },
      notNull: {
        msg: 'O nome do estado não pode ser nulo'
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
  tableName: 'enderecos'
})

EnderecoModel.belongsTo(UsuarioModel, {
  foreignKey: 'fk_usuario_id'
})
