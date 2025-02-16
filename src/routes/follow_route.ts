import expres from "express";
import FollowController from "../controllers/follow_controller";
import { AuthCheck } from "../middlewares/auth_check_middleware";

const FollowRoute = expres.Router();

FollowRoute.post("/follow", AuthCheck, FollowController.FollowUserController);
FollowRoute.post("/unfollow", AuthCheck, FollowController.UnFollowUserController);

export default FollowRoute;
