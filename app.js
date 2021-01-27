/**
 * @author Adebayo Ilerioluwa
 */
"use strict";

import express from "express";
import bodyParser from "body-parser";
import { validateReqBody } from "./src/validations/validateReqBody";
import checkNestedData from "./src/validations/checkNestedData";

const app = express();

// Handles invalid JSON Payload passed
app.use((req, res, next) => {
  bodyParser.json()(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: "Invalid JSON payload passed.",
        status: "error",
        data: null,
      });
    }
    next();
  });
});
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * @name
 * @description
 * @requires
 * @returns
 */

app.get("/", (req, res) => {
  res.status(200).json({
    message: "My Rule-Validation API.",
    status: "success",
    data: {
      name: "Adebayo Ilerioluwa",
      github: "@adebayoileri",
      email: "adebayorilerioluwa@gmail.com",
      mobile: "09011550351",
      twitter: "@adeileri",
    },
  });
});

app.post("/validate-rule", validateReqBody, checkNestedData);

app.listen(4200, () => {
  console.log("server up and running");
});
