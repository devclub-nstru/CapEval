const express = require("express");

const { fetchStudentlist,addStudentlist } = require("../controllers/Studentlist");



// const {updateStudentlist} = require('../controllers/Studentlist')

const router = express.Router();

router.get("/", fetchStudentlist);
router.post("/", addStudentlist);

module.exports = router;
