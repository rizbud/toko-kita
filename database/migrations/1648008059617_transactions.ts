import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Transactions extends BaseSchema {
  protected tableName = 'transactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code', 32).notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('address_id')
        .unsigned()
        .references('id')
        .inTable('addresses')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('courier_id')
        .unsigned()
        .references('id')
        .inTable('couriers')
        .onDelete('CASCADE')
        .notNullable()
      table.integer('quantity').notNullable()
      table.enum('status', ['WAITING_PAYMENT', 'PAID', 'PACKED', 'SENT', 'DONE']).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
