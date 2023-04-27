import { Router } from "express";
import {
  deleteUserController,
  listAllUsersController,
  listUserLoggedController,
  reactivateUserController,
  registerUserController,
  updateUsersDataController,
} from "../controllers/users.controllers";
import checkEmailExistsMiddlewares from "../middlewares/checkEmailExists.middlewares";
import checkIsBodyValidMiddlewares from "../middlewares/checkIsBodyValid.middlewares";
import { requestUserSchema, updateUserSchema } from "../schemas/users.schemas";
import checkTokenIsValidMiddleware from "../middlewares/checkTokenIsValid.middlewares";
import checkIsAdminMiddlewares from "../middlewares/checkIsAdmin.middlewares";
import checkUserExistsMiddleware from "../middlewares/checkUserExists.middlewares";
import checkUserHasPermissionMiddlewares from "../middlewares/checkUserHasPermission.middlewares";
import checkUserActiveMiddlewares from "../middlewares/checkUserActive.middleware";

const usersRoutes = Router();

usersRoutes.post(
  "",
  checkIsBodyValidMiddlewares(requestUserSchema),
  checkEmailExistsMiddlewares,
  registerUserController
);
usersRoutes.get(
  "",
  checkTokenIsValidMiddleware,
  checkIsAdminMiddlewares,
  listAllUsersController
);
usersRoutes.get(
  "/profile",
  checkTokenIsValidMiddleware,
  listUserLoggedController
);
usersRoutes.patch(
  "/:id",
  checkIsBodyValidMiddlewares(updateUserSchema),
  checkTokenIsValidMiddleware,
  checkUserExistsMiddleware,
  checkUserHasPermissionMiddlewares,
  checkEmailExistsMiddlewares,
  updateUsersDataController
);
usersRoutes.delete(
  "/:id",
  checkTokenIsValidMiddleware,
  checkUserExistsMiddleware,
  checkUserHasPermissionMiddlewares,
  deleteUserController
);
usersRoutes.put(
  "/:id/recover",
  checkTokenIsValidMiddleware,
  checkIsAdminMiddlewares,
  checkUserExistsMiddleware,
  checkUserActiveMiddlewares,
  reactivateUserController
);

export default usersRoutes;
