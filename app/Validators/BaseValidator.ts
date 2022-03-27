import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BaseValidator {
  constructor(protected ctx: HttpContextContract) {}

  public messages = {
    'required': '{{field}} is required',
    'email.email': 'Email is invalid',
    'confirmed': '{{field}} confirmation does not match',
    'minLength': '{{field}} must be at least {{options.minLength}} characters',
    'maxLength': '{{field}} must be less than {{options.maxLength}} characters',
  }
}
