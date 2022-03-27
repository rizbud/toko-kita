import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Resi from './Resi'
import Product from './Product'
import Address from './Address'
import Courier from './Courier'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code: string

  @column()
  public user_id: number

  @column()
  public productId: number

  @column()
  public addressId: number

  @column()
  public courierId: number

  @column()
  public quantity: number

  @column()
  public status: string

  @column()
  public midtrans_token: string

  @column()
  public midtrans_redirect_url: string

  @hasOne(() => Resi)
  public resi: HasOne<typeof Resi>

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @belongsTo(() => Address)
  public address: BelongsTo<typeof Address>

  @belongsTo(() => Courier)
  public courier: BelongsTo<typeof Courier>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
