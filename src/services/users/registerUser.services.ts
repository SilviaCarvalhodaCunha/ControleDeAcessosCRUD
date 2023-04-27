import { hash } from "bcryptjs";
import { TRequestUser, TResponseUser } from "../../interfaces/users.interfaces";
import format from "pg-format";
import { QueryResult } from "pg";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";

const registerUserServices = async (
  userData: TRequestUser
): Promise<TResponseUser> => {
  userData.password = await hash(userData.password, 10);

  const queryString: string = format(
    `
        INSERT INTO users(%I)
        VALUES(%L)
        RETURNING *;
      `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryResult: QueryResult<TResponseUser> = await client.query(
    queryString
  );

  const newUser: TResponseUser = responseUserSchema.parse(queryResult.rows[0]);
  

  return newUser;
};

export default registerUserServices