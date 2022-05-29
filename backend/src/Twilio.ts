import twilio from "twilio";

class Twilio {
  phoneNumber = process.env.PHONE_NUMBER;
  phoneNumberSid = process.env.PHONE_NUMBER_SID;
  tokenSid = process.env.TOKEN_SID;
  tokenSecret = process.env.TOKEN_SECRET;
  accountSid = process.env.ACCOUNT_SID;
  verifyServiceSid = process.env.VERIFY_SERVICE_SID;
  client;
  constructor() {
    this.client = twilio(this.tokenSid, this.tokenSecret, {
      accountSid: this.accountSid,
    });
  }

  getTwilio() {
    return this.client;
  }

  async sendVerifyAsync(phone, channel) {
    let data = await this.client.verify
      .services(this.verifyServiceSid)
      .verifications.create({
        to: phone,
        channel,
      });
    console.log(data);
    return data;
  }
}

const instance = new Twilio();
Object.freeze(instance);

export default instance;
