import { Effect } from 'effect'
import { runProgramForSlidev } from './global.ts'

const sleep = Effect.sleep(1000)

const main = Effect.gen(function* () {
  yield* sleep
  yield* Effect.log('Hello, World!')
})

runProgramForSlidev(console)(main)
