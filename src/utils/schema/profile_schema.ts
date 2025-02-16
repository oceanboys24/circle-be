import Joi from "joi";
import { ProfileDTO } from "../../dtos/profile_dto";

export const ProfileSchema = Joi.object<ProfileDTO>({
  fullName: Joi.string().min(3).max(50).optional(),
  userName: Joi.string().alphanum().min(3).max(30).optional(),
  avatarUrl: Joi.string().uri().optional(),
  bannerUrl: Joi.string().uri().optional(),
  bio: Joi.string().max(255).optional(),
});
