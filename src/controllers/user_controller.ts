import { Request, Response } from "express";
import UserService from "../services/user_service";
import {
  CreateUserSchema,
  UpdatedUserSchema,
} from "../utils/schema/user_schema";
import Joi from "joi";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      // Read Request
      const body = req.body;
      // Validate Request From Client
      const ValidateUser = await CreateUserSchema.validateAsync(body, {
        abortEarly: false,
      });
      // Call Service Create User
      const userCreate = await UserService.createUser(ValidateUser);

      // Return Json if Success
      res.status(userCreate?.status).json(userCreate);
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        res.status(422).json({
          status: 422,
          message: "Validation Error",
          details: error.details.map((detail) => detail.message),
        });
        return;
      }
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
  async getUserById(req: Request, res: Response) {
    try {
      // ID Params
      const { id } = req.params;
      // Read By ID
      const user = await UserService.getUserById(id);
      // Return Result
      res.status(user.status).json(user);
    } catch (error) {
      // Return Error
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
  async getAllUsers(req: Request, res: Response) {
    try {
      // Read All Record
      const user = await UserService.getAllUsers();
      // Return Result Record
      res.status(user.status).json(user);
    } catch (error) {
      // Response Result Error
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
  async deleteUser(req: Request, res: Response) {
    try {
      // Get ID params
      const { id } = req.params;
      // Delete Inject To service
      const deleteUser = await UserService.deleteUser(id);
      res.status(deleteUser?.status!).json(deleteUser);
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      // Read ID and Body
      const { id } = req.params;
      const data = req.body;
      // Validate Request From Client
      const validateData = await UpdatedUserSchema.validateAsync(data);

      // Inject Update to DB
      const user = await UserService.updateUser(id, validateData);

      // Return Response to Client
      res.status(user.status).json(user);
    } catch (error) {
      // Error Joi
      if (error instanceof Joi.ValidationError) {
        res.status(422).json({
          status: 422,
          message: "Validation Error",
          details: error.details.map((detail) => detail.message),
        });
        return;
      }
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
}

export default new UserController();
