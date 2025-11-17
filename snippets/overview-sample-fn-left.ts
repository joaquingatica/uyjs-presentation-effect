type User = { id: string; email: string }

const getUserById = (userId: string) =>
  new Promise<User>((resolve) =>
    resolve({ id: userId, email: 'test@test.com' })
  )

const getEmailTemplate = (userId: string) =>
  new Promise<string>((resolve) => resolve(`Hello, ${userId}!`))

const sendEmail = (user: User, emailTemplate: string) =>
  new Promise<void>((resolve) => {
    resolve()
  })

//#region snippet
// (userId: string) => Promise<void>
const sendEmailToUser = async (userId: string) => {
  const [user, template] = await Promise.all([
    getUserById(userId),
    getEmailTemplate(userId)
  ])

  await sendEmail(user, template)
}
//#endregion

sendEmailToUser('some-id').then(console.log).catch(console.error)
