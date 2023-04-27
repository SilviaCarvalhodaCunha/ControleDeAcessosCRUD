import { Request, Response } from "express";
import { TRequestUser, TResponseUser, TUpdateRequestUser } from "../interfaces/users.interfaces";
import registerUserServices from "../services/users/registerUser.services";
import listAllUsersServices from "../services/users/listAllUsers.services";
import deleteUserServices from "../services/users/deleteUser.services";
import updateUsersDataServices from "../services/users/updateUsersData.services";
import listUserLoggedServices from "../services/users/listUserLogged.services";
import reactivateUserServices from "../services/users/reactivateUser.services";

const registerUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TRequestUser = req.body
  const newUser: TResponseUser = await registerUserServices(userData)
  return res.status(201).json(newUser);
};

const listAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: TResponseUser[] = await listAllUsersServices()
  return res.status(200).json(user);
};

const listUserLoggedController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = res.locals.token.id
  const user: TResponseUser = await listUserLoggedServices(userId)

  return res.status(200).json(user);
};

const updateUsersDataController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id)
  const userData: TUpdateRequestUser = req.body
  
  const updateData: TResponseUser = await updateUsersDataServices(id, userData)

  return res.status(200).json(updateData);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id)

  await deleteUserServices(id)

  return res.status(204).send();
};

const reactivateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id)
  const userActive: TResponseUser = await reactivateUserServices(id)

  return res.status(200).json(userActive);
};

export {
  registerUserController,
  listAllUsersController,
  listUserLoggedController,
  updateUsersDataController,
  deleteUserController,
  reactivateUserController,
};
