/**
 * @author Adebayo Ilerioluwa
 */

"use strict";

/**
 * @description middleware to check for nested data in field provided
 * @param {object} req - request payload
 * @param {object} res - The response payload
 * @param {*} next - next middleware function
 */
const checkNestedData = async (req, res, next) => {
  const {
    rule: { field },
    data,
  } = req.body;

  try {
    const fieldArr = field.split(".");

    if (fieldArr.length < 1) {
      throw new Error("field is required");
    }

    if (fieldArr.length > 2) {
      throw new Error("nesting should not be more than two levels.");
    }

    // check if property exists in data object
    const dataExists = data.hasOwnProperty(fieldArr[0]);

    if (!dataExists) {
      throw new Error(`field ${field} is missing from data.`);
    }

    // if data nested data doesn't exists
    if (fieldArr.length === 1) {
      req.fieldData = data[fieldArr[0]];
      return next();
    }

    //check if nested data exists
    const isNestedDataExists = data[fieldArr[0]].hasOwnProperty(fieldArr[1]);

    if (!isNestedDataExists) {
      throw new Error(`field ${field} is missing from data.`);
    }

    if (isNestedDataExists) {
      req.fieldData = data[fieldArr[0]][fieldArr[1]];
    }
    return next();
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      status: "error",
      data: null,
    });
  }
};

export default checkNestedData;
