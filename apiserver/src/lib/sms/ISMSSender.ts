export default interface ISMSSender {
  sendText(to: string, body: string): Promise<void>
}