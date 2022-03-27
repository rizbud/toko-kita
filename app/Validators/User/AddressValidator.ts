import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from '../BaseValidator'

export default class AddressValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx)
  }

  public schema = schema.create({
    name: schema.string({ trim: true }),
    province: schema.string({ trim: true }),
    city: schema.string({ trim: true }),
    district: schema.string({ trim: true }),
    postal_code: schema.string({ trim: true }),
    address: schema.string({ trim: true }),
  })
}
