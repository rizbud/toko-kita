import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Transactions extends BaseSchema {
  protected tableName = 'transactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('code', 32).unique().notNullable()
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
      table.string('midtrans_token').nullable()
      table.string('midtrans_redirect_url').nullable()
      table
        .enum('status', ['WAITING_PAYMENT', 'PAID', 'PACKED', 'SENT', 'DONE', 'FAILURE'])
        .notNullable()
        .defaultTo('WAITING_PAYMENT')

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
