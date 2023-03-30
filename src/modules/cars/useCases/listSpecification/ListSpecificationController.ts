import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

export class ListSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listspecificationUseCase = container.resolve(
            ListSpecificationUseCase
        );
        const specifications = await listspecificationUseCase.execute();

        return response.json(specifications);
    }
}
