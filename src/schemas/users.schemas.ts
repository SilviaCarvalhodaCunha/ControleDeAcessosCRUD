import { z } from 'zod'

const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    admin: z.boolean().optional(),
    active: z.boolean()
})

const requestUserSchema = userSchema.omit({ id: true, active: true })

const responseUserSchema = userSchema.omit({ password: true})

const requestAllUserSchema = z.array(responseUserSchema)

const requestUserUpdateSchema =  userSchema.omit({ id: true, active: true, admin: true})

const updateUserSchema = requestUserUpdateSchema.partial()



export { userSchema, requestUserSchema, responseUserSchema, requestAllUserSchema, updateUserSchema }