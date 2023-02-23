import IEmailSender from "./IEmailSender";
import NodeMailer from "./NodeMailer";

const mailer: IEmailSender = new NodeMailer();

export default mailer;