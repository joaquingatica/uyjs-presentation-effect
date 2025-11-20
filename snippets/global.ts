import { Console as EffectConsole, Effect } from 'effect'
import { BrowserRuntime } from '@effect/platform-browser'

const slidevMonacoConsole = (console: Console): EffectConsole.Console => ({
  [EffectConsole.TypeId]: EffectConsole.TypeId,
  assert(condition, ...args) {
    return Effect.sync(() => {
      console.assert(condition, ...args)
    })
  },
  clear: Effect.sync(() => {
    console.clear()
  }),
  count(label) {
    return Effect.sync(() => {
      console.count(label)
    })
  },
  countReset(label) {
    return Effect.sync(() => {
      console.countReset(label)
    })
  },
  debug(...args) {
    return Effect.sync(() => {
      console.debug(...args)
    })
  },
  dir(item, options) {
    return Effect.sync(() => {
      console.dir(item, options)
    })
  },
  dirxml(...args) {
    return Effect.sync(() => {
      console.dirxml(...args)
    })
  },
  error(...args) {
    return Effect.sync(() => {
      console.error(...args)
    })
  },
  group(options) {
    return options?.collapsed
      ? Effect.sync(() => console.groupCollapsed(options?.label))
      : Effect.sync(() => console.group(options?.label))
  },
  groupEnd: Effect.sync(() => {
    console.groupEnd()
  }),
  info(...args) {
    return Effect.sync(() => {
      console.info(...args)
    })
  },
  log(...args) {
    return Effect.sync(() => {
      console.log(...args)
    })
  },
  table(tabularData, properties) {
    return Effect.sync(() => {
      console.table(tabularData, properties)
    })
  },
  time(label) {
    return Effect.sync(() => console.time(label))
  },
  timeEnd(label) {
    return Effect.sync(() => console.timeEnd(label))
  },
  timeLog(label, ...args) {
    return Effect.sync(() => {
      console.timeLog(label, ...args)
    })
  },
  trace(...args) {
    return Effect.sync(() => {
      console.trace(...args)
    })
  },
  warn(...args) {
    return Effect.sync(() => {
      console.warn(...args)
    })
  },
  unsafe: console
})

export const runProgramForSlidev =
  (console: Console) =>
  <A, E>(main: Effect.Effect<A, E>) => {
    BrowserRuntime.runMain(
      main.pipe(
        // Slidev + Monaco Editor overrides global console
        Effect.withConsole(slidevMonacoConsole(console))
      )
    )
  }
