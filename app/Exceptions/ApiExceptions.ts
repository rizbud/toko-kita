import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StatusCodes } from 'http-status-codes'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new ApiException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ApiException extends Exception {
  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.api(
      {
        message: error.message,
      },
      error.status ?? StatusCodes.BAD_REQUEST
    )
  }
}
