/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import { StatusCodes } from 'http-status-codes'

export default class ProductsController {
  public async index({ response, request }: HttpContextContract) {
    const qs = request.qs()
    const { page = 1, limit = 10, order_by, sort, q, min_price, max_price } = qs
    const query = Product.query().preload('category')

    order_by && sort ? query.orderBy(order_by, sort) : query.orderBy('created_at', 'desc')
    q && query.where('title', 'like', `%${q}%`).orWhere('description', 'like', `%${q}%`)
    min_price && query.where('price', '>=', min_price)
    max_price && query.where('price', '<=', max_price)

    const products = await query.where('stock', '>', 0).paginate(page, limit)
    return response.api({ data: products.all(), paging: products.getMeta() }, StatusCodes.OK)
  }

  public async show({ params, response }: HttpContextContract) {
    const product = await Product.query().preload('category').where(params.id).first()
    return response.api(product, StatusCodes.OK)
  }
}
