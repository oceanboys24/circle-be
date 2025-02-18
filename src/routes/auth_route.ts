import expres from "express";
import { AuthCheck } from "../middlewares/auth_check_middleware";
import RegisterAuth from "../controllers/auth/register_auth";
import LoginAuth from "../controllers/auth/login_auth";
import CheckAuth from "../controllers/auth/check_auth";
import ForgotPasswordAuth from "../controllers/auth/forgot_password_auth";
import ResetPasswordAuth from "../controllers/auth/reset_password_auth";

const AuthRoute = expres.Router();

AuthRoute.post("/login", LoginAuth)
AuthRoute.post("/register", RegisterAuth);
AuthRoute.post("/check", AuthCheck, CheckAuth)
AuthRoute.post("/forgot-password", ForgotPasswordAuth)
AuthRoute.post("/reset-password", AuthCheck, ResetPasswordAuth)

export default AuthRoute;
