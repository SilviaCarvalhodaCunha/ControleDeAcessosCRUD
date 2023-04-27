import { QueryConfig, QueryResult } from "pg"
import { TResponseUser } from "../../interfaces/users.interfaces"
import { client } from "../../database"

const reactivateUserServices = async (id: number): Promise<TResponseUser> => {
    const queryString: string = `
      UPDATE users
      SET active = true
      WHERE id = $1
      RETURNING id, name, email, admin, active;
    `
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: QueryResult<TResponseUser> = await client.query(queryConfig)

    const user = queryResult.rows[0]

    return user
}

export default reactivateUserServices