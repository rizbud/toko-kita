import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Resi from './Resi'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public product_id: number

  @column()
  public address_id: number

  @column()
  public courier_id: number

  @column()
  public quantity: number

  @column()
  public status: string

  @hasOne(() => Resi)
  public resi: HasOne<typeof Resi>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
