type ResponseData = object | null
type ResponseCode = number

declare module '@ioc:Adonis/Core/Response' {
  interface ResponseContract {
    api(data: ResponseData, code: ResponseCode): void
  }
}
