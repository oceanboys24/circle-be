import expres from "express";
import CreateUserController from "../../controllers/user/create_user_controller";
import GetUserByIdController from "../../controllers/user/get_by_id_user_controller";
import GetAllUserController from "../../controllers/user/get_all_user_controller";
import DeleteUserByIdController from "../../controllers/user/delete_user_controller";
import UpdateUserByIdController from "../../controllers/user/update_user_controller";
import { AuthCheck } from "../../middlewares/auth_check_middleware";

const UserRoute = expres.Router();

UserRoute.post("/", CreateUserController);
UserRoute.get("/:id", AuthCheck, GetUserByIdController);
UserRoute.get("/", AuthCheck, GetAllUserController);
UserRoute.delete("/:id", DeleteUserByIdController);
UserRoute.patch("/:id", UpdateUserByIdController);

export default UserRoute;
