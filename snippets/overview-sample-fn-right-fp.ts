import { Data, Effect, pipe, Random } from 'effect'
import { runProgramForSlidev } from './global.ts'

type User = { id: string; email: string }

class UserError extends Data.TaggedError('UserError')<{}> {}
class SmsError extends Data.TaggedError('SmsError')<{}> {}

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

class SmsService extends Effect.Service<SmsService>()('app/SmsService', {
  effect: Effect.gen(function* () {
    const random = yield* Random.next
    const sendSms = (user: User) => random > 0.5
    return { sendSms } as const
  })
}) {}

const getUserById = (userId: string) =>
  Effect.gen(function* () {
    const { getUserById } = yield* DbService
    const user = getUserById(userId)
    if (!user) {
      return yield* Effect.fail(new UserError())
    }
    return user
  })

const sendSms = (user: User) =>
  Effect.gen(function* () {
    const { sendSms } = yield* SmsService
    const sent = sendSms(user)
    if (!sent) {
      yield* Effect.fail(new SmsError())
    }
    yield* Effect.log(`SMS sent successfully!`)
    return SmsResult.Sent
  })

enum SmsResult {
  Sent,
  Failed
}

//#region snippet
// Effect<SmsResult, UserError, DbService | SmsService>
const sendSmsToUser = (userId: string) =>
  pipe(
    userId,
    getUserById,
    Effect.andThen(sendSms),
    Effect.retry({ times: 3 }),
    Effect.tap(Effect.log('User notified successfully!')),
    Effect.catchTag('SmsError', () => Effect.succeed(SmsResult.Failed))
  )
//#endregion

const program = (userId: string) => sendSmsToUser(userId)

runProgramForSlidev(console)(
  program('some-id').pipe(
    Effect.provide(DbService.Default),
    Effect.provide(SmsService.Default)
  )
)
