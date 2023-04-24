import { QueryConfig, QueryResult } from "pg";
import {
  TLoginRequest,
  TLoginResponse,
} from "../../interfaces/login.interfaces";
import { TUser } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { AppError } from "../../error";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const createSessionServices = async (
  payload: TLoginRequest
): Promise<TLoginResponse> => {
  const queryString: string = `
      SELECT *
      FROM users
      WHERE email = $1 ;
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [payload.email],
  };

  const queryResult: QueryResult<TUser> = await client.query(queryConfig);

  const userExist: TUser = queryResult.rows[0];

  if (!userExist) {
    throw new AppError("Wrong email/password", 401);
  }

  const comparePassword: boolean = await compare(
    payload.password,
    userExist.password
  );

  if (!comparePassword) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = sign(
    {
      admin: userExist.admin,
    },
    String(process.env.SECRET_KEY),
    {
      subject: String(userExist.id),
      expiresIn: process.env.EXPIRES_IN,
    }
  );

  return {token};
};

export default createSessionServices