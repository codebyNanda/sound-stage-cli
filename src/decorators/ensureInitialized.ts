import { DbSqliteBase } from "../db/DbSqliteBase"

let hasBeenInitialized: boolean = false

/**
 * Decorator que garante que o banco de dados está inicializado antes de executar o método
 */
export function EnsureInitialized(): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value

    console.log(target, propertyKey)

    descriptor.value = async function (this: DbSqliteBase, ...args: any[]) {
      if (!hasBeenInitialized) {
        await this.init()
        hasBeenInitialized = true
      }

      return originalMethod.apply(this, args)
    }

    return descriptor
  }
}
