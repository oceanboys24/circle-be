import { Request, Response } from "express";
import UserService from "../services/user_service";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const body = req.body;
      console.log(body);
      const userCreate = await UserService.createUser(body);

      res.json(userCreate);
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
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json(error);
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const user = await UserService.updateUser(id, data);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json(error);
    }
  }
}

export default new UserController();
