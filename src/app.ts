import "express-async-errors";
import express, { Application } from 'express'
import { handleErrors } from './error'
import loginRoutes from "./routers/login.routes";
import usersRoutes from "./routers/users.routes";

const app: Application = express()
app.use(express.json())

app.use('/users', usersRoutes)
app.use('/login', loginRoutes)

app.use(handleErrors)

export default app
