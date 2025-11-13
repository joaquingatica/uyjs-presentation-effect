import { Effect } from 'effect'
import { runProgramForSlidev } from './global'

const sleep = Effect.sleep(1000)

const main = Effect.gen(function* () {
  yield* sleep
  yield* Effect.log('Hello, Worlds!')
})

runProgramForSlidev(console)(main)
