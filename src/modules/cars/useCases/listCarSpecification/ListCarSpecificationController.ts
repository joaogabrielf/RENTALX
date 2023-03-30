import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCarSpecificationUseCase } from "./ListCarSpecificationUseCase";

export class ListCarSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const listcarspecificationUseCase = container.resolve(
            ListCarSpecificationUseCase
        );
        const specifications = await listcarspecificationUseCase.execute(id);

        return response.json(specifications);
    }
}
