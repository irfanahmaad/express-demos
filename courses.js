const express = require("express");
const router = express.Router();
const connection = require("./connection");
const response = require("./response");

// get users
router.get("/", (req, res, next) => {
  connection.query("select * from courses", (err, results, fields) => {
    !err ? response.SuccessResponse(results, res) : res.json([err]);
  });
});

module.exports = router;
