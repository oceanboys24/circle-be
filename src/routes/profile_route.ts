import expres from "express";
import ProfileController from "../controllers/profile_controller"
import { AuthCheck } from "../middlewares/auth_check_middleware";

const ProfileRoute = expres.Router();

ProfileRoute.patch("/", AuthCheck, ProfileController.UpdateProfileController);


export default ProfileRoute;
