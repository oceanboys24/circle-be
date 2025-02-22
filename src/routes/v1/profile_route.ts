import expres from "express";
import { AuthCheck } from "../../middlewares/auth_check_middleware";
import UpdateProfileController from "../../controllers/profile/setup_profile_controller";
import { upload, uploadFiles } from "../../middlewares/multer_middleware";

const ProfileRoute = expres.Router();

ProfileRoute.patch("/", AuthCheck, uploadFiles, UpdateProfileController);

export default ProfileRoute;
