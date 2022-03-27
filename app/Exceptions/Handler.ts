/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StatusCodes } from 'http-status-codes'

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '403': 'errors/unauthorized',
    '404': 'errors/not-found',
    '500..599': 'errors/server-error',
  }

  constructor() {
    super(Logger)
  }

  private async jsonHandle(error: any, ctx: HttpContextContract): Promise<void> {
    switch (error.code) {
      case 'E_VALIDATION_FAILURE':
        return ctx.response.api(
          {
            message: error.messages.errors?.map((msg: any) => msg.message),
          },
          StatusCodes.BAD_REQUEST
        )

      case 'E_ROW_NOT_FOUND':
        return ctx.response.api(
          {
            message: 'Data tidak ditemukan',
          },
          StatusCodes.NOT_FOUND
        )

      case 'E_ROUTE_NOT_FOUND':
        return ctx.response.api(
          {
            message: 'Not found',
          },
          StatusCodes.NOT_FOUND
        )

      default:
        return super.handle(error, ctx)
    }
  }

  public async handle(error: any, ctx: HttpContextContract) {
    switch (ctx.request.accepts(['html', 'json'])) {
      case 'json':
        this.jsonHandle(error, ctx)
        break

      default:
        return super.handle(error, ctx)
    }
  }
}
