import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { ProfileUserUseCase } from "./ProfileUserUseCase";

let profileUserUseCase: ProfileUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("User's profile", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        profileUserUseCase = new ProfileUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to show user's profile", async () => {
        const id = "d07b38ef-4f06-4945-a1e0-2c13cbb9f3c1";
        await usersRepositoryInMemory.create({
            id,
            driver_license: "010546",
            email: "tak@vesdinop.ru",
            name: "Tony Kim",
            password: "pwSk6n",
        });
        const user = await profileUserUseCase.execute(id);

        expect(user).toEqual({
            id,
            driver_license: "010546",
            email: "tak@vesdinop.ru",
            name: "Tony Kim",
            avatar_url: null,
        });
    });
});
