import { Request, Response, Router } from "express";
import { retry } from "../Retry/Implementation";

const GetRouter = new class GetRouter {

	async handle(request: Request, response: Response) {
		
		const { accountId, value, type } = request.body;

		await retry.execute( { accountId, value, type } );

		response.end();
	}
}; 

export default Router().post("/", GetRouter.handle);