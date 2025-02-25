import Joi from "joi";
import { ProfileDTO } from "../../dtos/profile_dto";

export const ProfileSchema = Joi.object<ProfileDTO>({
  fullName: Joi.string().min(3).max(50).optional().empty(""),
  userName: Joi.string().alphanum().min(3).max(30).optional().empty(""),
  avatarUrl: Joi.string().optional(),
  bannerUrl: Joi.string().optional(),
  bio: Joi.string().max(255).optional().empty(""),
});
