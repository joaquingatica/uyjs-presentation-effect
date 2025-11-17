import { Data, Effect, pipe, Random } from 'effect'
import { runProgramForSlidev } from './global.ts'

type User = { id: string; email: string }

class UserError extends Data.TaggedError('UserError')<{}> {}
class EmailError extends Data.TaggedError('EmailError')<{}> {}

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
    const sendEmail = (user: User) => random > 0.5
    return { sendEmail } as const
  })
}) {}

const getUserById = (userId: string) =>
  Effect.gen(function* () {
    const { getUserById } = yield* DbService
    const user = getUserById(userId)
    if (!user) {
      yield* Effect.fail(new UserError())
    }
    return user
  })

const sendEmail = (user: User | null) =>
  Effect.gen(function* () {
    const { sendEmail } = yield* EmailService
    const sent = sendEmail(user)
    if (!sent) {
      yield* Effect.fail(new EmailError())
    }
    yield* Effect.log(`Email sent successfully!`)
  })

//#region snippet
// Effect<string, EmailError, DbService | EmailService>
const sendEmailToUser = (userId: string) =>
  pipe(
    userId,
    getUserById,
    Effect.flatMap(sendEmail),
    Effect.retry({ times: 5 }),
    Effect.tap(Effect.log('Email sent successfully!')),
    // recover from UserError, but propagate EmailError
    Effect.catchTag('UserError', () =>
      Effect.succeed("User not found, doesn't matter")
    )
  )
//#endregion

const program = (userId: string) => sendEmailToUser(userId)

runProgramForSlidev(console)(
  program('some-id').pipe(
    Effect.provide(DbService.Default),
    Effect.provide(EmailService.Default)
  )
)
