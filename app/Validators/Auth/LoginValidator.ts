import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from '../BaseValidator'

export default class LoginValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx)
  }

  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.email()]),
    password: schema.string({}, [rules.minLength(8)]),
  })
}
