import { Model, type InferAttributes, type InferCreationAttributes, type CreationOptional, DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'
import sequelize from '../database/connection'

export class UsuarioModel extends Model<InferAttributes<UsuarioModel>, InferCreationAttributes<UsuarioModel>> {
  declare usuario_id: CreationOptional<string>
  declare usuario_cpf: string
  declare usuario_nome: string
  declare usuario_email: string
  declare usuario_senha: string
  declare usuario_telefone: string
  declare static authenticate: (usuario_id: string, usuario_senha: string) => Promise<boolean>
}

// eslint-disable-next-line @typescript-eslint/naming-convention
UsuarioModel.authenticate = async (usuario_email: string, usuario_senha: string): Promise<boolean> => {
  if (usuario_email == null || usuario_senha == null) {
    return false
  }

  const usuario = await UsuarioModel.findOne({ where: { usuario_email } })

  if (usuario == null) {
    return false
  }

  return bcrypt.compareSync(usuario_senha, usuario.usuario_senha)
}

UsuarioModel.init({
  usuario_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  usuario_cpf: {
    type: DataTypes.CHAR(11),
    allowNull: false,
    unique: {
      name: 'usuario_cpf',
      msg: 'O CPF já está em uso'
    },
    validate: {
      isInt: {
        msg: 'O CPF deve conter apenas números'
      },
      len: {
        args: [11, 11],
        msg: 'O CPF deve conter 11 dígitos'
      },
      notEmpty: {
        msg: 'O CPF é obrigatório'
      },
      notNull: {
        msg: 'O CPF é obrigatório'
      }
    }
  },
  usuario_nome: {
    type: DataTypes.STRING(128),
    allowNull: false,
    validate: {
      len: {
        args: [3, 128],
        msg: 'O nome deve conter entre 3 e 128 caracteres'
      },
      is: {
        args: /^[a-zA-ZÀ-ú ]+$/i,
        msg: 'O nome deve conter apenas letras'
      },
      notEmpty: {
        msg: 'O nome é obrigatório'
      },
      notNull: {
        msg: 'O nome é obrigatório'
      }
    }
  },
  usuario_email: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: {
      name: 'usuario_email',
      msg: 'O e-mail já está em uso'
    },
    validate: {
      isEmail: {
        msg: 'O e-mail deve ser válido'
      },
      len: {
        args: [6, 128],
        msg: 'O e-mail deve conter entre 6 e 128 caracteres'
      },
      notEmpty: {
        msg: 'O e-mail é obrigatório'
      },
      notNull: {
        msg: 'O e-mail é obrigatório'
      }
    }
  },
  usuario_senha: {
    type: DataTypes.STRING(256),
    allowNull: false,
    validate: {
      len: {
        args: [6, 256],
        msg: 'A senha deve conter entre 6 e 256 caracteres'
      },
      notEmpty: {
        msg: 'A senha é obrigatória'
      },
      notNull: {
        msg: 'A senha é obrigatória'
      }
    },
    set (val: string) {
      const hash = bcrypt.hashSync(val, 10)
      this.setDataValue('usuario_senha', hash)
    }
  },
  usuario_telefone: {
    type: DataTypes.STRING(11),
    allowNull: false,
    validate: {
      isInt: {
        msg: 'O telefone deve conter apenas números'
      },
      len: {
        args: [10, 11],
        msg: 'O telefone deve conter 10 ou 11 dígitos'
      },
      notEmpty: {
        msg: 'O telefone é obrigatório'
      },
      notNull: {
        msg: 'O telefone é obrigatório'
      }
    }
  }
}, {
  sequelize,
  tableName: 'usuarios'
})
