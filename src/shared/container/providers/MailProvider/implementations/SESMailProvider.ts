import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
import fs from "fs";
import handlebars from "handlebars";

import { IMailProvider } from "../IMailProvider";

export class SESMailProvider implements IMailProvider {
    private sesClient: SESClient;
    constructor() {
        this.sesClient = new SESClient({});
    }
    async sendMail(
        toAddress: string,
        subject: string,
        variables: Record<string, string>,
        path: string
    ): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const templateParse = handlebars.compile(templateFileContent);

        const templateHTML = templateParse(variables);

        const fromAddress = "jgsantista@gmail.com";

        const sendEmailCommand = new SendEmailCommand({
            Destination: {
                CcAddresses: [],
                ToAddresses: [toAddress],
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: templateHTML,
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: "TEXT_FORMAT_BODY",
                    },
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: subject,
                },
            },
            Source: fromAddress,
            ReplyToAddresses: [],
        });

        await this.sesClient.send(sendEmailCommand);
    }
}
