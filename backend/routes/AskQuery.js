const express = require("express");

const { getQuery, postQuery, putQuery } = require("../controllers/AskQuery");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/queries", getQuery);
router.post("/queries", verifyToken, postQuery);
router.put("/queries", putQuery);

module.exports = router;
