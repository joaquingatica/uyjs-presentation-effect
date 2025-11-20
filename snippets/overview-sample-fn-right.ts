import { Brand, Effect, Random } from 'effect'
import { runProgramForSlidev } from './global.ts'

type User = { id: string; email: string }

export type UserId = string & Brand.Brand<'UserId'>
export const UserId = Brand.nominal<UserId>()

class UserError extends Error {}
class EmailError extends Error {}

class DbService extends Effect.Service<DbService>()('app/DbService', {
  effect: Effect.gen(function* () {
    const random = yield* Random.next
    const getUserById = (userId: string) => {
      if (random > 0.5) {
        return null
      }
      return { id: userId, email: 'test@test.com' }
    }
    return { getUserById } as const
  })
}) {}

class EmailService extends Effect.Service<EmailService>()('app/EmailService', {
  effect: Effect.gen(function* () {
    const random = yield* Random.next
    const sendEmail = (user: User, emailTemplate: string) => random > 0.5
    return { sendEmail } as const
  })
}) {}

const getUserById = (userId: UserId) =>
  Effect.gen(function* () {
    const { getUserById } = yield* DbService
    const user = getUserById(userId)
    if (!user) {
      return yield* Effect.fail(new UserError('User not found'))
    }
    return user
  })

const getEmailTemplate = (userId: UserId) =>
  Effect.gen(function* () {
    return `Hello, ${userId}!`
  })

const sendEmail = (user: User, emailTemplate: string) =>
  Effect.gen(function* () {
    const { sendEmail } = yield* EmailService
    const sent = sendEmail(user, emailTemplate)
    if (!sent) {
      yield* Effect.fail(new EmailError('Failed to send email'))
    }
    yield* Effect.log(`Email sent successfully!`)
  })

//#region snippet
// Effect<void, UserError | EmailError, DbService | EmailService>
const sendEmailToUser = (userId: UserId) =>
  Effect.gen(function* () {
    const [user, template] = yield* Effect.all([
      getUserById(userId),
      getEmailTemplate(userId)
    ])
    yield* sendEmail(user, template)
  })
//#endregion

const program = (userId: UserId) => sendEmailToUser(userId)

runProgramForSlidev(console)(
  program(UserId('some-id')).pipe(
    Effect.provide(DbService.Default),
    Effect.provide(EmailService.Default)
  )
)
