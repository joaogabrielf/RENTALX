import dotenv from "dotenv";
import { container } from "tsyringe";

import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

const mailProvider = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SESMailProvider),
};

dotenv.config();

container.registerInstance(
    "MailProvider",
    mailProvider[process.env.MAIL_PROVIDER]
);
