import { TWILIO_ACC_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } from "../../config/constants";
import twilio, {Twilio} from "twilio";
import ISMSSender from "./ISMSSender";

class TwilioImp implements ISMSSender {
  private client: Twilio
  private phone: string;
  constructor(){
    this.client = twilio(TWILIO_ACC_SID,TWILIO_AUTH_TOKEN)
    this.phone = TWILIO_PHONE_NUMBER
  }
  public async sendText(to: string, body: string){
    const phone = this.phone
    const message = await this.client.messages.create({
      body,
      to,
      from: phone
    })
    console.log(message)
  }
}
export default TwilioImp;