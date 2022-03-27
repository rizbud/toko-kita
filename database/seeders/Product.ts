import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import faker from '@faker-js/faker'
import Product from 'App/Models/Product'

export default class ProductSeeder extends BaseSeeder {
  public async run() {
    const products: any[] = []
    for (let i = 0; i < 24; i++) {
      products.push({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(500, 5000000, 0),
        stock: faker.datatype.number({ min: 0, max: 35 }),
        categoryId: faker.datatype.number({ min: 1, max: 7 }),
        image: faker.image.imageUrl(),
        thumbnail: faker.image.imageUrl(),
      })
    }
    await Product.createMany(products)
  }
}
