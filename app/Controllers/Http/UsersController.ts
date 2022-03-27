import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UpdateUserValidator from 'App/Validators/User/UpdateUserValidator'
import { StatusCodes } from 'http-status-codes'

export default class UsersController {
  // get user data by headers token
  public async me({ auth, response }: HttpContextContract) {
    const user = auth.use('api').user
    if (!user) {
      return response.api({ messsage: 'Unauthorized' }, StatusCodes.UNAUTHORIZED)
    }
    return response.api(user, StatusCodes.OK)
  }

  // update user data
  public async update({ request, auth, response }: HttpContextContract) {
    const req = await request.validate(UpdateUserValidator)
    const user = auth.use('api').user
    if (!user) {
      return response.api({ messsage: 'Unauthorized' }, StatusCodes.UNAUTHORIZED)
    }
    await User.query().where('id', user.id).update({
      name: req.name,
    })
    return response.status(StatusCodes.ACCEPTED)
  }
}
