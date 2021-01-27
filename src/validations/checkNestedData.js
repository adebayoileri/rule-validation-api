"use strict";
const checkNestedData = (req, res, next) => {
  try {
    const {
      rule: { field },
      data,
    } = req.body;

    res.send("hola")
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      status: "error",
      data: null,
    });
  }
};

export default checkNestedData
