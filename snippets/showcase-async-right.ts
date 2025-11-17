import { Effect } from 'effect'
import { runProgramForSlidev } from './global.ts'

const main = Effect.gen(function* () {
  yield* Effect.sleep(1000)
  yield* Effect.log('Hello, World!')
})

runProgramForSlidev(console)(main)
