import { Request, Response } from "express";

const registerUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(201).json();
};

const listAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json();
};

const listUserLoggedController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json();
};

const updateUsersDataController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json();
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(204).send();
};

const reactivateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json();
};

export {
  registerUserController,
  listAllUsersController,
  listUserLoggedController,
  updateUsersDataController,
  deleteUserController,
  reactivateUserController,
};
