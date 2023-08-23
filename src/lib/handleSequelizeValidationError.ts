import { type ValidationError } from 'sequelize'

export const handleSequelizeValidationError = (err: ValidationError): { message: string[] } => {
  const errors = err.errors.map(error => error.message)

  return { message: errors }
}
