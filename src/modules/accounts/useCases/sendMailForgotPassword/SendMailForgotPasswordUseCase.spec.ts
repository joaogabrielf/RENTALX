import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendMailForgotPasswordUseCase } from "./SendMailForgotPasswordUseCase";

let sendMailForgotPasswordUseCase: SendMailForgotPasswordUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Mail Forgot Password", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();
        sendMailForgotPasswordUseCase = new SendMailForgotPasswordUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "010546",
            email: "tak@vesdinop.ru",
            name: "Tony Kim",
            password: "pwSk6n",
        });

        await sendMailForgotPasswordUseCase.execute("tak@vesdinop.ru");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send an email if user does not exists", async () => {
        await expect(
            sendMailForgotPasswordUseCase.execute("hugohid@sa.aq")
        ).rejects.toEqual(new AppError("User does not exists"));
    });

    it("should be able to create an users token", async () => {
        const generateTokenMail = jest.spyOn(
            usersTokensRepositoryInMemory,
            "create"
        );

        await usersRepositoryInMemory.create({
            driver_license: "8kAbji",
            email: "dow@gur.dm",
            name: "Tyler Parsons",
            password: "l2D62Y",
        });

        await sendMailForgotPasswordUseCase.execute("dow@gur.dm");

        expect(generateTokenMail).toBeCalled();
    });
});
