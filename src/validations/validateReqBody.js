/** 
 * @author Adebbayo Ilerioluwa
 */

"use strict";
import Joi from "joi";

/**
 * @description  Validates request body data from client
 * @param {object} data - data to be validated
 * @param {object} req - request payload
 * @param {object} res - The response payload
 * @param {function} next - move to next middleware
 */

const validateReqBody = async (req, res, next) => {
  try {
    // create validation schema with joi
    const bodyValidationSchema = Joi.object({
      rule: Joi.object()
        .keys({
          field: Joi.string().required().messages({
            "base.string": "field should be a string.",
            "any.required": "field is required.",
          }),
          condition: Joi.string()
            .valid("eq", "neq", "gte", "gt", "contains")
            .required()
            .messages({
              "base.string": "condition should be a string.",
              "any.required": "condition is required.",
            }),
          condition_value: Joi.any().required().messages({
            "base.required": "condition_value is required.",
          }),
        })
        .required()
        .messages({
          "base.object": "rule should be an object.",
          "any.required": "rule is required.",
        }),
      data: Joi.alternatives().try(
        Joi.string().required(),
        Joi.array().required(),
        Joi.object().required()
      ),
    }).required();

    // validate data
    await bodyValidationSchema.validateAsync({
      ...req.body,
    });
    return next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      status: "error",
      data: null,
    });
  }
};

export default validateReqBody