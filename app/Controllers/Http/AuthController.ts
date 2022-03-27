import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import RegisterValidator from 'App/Validators/Auth/RegisterValidator'
import { StatusCodes } from 'http-status-codes'

export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    const req = await request.validate(LoginValidator)
    const email = await User.findBy('email', req.email)

    if (email) {
      try {
        const token = await auth.use('api').attempt(req.email, req.password, {
          expiresIn: '30 days',
        })
        return response.api(token.toJSON(), StatusCodes.OK)
      } catch (err) {
        return response.api(
          {
            message: 'Invalid credentials',
          },
          StatusCodes.BAD_REQUEST
        )
      }
    } else {
      return response.api(
        {
          message: 'Email not found',
        },
        StatusCodes.BAD_REQUEST
      )
    }
  }

  public async register({ request, response }: HttpContextContract) {
    const req = await request.validate(RegisterValidator)
    const checkUser = await User.findBy('email', req.email)

    if (checkUser) {
      return response.api({ message: 'Email already exists' }, StatusCodes.UNPROCESSABLE_ENTITY)
    }

    await User.create({ email: req.email, password: req.password, name: req.name })

    return response.status(StatusCodes.CREATED)
  }
}
