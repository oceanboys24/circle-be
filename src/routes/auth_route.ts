import expres from "express";
import AuthController from "../controllers/auth_controller"
import { AuthCheck } from "../middlewares/auth_check_middleware";

const AuthRoute = expres.Router();

AuthRoute.post("/login", AuthController.LoginAuth)
AuthRoute.post("/register", AuthController.RegisterAuth);
AuthRoute.post("/check", AuthCheck, AuthController.CheckAuth)
AuthRoute.post("/forgot-password", AuthController.ForgotPasswordAuth)
AuthRoute.post("/reset-password", AuthCheck, AuthController.ResetPasswordAuth)

export default AuthRoute;
