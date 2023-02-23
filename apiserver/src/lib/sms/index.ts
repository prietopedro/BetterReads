import ISMSSender from "./ISMSSender";
import Twilio from "./Twilio";

const smsSender: ISMSSender = new Twilio();

export default smsSender;