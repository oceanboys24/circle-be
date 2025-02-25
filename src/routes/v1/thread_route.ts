import expres from "express";
import { AuthCheck } from "../../middlewares/auth_check_middleware";
import { upload } from "../../middlewares/multer_middleware";
import DeleteThreadController from "../../controllers/thread/delete_thread_controller";
import GetThreadAllController, { GetThreadAllRealController } from "../../controllers/thread/get_all_thread_controller";
import GetThreadByIdController from "../../controllers/thread/get_by_id_thread_controller";
import UpdateThreadController from "../../controllers/thread/update_thread_controller";
import CreateThreadController from "../../controllers/thread/create_thread_controller";

const ThreadRoute = expres.Router();

ThreadRoute.get("/all", GetThreadAllRealController);
ThreadRoute.post("/", AuthCheck, CreateThreadController);
ThreadRoute.get("/:id", AuthCheck, GetThreadByIdController);
ThreadRoute.get("/", AuthCheck, GetThreadAllController);
ThreadRoute.delete("/:id", AuthCheck, DeleteThreadController);
ThreadRoute.patch(
  "/:id",
  AuthCheck,
  upload.single("image"),
  UpdateThreadController
);

export default ThreadRoute;
