import expres from "express";
import ReplyController from "../controllers/reply_controller";
import { AuthCheck } from "../middlewares/auth_check_middleware";

const ReplyRoute = expres.Router();

ReplyRoute.post("/", AuthCheck, ReplyController.CreateReplyController);
ReplyRoute.get("/:id", AuthCheck, ReplyController.GetReplyByIdController);
ReplyRoute.get("/", AuthCheck, ReplyController.GetReplyAllController);
ReplyRoute.delete("/:id", AuthCheck, ReplyController.DeleteReplyController);
ReplyRoute.patch("/:id", AuthCheck, ReplyController.UpdateReplyController);

export default ReplyRoute;
