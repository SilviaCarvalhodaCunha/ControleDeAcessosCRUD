import { QueryResult } from "pg";
import { TResponseUser, TUser } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { requestAllUserSchema } from "../../schemas/users.schemas";

const listAllUsersServices = async (): Promise<TResponseUser[]> => {
    const queryString: string = `
      SELECT *
      FROM users;
    ` 
    const queryResult: QueryResult<TUser> = await client.query(queryString)

    const users: TResponseUser[] = requestAllUserSchema.parse(queryResult.rows)

    return users
}

export default listAllUsersServices