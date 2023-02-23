import { EMAIL_PASSWORD, EMAIL_USER, PORT } from "../../config/constants";
import nodemailer from "nodemailer";
import IEmailSender from "./IEmailSender";

class NodeMailer implements IEmailSender {
  private transporter: nodemailer.Transporter<nodemailer.SentMessageInfo>
  constructor(){
    console.log(EMAIL_PASSWORD, EMAIL_USER, "HEY", PORT)
    this.transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: EMAIL_USER, // generated ethereal user
        pass: EMAIL_PASSWORD, // generated ethereal password
    },
    });
  }
  public async sendMail(to: string, subject: string, html: string){
    this.transporter.sendMail({to, subject,html, from: `BETTERREADS ${EMAIL_USER}`}, (error, info) =>{
      if(error) console.log(error)
      else console.log(info)
    })
  }
}
export default NodeMailer;