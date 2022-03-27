import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import faker from '@faker-js/faker'
import Category from 'App/Models/Category'

interface InterfaceCategory {
  name: string
}

export default class CategorySeeder extends BaseSeeder {
  public async run() {
    const categories: InterfaceCategory[] = []
    for (let i = 0; i < 7; i++) {
      categories.push({
        name: faker.commerce.department(),
      })
    }
    await Category.createMany(categories)
  }
}
