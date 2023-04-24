import { Router } from "express";
import createSessionController from "../controllers/login.controllers";
import checkIsBodyValidMiddlewares from "../middlewares/checkIsBodyValid.middlewares";
import { requestLoginSchema } from "../schemas/login.schemas";

const loginRoutes = Router()

loginRoutes.post('', checkIsBodyValidMiddlewares(requestLoginSchema) , createSessionController)

export default loginRoutes