import express from "express";
import {
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
  updateUserRole,
} from "../controllers/user.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/auth/registration", registrationUser);

userRouter.post("/auth/activate-user", activateUser);

userRouter.post("/auth/login", loginUser);

userRouter.get("/auth/logout",isAutheticated, logoutUser);

userRouter.get("/auth/me", isAutheticated, getUserInfo);

userRouter.post("/auth/social-auth", socialAuth);

userRouter.put("/auth/update-user-info",isAutheticated, updateUserInfo);

userRouter.put("/auth/update-user-password", isAutheticated, updatePassword);

userRouter.put("/auth/update-user-avatar", isAutheticated, updateProfilePicture);

// userRouter.get(
//   "/get-users",
//   isAutheticated,
//   authorizeRoles("admin"),
//   getAllUsers
// );

// userRouter.put(
//   "/update-user",
//   isAutheticated,
//   authorizeRoles("admin"),
//   updateUserRole
// );

// userRouter.delete(
//   "/delete-user/:id",
//   isAutheticated,
//   authorizeRoles("admin"),
//   deleteUser
// );

export default userRouter;
