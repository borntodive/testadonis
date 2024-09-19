import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UserFactory } from '#database/factories/user_factory'
import User from '#models/user'
export default class extends BaseSeeder {
  async run() {
    await User.create({
      fullName: 'John Doe',
      email: 'test@test.com',
      password: 'password',
    })
    await UserFactory.createMany(10)
  }
}


cd build & npm ci --omit="dev"  & node bin/server.js
