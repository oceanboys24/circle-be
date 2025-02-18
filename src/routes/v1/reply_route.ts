import expres from "express";
import { AuthCheck } from "../../middlewares/auth_check_middleware";
import CreateReplyController from "../../controllers/reply/create_reply";
import DeleteReplyController from "../../controllers/reply/delete_reply";
import GetReplyAllController from "../../controllers/reply/get_all_reply";
import GetReplyByIdController from "../../controllers/reply/get_by_id_reply";
import UpdateReplyController from "../../controllers/reply/update_reply";

const ReplyRoute = expres.Router();

ReplyRoute.post("/", AuthCheck, CreateReplyController);
ReplyRoute.get("/:id", AuthCheck, GetReplyByIdController);
ReplyRoute.get("/", AuthCheck, GetReplyAllController);
ReplyRoute.delete("/:id", AuthCheck, DeleteReplyController);
ReplyRoute.patch("/:id", AuthCheck, UpdateReplyController);

export default ReplyRoute;
