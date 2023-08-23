import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
  // se utilizar sqlite, descomentar a linha abaixo e comentar a linha de timezone
  // dialect: 'sqlite',
  dialect: 'mysql',
  storage: dotenv.config().parsed?.DATABASE_STORAGE,
  database: dotenv.config().parsed?.DATABASE_NAME,
  username: dotenv.config().parsed?.DATABASE_USERNAME,
  password: dotenv.config().parsed?.DATABASE_PASSWORD,
  timezone: '-03:00'
})

void (async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({
    })
    console.log('Conexão com o banco de dados estabelecida com sucesso.')
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error)
  }
})()

export default sequelize
