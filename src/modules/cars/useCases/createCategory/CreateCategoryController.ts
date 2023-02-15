import to from "await-to-js";
import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
    // constructor(private createCategoryUseCase: CreateCategoryUseCase) {}
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

        const [err] = await to<void, Error>(
            createCategoryUseCase.execute({ name, description })
        );

        if (err) {
            return response.status(400).json({ error: err.message });
        }

        return response.status(201).send();

        // try {
        //     await this.createCategoryUseCase.execute({ name, description });
        //     return response.status(201).send();
        // } catch (error) {
        //     console.error(error.message);
        //     return response.status(400).json({ error: error.message });
        // }
    }
}

export { CreateCategoryController };
