import expres from "express";
import AuthController from "../controllers/auth_controller"

const AuthRoute = expres.Router();

AuthRoute.post("/login", AuthController.LoginAuth)
AuthRoute.post("/register", AuthController.RegisterAuth);

export default AuthRoute;
