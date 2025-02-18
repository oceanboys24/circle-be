import expres from "express";
import { AuthCheck } from "../../middlewares/auth_check_middleware";
import CreateReplyController from "../../controllers/reply/create_reply_controller";
import DeleteReplyController from "../../controllers/reply/delete_reply_controller";
import GetReplyAllController from "../../controllers/reply/get_all_reply_controller";
import GetReplyByIdController from "../../controllers/reply/get_by_id_reply_controller";
import UpdateReplyController from "../../controllers/reply/update_reply_controller";

const ReplyRoute = expres.Router();

ReplyRoute.post("/", AuthCheck, CreateReplyController);
ReplyRoute.get("/:id", AuthCheck, GetReplyByIdController);
ReplyRoute.get("/", AuthCheck, GetReplyAllController);
ReplyRoute.delete("/:id", AuthCheck, DeleteReplyController);
ReplyRoute.patch("/:id", AuthCheck, UpdateReplyController);

export default ReplyRoute;
