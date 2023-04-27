import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const checkUserHasPermissionMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId = res.locals.token.id;
  const userAdmin = res.locals.token.admin;
  const idParams = parseInt(req.params.id);

  if(!userAdmin && userId !== idParams ){
    throw new AppError('Insufficient Permission', 403 )
  }

  return next();
};

export default checkUserHasPermissionMiddlewares;
