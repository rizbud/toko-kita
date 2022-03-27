import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Models/Transaction'
import { MidtransClient } from 'midtrans-node-client'
import Env from '@ioc:Adonis/Core/Env'
import { StatusCodes } from 'http-status-codes'

export default class MidtransNotificationsController {
  public async index({ request, response }: HttpContextContract) {
    let apiClient = new MidtransClient.Snap({
      isProduction: false,
      serverKey: Env.get('MIDTRANS_SERVER_KEY'),
      clientKey: Env.get('MIDTRANS_CLIENT_KEY'),
    })

    return apiClient.transaction
      .notification(request.body())
      .then(async (statusResponse) => {
        const orderId = statusResponse.order_id
        // const transactionStatus = statusResponse.transaction_status
        const transactionStatus = 'settlement'
        const transaction = await Transaction.findBy('code', orderId)
        if (!transaction) {
          return response.api({ message: 'Transaction not found' }, StatusCodes.NOT_FOUND)
        }

        if (transactionStatus === 'settlement') {
          await Transaction.query()
            .where('code', orderId)
            .update({ status: 'PAID', midtrans_token: null, midtrans_redirect_url: null })
        } else if (transactionStatus === 'cancel' || transactionStatus === 'exipire') {
          await Transaction.query()
            .where('code', orderId)
            .update({ status: 'FAILURE', midtrans_token: null, midtrans_redirect_url: null })
        } else if (transactionStatus === 'pending') {
          await Transaction.query().where('code', orderId).update({ status: 'PENDING' })
        }

        return response.status(StatusCodes.ACCEPTED)
      })
      .catch((err) => {
        throw err
      })
  }
}
