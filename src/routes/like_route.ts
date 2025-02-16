import expres from "express";
import LikeController from "../controllers/like_controller";
import { AuthCheck } from "../middlewares/auth_check_middleware";

const LikesRoute = expres.Router();

LikesRoute.post("/", AuthCheck, LikeController.CreateLikeController);
LikesRoute.delete("/", AuthCheck, LikeController.UnlikeController);

export default LikesRoute;
