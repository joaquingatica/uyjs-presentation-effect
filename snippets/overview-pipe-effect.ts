//#region snippet
import { pipe, String, Number, Option } from 'effect'

const year = pipe(
  'mvd js 2025 ',
  String.trim,
  String.slice(-4),
  Number.parse,
  Option.getOrNull
)
//#endregion

console.log(year)
