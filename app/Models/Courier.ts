import { DateTime } from 'luxon'
import { BaseModel, column, HasManyThrough, hasManyThrough } from '@ioc:Adonis/Lucid/Orm'
import Resi from './Resi'
import Transaction from './Transaction'

export default class Courier extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @hasManyThrough([() => Resi, () => Transaction])
  public resi: HasManyThrough<typeof Resi>
  public transaction: HasManyThrough<typeof Transaction>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
