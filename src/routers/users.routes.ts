import { Router } from "express";

const usersRoutes = Router()

usersRoutes.post('')
usersRoutes.get('')
usersRoutes.get('/profile')
usersRoutes.patch('/:id')
usersRoutes.delete('/:id')
usersRoutes.put('/:id/recover')

export default usersRoutes