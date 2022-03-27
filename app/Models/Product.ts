import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Transaction from './Transaction'
import Category from './Category'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public categoryId: number

  @column()
  public price: number

  @column()
  public stock: number

  @column()
  public image: string

  @column()
  public thumbnail: string

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @hasMany(() => Transaction)
  public transaction: HasMany<typeof Transaction>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
