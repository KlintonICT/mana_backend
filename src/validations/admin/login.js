import Joi from "joi";

const login = (adminObj) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  })

  const { error } = schema.validate(adminObj);

  if (error !== undefined) return error.details;
  return true;
}

export default login;