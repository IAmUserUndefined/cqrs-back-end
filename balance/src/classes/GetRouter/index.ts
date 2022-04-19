import { Request, Response, Router } from "express";
import { facade } from "../Facade/Implementation";

const GetRouter = new class GetRouter {

	async handle(request: Request, response: Response) {
		
		const { accountId } = request.params;

		const balance = await facade.execute( { accountId } );

		response.json( { balance } );
	}
}; 

export default Router().get("/:accountId", GetRouter.handle);