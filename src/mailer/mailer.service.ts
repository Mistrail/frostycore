import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createTransport, Transporter, TransportOptions } from "nodemailer";
import { SendmailDto } from "./dto/sendmail.dto";
import { Config } from "src/misc/config.enum";

@Injectable()
export class MailerService {
    constructor(private configService: ConfigService){}

    async sendmail(mail: SendmailDto){
        const options: TransportOptions = this.configService.get(Config.MAILER);
        const transporter: Transporter = createTransport(options);
        const info = await transporter.sendMail(mail)
        return info;
    }

}