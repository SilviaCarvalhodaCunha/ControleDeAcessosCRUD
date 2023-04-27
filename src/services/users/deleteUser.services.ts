import { QueryConfig, QueryResult } from "pg"
import { client } from "../../database"
import { TResponseUser, TUser } from "../../interfaces/users.interfaces"

const deleteUserServices = async (id: number): Promise<TResponseUser> => {
      
    const queryString: string = `
      UPDATE users
      SET active = false
      WHERE id = $1;
    `
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }
    const queryResult: QueryResult<TUser> = await client.query(queryConfig)

    const user = queryResult.rows[0]

    return user
}

export default deleteUserServices