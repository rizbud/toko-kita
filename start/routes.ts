/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { name: 'toko_kita' }
})

Route.post('/midtrans-notification', 'MidtransNotificationsController.index')

Route.group(() => {
  Route.get('/', async () => {
    return { name: 'toko_kita api' }
  })

  Route.group(() => {
    Route.post('login', 'AuthController.login')
    Route.post('register', 'AuthController.register')
  }).prefix('auth')

  Route.group(() => {
    Route.group(() => {
      Route.get('me', 'UsersController.me')
      Route.patch('update', 'UsersController.update')
    }).prefix('user')

    Route.group(() => {
      Route.get('/', 'AddressesController.index')
      Route.post('/', 'AddressesController.store')
      Route.get('/:id', 'AddressesController.show')
      Route.patch('/:id', 'AddressesController.update')
      Route.delete('/:id', 'AddressesController.destroy')
    }).prefix('address')

    Route.group(() => {
      Route.get('/', 'TransactionsController.index')
      Route.get('/:id', 'TransactionsController.show')
      Route.post('/', 'TransactionsController.store')
    }).prefix('transactions')
  }).middleware('auth:api')

  Route.group(() => {
    Route.get('/', 'ProductsController.index')
    Route.get('/:id', 'ProductsController.show')
  }).prefix('products')
}).prefix('api')
