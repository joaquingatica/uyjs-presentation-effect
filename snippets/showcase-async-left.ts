const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const main = async () => {
  await sleep(1000)
  console.log('Hello, World!')
}

main()
