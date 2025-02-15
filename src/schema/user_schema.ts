import Joi from "joi"
import { CreateUserDTO } from "../dtos/user_dto"

const CreateUserSchema = Joi.object<CreateUserDTO>({
    userName : Joi.string().alphanum().min(5).required(),
    fullName : Joi.string().min(5).required(),
    password : Joi.string().min(5).required()
})


export default CreateUserSchema