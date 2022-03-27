import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'
import AddressValidator from 'App/Validators/User/AddressValidator'
import { StatusCodes } from 'http-status-codes'

export default class AddressesController {
  public async index({ response, auth, request }: HttpContextContract) {
    const userId = auth.use('api').user?.id
    const { page = 1, limit = 10 } = request.qs()
    const addresses = await Address.query().where('user_id', userId!).paginate(page, limit)
    return response.api({ data: addresses.all(), paging: addresses.getMeta() }, StatusCodes.OK)
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const user = auth.use('api').user
    const req = await request.validate(AddressValidator)
    await Address.create({
      user_id: user!.id,
      ...req,
    })
    return response.status(StatusCodes.CREATED)
  }

  public async show({ params, response }: HttpContextContract) {
    const address = await Address.findOrFail(params.id)
    return response.api(address, StatusCodes.OK)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const req = await request.validate(AddressValidator)
    await Address.query().where('id', params.id).update(req)
    return response.status(StatusCodes.ACCEPTED)
  }

  public async destroy({ params, response }: HttpContextContract) {
    await Address.query().where('id', params.id).delete()
    return response.status(StatusCodes.NO_CONTENT)
  }
}
