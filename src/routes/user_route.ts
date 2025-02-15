import expres from "express";
import UserController from "../controllers/user_controller";

const UserRoute = expres.Router();

UserRoute.post("/", UserController.createUser);
UserRoute.get("/:id", UserController.getUserById);
UserRoute.get("/", UserController.getAllUsers);
UserRoute.delete("/:id", UserController.deleteUser);
UserRoute.patch("/:id", UserController.updateUser);

export default UserRoute;
