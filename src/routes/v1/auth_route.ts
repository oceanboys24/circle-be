import expres from "express";
import { AuthCheck } from "../../middlewares/auth_check_middleware";
import LoginAuthController from "../../controllers/auth/login_auth_controller";
import RegisterAuthController from "../../controllers/auth/register_auth_controller";
import CheckAuthController from "../../controllers/auth/check_auth_controller";
import ForgotPasswordAuthController from "../../controllers/auth/forgot_password_auth_controller";
import ResetPasswordAuthController from "../../controllers/auth/reset_password_auth_controller";

const AuthRoute = expres.Router();

AuthRoute.post("/login", LoginAuthController);
AuthRoute.post("/register", RegisterAuthController);
AuthRoute.post("/check", AuthCheck, CheckAuthController);
AuthRoute.post("/forgot-password", ForgotPasswordAuthController);
AuthRoute.post("/reset-password", AuthCheck, ResetPasswordAuthController);

export default AuthRoute;
