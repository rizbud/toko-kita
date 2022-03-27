/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Models/Transaction'
import TransactionValidator from 'App/Validators/TransactionValidator'
import Env from '@ioc:Adonis/Core/Env'
import { MidtransClient } from 'midtrans-node-client'
import { StatusCodes } from 'http-status-codes'
import Product from 'App/Models/Product'
import Address from 'App/Models/Address'
import Courier from 'App/Models/Courier'

export default class TransactionsController {
  public async index({ response, request, auth }: HttpContextContract) {
    const qs = request.qs()
    const { page = 1, limit = 10, status, start_date, end_date } = qs
    const userId = auth.use('api').user?.id
    const query = Transaction.query()

    query.orderBy('created_at', 'desc')
    status && query.where('status', status)
    start_date && query.where('created_at', '>=', start_date)
    end_date && query.where('created_at', '<=', end_date)

    const transactions = await query.where('user_id', userId!).paginate(page, limit)
    return response.api(
      { data: transactions.all(), paging: transactions.getMeta() },
      StatusCodes.OK
    )
  }

  public async show({ params, response }: HttpContextContract) {
    const transaction = await Transaction.query()
      .preload('resi')
      .preload('product')
      .preload('address')
      .preload('courier')
      .where('id', params.id)
      .first()
    return response.api(transaction, StatusCodes.OK)
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(TransactionValidator)
    const midtransServerKey = Env.get('MIDTRANS_SERVER_KEY')

    const product = await Product.findBy('id', data.product_id)
    if (!product) return response.api({ message: 'Product not found' }, StatusCodes.NOT_FOUND)

    const address = await Address.findBy('id', data.address_id)
    if (!address) return response.api({ message: 'Address not found' }, StatusCodes.NOT_FOUND)

    const courier = await Courier.findBy('id', data.courier_id)
    if (!courier) return response.api({ message: 'Courier not found' }, StatusCodes.NOT_FOUND)

    const user = auth.use('api').user

    const randomCode = new Date().getTime() + Math.random().toString(10).substring(2, 4)
    const trxCode = `TRX-${randomCode.match(/.{1,5}/g)?.join('-')}`

    const snap = new MidtransClient.Snap({
      isProduction: false,
      serverKey: midtransServerKey,
    })

    const parameter = {
      transaction_details: {
        order_id: trxCode,
        gross_amount: product.price * data.quantity,
      },
      credit_card: {
        secure: true,
      },
      item_details: [
        {
          id: product.id.toString(),
          price: product.price,
          quantity: data.quantity,
          name: product.title,
        },
      ],
      customers_details: [
        {
          first_name: user?.name.split(' ')?.[0],
          last_name: user?.name.split(' ')?.[1] ?? user?.name.split(' ')?.[0],
          email: user?.email,
          shipping_address: {
            first_name: address?.name.split(' ')?.[0],
            last_name: address?.name.split(' ')?.[1] ?? address?.name.split(' ')?.[0],
            address: address?.address,
            city: address?.city,
            postal_code: address?.postal_code,
            country_code: 'IDN',
          },
        },
      ],
    }

    const midtrans = await snap.createTransaction(parameter)

    const transaction = await Transaction.create({
      ...data,
      status: 'WAITING_PAYMENT',
      code: trxCode,
      user_id: user!.id,
      midtrans_token: midtrans.token,
      midtrans_redirect_url: midtrans.redirect_url,
    })
    return response.api(transaction, StatusCodes.CREATED)
  }
}
