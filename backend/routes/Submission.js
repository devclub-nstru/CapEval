const express = require("express");

const { getReport, postReport } = require("../controllers/Submissions");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/submissions", getReport);
router.post("/submissions", verifyToken, postReport);

module.exports = router;
