const express = require("express");

const { getLogin } = require("../controllers/AdminLogin.js");

const router = express.Router();

router.post("/", getLogin);

module.exports = router;
