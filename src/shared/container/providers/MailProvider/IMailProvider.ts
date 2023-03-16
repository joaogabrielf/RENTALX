export interface IMailProvider {
    sendMail(
        to: string,
        subject: string,
        variables: Record<string, string>,
        path: string
    ): Promise<void>;
}
