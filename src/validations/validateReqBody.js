"use strict";
import Joi from "joi";

/**
 * @description  Validates request body data from client
 * @param {object} data - data to be validated
 * @param {object} res - The response payload
 * @param {function} next - move to next middleware
 */

export const validateReqBody = async (req, res, next) => {
  try {
    const bodyValidationSchema = Joi.object({
      rule: Joi.object()
        .keys({
          field: Joi.string().required().messages({
            field: "field should be a string.",
            "field.required": "field is required.",
          }),
          condition: Joi.string()
            .valid("eq", "neq", "gte", "gt", "contains")
            .required()
            .messages({
              check: "condition should be a string.",
              "check.required": "condition is required.",
            }),
          condition_value: Joi.any().required().messages({
            "any.required": "condition_value is required.",
          }),
        })
        .required()
        .messages({
          "string.base": "rule should be an object.",
          "any.required": "rule is required.",
        }),
      data: Joi.alternatives().try(
        Joi.string().required(),
        Joi.array().required(),
        Joi.object().required()
      ),
    }).required();

    // validate data
    const isValidated = await bodyValidationSchema.validateAsync({
      ...req.body,
    });
    // if (isValidated) {
      return next();
    // }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      status: "error",
      data: null,
    });
  }
};
