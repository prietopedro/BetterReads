export default interface IEmailSender {
    sendMail(to: string, subject: string, html: string): void
}