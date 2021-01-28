/**
 * @author Adebayo Ilerioluwa
 */

"use strict";

/**
 * @description rule validation logic
 * @param {object} req - request payload
 * @param {object} res - The response payload
 * @param {*} next - next middleware function
 */

const validateRuleCondition = async (req, res, next) => {
  const { fieldData } = req;
  const {
    rule: { field, condition, condition_value },
    data,
  } = req.body;
  try {
    let switchValue = false;

    switch (condition) {
      case "eq":
        fieldData === condition_value ? (switchValue = true) : switchValue;
        break;
      case "neq":
        fieldData !== condition_value ? (switchValue = true) : switchValue;
        break;
      case "gt":
        Number(fieldData) > Number(condition_value)
          ? (switchValue = true)
          : switchValue;
        break;
      case "gte":
        Number(fieldData) >= Number(condition_value)
          ? (switchValue = true)
          : switchValue;
        break;
      case "contains":
        data.includes(fieldData) ? (switchValue = true) : containValue;
        break;
      default:
        break;
    }

    if (!switchValue) {
      throw new Error("");
    }

    return res.status(200).json({
      message: `field ${field} successfully validated.`,
      status: "success",
      data: {
        validation: {
          error: false,
          field,
          field_value: fieldData,
          condition,
          condition_value,
        },
      },
    });
  } catch (err) {
    return res.status(400).json({
      message: `field ${field} failed validation.`,
      status: "error",
      data: {
        validation: {
          error: true,
          field,
          field_value: fieldData,
          condition,
          condition_value,
        },
      },
    });
  }
};

export default validateRuleCondition;
