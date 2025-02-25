import expres from "express";
import { AuthCheck } from "../../middlewares/auth_check_middleware";
import CreateLikeController from "../../controllers/like/like_controller";
import UnlikeController from "../../controllers/like/unlike_controller";

const LikesRoute = expres.Router();

LikesRoute.post("/", AuthCheck, CreateLikeController);
LikesRoute.delete("/:id", AuthCheck, UnlikeController);

export default LikesRoute;
