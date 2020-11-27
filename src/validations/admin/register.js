import Joi from "joi";

const register = (adminObj) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    branch: Joi.string().required(),
  })

  const { error } = schema.validate(adminObj);

  if (error !== undefined) return error.details;
  return true;
}

export default register;