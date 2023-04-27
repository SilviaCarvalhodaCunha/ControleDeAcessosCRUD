import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { TResponseUser, TUser } from "../interfaces/users.interfaces";
import { client } from "../database";
import { responseUserSchema } from "../schemas/users.schemas";
import { AppError } from "../error";

const checkUserActiveMiddlewares = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const id = parseInt(req.params.id)

    const queryString: string = `
      SELECT *
      FROM users
      WHERE id = $1;
    `
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: QueryResult<TUser> = await client.query(queryConfig)

    const user: TResponseUser = responseUserSchema.parse(queryResult.rows[0])

    if(user.active){
        throw new AppError('User already active', 400)
    }

    return next()
  }

export default checkUserActiveMiddlewares