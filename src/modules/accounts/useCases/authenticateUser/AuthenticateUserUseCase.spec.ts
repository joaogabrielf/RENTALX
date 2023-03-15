import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000123",
            email: "test@test.com",
            password: "password",
            name: "User Test",
        };

        await createUserUseCase.execute(user);

        const authenticatedUser = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(authenticatedUser).toHaveProperty("token");
    });

    it("should not be able to authenticate a non existent user", async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: "falseemail@test.com",
                password: "falsepass",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
    });

    it("should not be able to authenticate an user with incorrect password", async () => {
        const user: ICreateUserDTO = {
            driver_license: "999123",
            email: "testpassincorrect@test.com",
            password: "pass123",
            name: "User pass incorrect Test",
        };

        await createUserUseCase.execute(user);
        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectpass",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
    });
});
