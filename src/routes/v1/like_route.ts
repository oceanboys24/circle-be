import expres from "express";
import { AuthCheck } from "../../middlewares/auth_check_middleware";
import CreateLikeController from "../../controllers/like/like";
import UnlikeController from "../../controllers/like/unlike";

const LikesRoute = expres.Router();

LikesRoute.post("/", AuthCheck, CreateLikeController);
LikesRoute.delete("/", AuthCheck, UnlikeController);

export default LikesRoute;
