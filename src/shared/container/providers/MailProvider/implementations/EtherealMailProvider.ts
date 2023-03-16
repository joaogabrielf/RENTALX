import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider } from "../IMailProvider";

export class EtherealMailProvider implements IMailProvider {
    private client: Transporter;
    constructor() {
        nodemailer
            .createTestAccount()
            .then((account) => {
                const transporter = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass,
                    },
                });

                this.client = transporter;
            })
            .catch((err) => console.error(err));
    }
    async sendMail(
        to: string,
        subject: string,
        variables: Record<string, string>,
        path: string
    ): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const templateParse = handlebars.compile(templateFileContent);

        const templateHTML = templateParse(variables);

        const message = await this.client.sendMail({
            to,
            from: "Rentx <noreply@rentalx.com>",
            subject,
            html: templateHTML,
        });

        console.log("Message sent: %s", message);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
    }
}
