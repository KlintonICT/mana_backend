import Joi from "joi";

/**
 * Create validation
 * @param {Object} billObj
 */

const update = (billObj) => {
  const schema = Joi.object({
    transacSumId: Joi.string().required(),
    transferSum: Joi.number().min(0).max(100000).required(),
    cashSum: Joi.number().min(0).max(100000).required(),
    posSum: Joi.number().min(0).max(100000).required(),
  });

  const { error } = schema.validate(billObj);

  if (error !== undefined) return error.details;
  return true;
};

export default update;
