import { z } from 'zod'

const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    admin: z.boolean(),
    active: z.boolean()
})

const requestUserSchema = userSchema.omit({ id: true })

const responseUserSchema = userSchema.omit({ password: true})

const updateUserSchema = requestUserSchema.partial()

export { userSchema, requestUserSchema, responseUserSchema, updateUserSchema }