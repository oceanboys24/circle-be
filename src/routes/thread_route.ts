import expres from "express";
import ThreadController from "../controllers/thread_controller";
import { AuthCheck } from "../middlewares/auth_check_middleware";

const ThreadRoute = expres.Router();

ThreadRoute.post("/", AuthCheck, ThreadController.CreateThreadController);
ThreadRoute.get("/:id", AuthCheck, ThreadController.GetThreadByIdController);
ThreadRoute.get("/", AuthCheck, ThreadController.GetThreadAllController);
ThreadRoute.delete("/:id", AuthCheck, ThreadController.DeleteThreadController);
ThreadRoute.patch("/:id", AuthCheck, ThreadController.UpdateThreadController);

export default ThreadRoute;
