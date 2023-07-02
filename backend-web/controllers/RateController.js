const express = require("express");
const {
    createRate,
    editRate,
    // delRate,
    getAllProductRate,
  } = require("../routes/rateRoutes");
  const router = express.Router();
  router.get("/:productId", getAllProductRate);
  router.post("/create", createRate);

  module.exports = router;