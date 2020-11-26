import Joi from "joi";

/**
 * Create validation
 * @param {Object} billObj
 */

const send = (billObj) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    transferSum: Joi.number().min(0).max(100000).required(),
    cashSum: Joi.number().min(0).max(100000).required(),
    posSum: Joi.number().min(0).max(100000).required(),
    receiptImg: Joi.string().required(),
  });

  const { error } = schema.validate(billObj);

  if (error !== undefined) return error.details;
  return true;
};

export default send;
