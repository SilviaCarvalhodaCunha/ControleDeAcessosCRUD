import { z } from 'zod'
import { requestUserSchema, responseUserSchema, updateUserSchema, userSchema } from '../schemas/users.schemas'

type TUser = z.infer<typeof userSchema>

type TRequestUser = z.infer<typeof requestUserSchema> 

type TResponseUser = z.infer<typeof responseUserSchema>

type TUpdateRequestUser = z.infer<typeof updateUserSchema>

export { TUser, TRequestUser, TResponseUser, TUpdateRequestUser}