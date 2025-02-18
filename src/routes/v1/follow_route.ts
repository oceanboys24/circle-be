import expres from "express";
import FollowUserController from "../../controllers/follows/follow_user_controller";
import { AuthCheck } from "../../middlewares/auth_check_middleware";
import UnFollowUserController from "../../controllers/follows/unfollow_user_controller";

const FollowRoute = expres.Router();

FollowRoute.post("/follow", AuthCheck, FollowUserController);
FollowRoute.post("/unfollow", AuthCheck, UnFollowUserController);

export default FollowRoute;
