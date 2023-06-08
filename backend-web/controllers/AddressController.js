const express = require("express");
const {
  addAddress,
  getUserAddress,
} = require("../routes/addressRoutes");

const router = express.Router();

router.post("/", address);

router.get("/", getUserAddress);

module.exports = router;