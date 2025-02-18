import expres from "express";
import { AuthCheck } from "../../middlewares/auth_check_middleware";
import UpdateProfileController from "../../controllers/profile/setup_profile_controller";

const ProfileRoute = expres.Router();

ProfileRoute.patch("/", AuthCheck, UpdateProfileController);

export default ProfileRoute;
