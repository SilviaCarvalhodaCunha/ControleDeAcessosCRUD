import { QueryConfig, QueryResult } from "pg";
import { TResponseUser, TUser } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";

const listUserLoggedServices = async (userId: number): Promise<TResponseUser> => {
  const queryString: string = `
   SELECT *
   FROM users
   WHERE id = $1;
`;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId]
  };

  const queryResult: QueryResult<TUser> = await client.query(queryConfig)
    
  const user: TResponseUser = responseUserSchema.parse(queryResult.rows[0])

  return user

};

export default listUserLoggedServices;
