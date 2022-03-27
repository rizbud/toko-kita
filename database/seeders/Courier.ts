import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import faker from '@faker-js/faker'
import Courier from 'App/Models/Courier'

export default class CourierSeeder extends BaseSeeder {
  public async run() {
    const couriers: any[] = []
    for (let i = 0; i < 4; i++) {
      couriers.push({
        name: faker.company.companyName(),
      })
    }
    await Courier.createMany(couriers)
  }
}
