import { Request, Response } from "express";
import UserService from "../services/user_service";
import CreateUserSchema from "../schema/user_schema";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const body = req.body;
      const ValidateUser = await CreateUserSchema.validateAsync(body, {abortEarly : false})
      const userCreate = await UserService.createUser(ValidateUser)
      res.json(userCreate)
    } catch (error) {
      res.status(400).json(error);
    }
  }
  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json(error);
    }
  }
  async getAllUsers(req: Request, res: Response) {
    try {
      const user = await UserService.getAllUsers();
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json(error);
    }
  }
  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserService.deleteUser(id);
      res.status(user?.status ? 200 : 404).json({
        status : user?.status,
        message : user?.message
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const validateData = await CreateUserSchema.validateAsync(data)
      const user = await UserService.updateUser(id, data);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json(error);
    }
  }
}

export default new UserController();
