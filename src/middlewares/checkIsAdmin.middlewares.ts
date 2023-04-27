import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const checkIsAdminMiddlewares = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const admin = res.locals.token.admin

    if(admin){
        return next()
    }

    throw new AppError("Insufficient Permission", 403)

}

export default checkIsAdminMiddlewares