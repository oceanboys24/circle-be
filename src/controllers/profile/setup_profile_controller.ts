import { Request, Response } from "express";
import { ProfileSchema } from "../../utils/schema/profile_schema";
import Joi from "joi";
import AddProfileService from "../../services/profile/setup_profile_service";

export default async function UpdateProfileController(
  req: Request,
  res: Response
) {
  try {
    // Read Request and Validate
    const userId = (req as any).userVerify.id;
    const bodyReq = req.body;

    const ResultBody = {
      ...bodyReq,
    };

    const validateReq = await ProfileSchema.validateAsync(ResultBody);
    
    // Call Service to DB
    const dataProfile = await AddProfileService(userId, validateReq);

    // Return Result
    res.status(dataProfile.status).json({
      status: dataProfile.status,
      message: dataProfile.message,
      data: dataProfile,
    });
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
