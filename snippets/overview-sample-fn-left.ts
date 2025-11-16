type User = { id: string; email: string }

const getUserById = (userId: string) =>
  new Promise<User>((resolve) =>
    resolve({ id: userId, email: 'test@test.com' })
  )

const getEmailTemplate = (userId: string) =>
  new Promise<string>((resolve) => resolve(`Hello, ${userId}!`))

const sendEmail = (user: User, emailTemplate: string) =>
  new Promise<boolean>((resolve) => {
    resolve()
  })

//#region snippet
// type: (string) => Promise<void>
const sendEmailToUser = async (userId: string) => {
  const [user, emailTemplate] = await Promise.all([
    getUserById(userId),
    getEmailTemplate(userId)
  ])
  return sendEmail(user, emailTemplate)
}
//#endregion

sendEmailToUser('some-id').then(console.log).catch(console.error)
