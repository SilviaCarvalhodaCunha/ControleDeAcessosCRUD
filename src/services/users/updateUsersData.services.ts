import format from "pg-format"
import { TResponseUser, TUpdateRequestUser, TUser } from "../../interfaces/users.interfaces"
import { QueryConfig, QueryResult } from "pg"
import { client } from "../../database"
import { responseUserSchema } from "../../schemas/users.schemas"

const updateUsersDataServices = async (id:number, userData: TUpdateRequestUser) => {
    const queryString: string = format(
        `
          UPDATE users
          SET(%I) = ROW(%L)
          WHERE id = $1
          RETURNING *;
        `,
        Object.keys(userData),
        Object.values(userData)
    )

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: QueryResult<TUser> = await client.query(queryConfig)

    const user: TResponseUser = responseUserSchema.parse(queryResult.rows[0])

    return user

}

export default updateUsersDataServices