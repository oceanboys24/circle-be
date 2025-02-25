import expres from "express";
import FollowUserController, { GetFollowers, GetFollowing } from "../../controllers/follows/follow_user_controller";
import { AuthCheck } from "../../middlewares/auth_check_middleware";
import UnFollowUserController from "../../controllers/follows/unfollow_user_controller";

const FollowRoute = expres.Router();

FollowRoute.post("/follow", AuthCheck, FollowUserController);
FollowRoute.post("/unfollow", AuthCheck, UnFollowUserController);
FollowRoute.get("/followers/:userId", AuthCheck, GetFollowers);
FollowRoute.get("/following/:userId", AuthCheck, GetFollowing);

export default FollowRoute;
