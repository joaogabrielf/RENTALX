import { Request, Response } from "express";
import { container } from "tsyringe";

import { ReturnRentalUseCase } from "./ReturnRentalUseCase";

export class ReturnRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { id } = request.params;

        const returnRentalUseCase = container.resolve(ReturnRentalUseCase);

        const rental = await returnRentalUseCase.execute({ id, user_id });

        return response.status(200).json(rental);
    }
}
