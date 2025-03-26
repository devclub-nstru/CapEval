var express = require("express");
const Feedback = require("../config/models/studentFeedback");
const User = require("../config/models/AllStudents");
var router = express.Router();
router.get("/TopPerformers", async (req, res) => {
  try {
    const dbres = await User.find({}).sort({ "report.total": -1 }).limit(3);

    const topPerformers = dbres.map((student) => ({
      name: student.name,
      total: student.report?.total || 0,
      email: student.email,
      githubRepo: student.githubRepo,
    }));

    return res.send({
      status: true,
      count: dbres.length,
      topPerformers: topPerformers,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Error fetching top performers",
      error: error.message,
    });
  }
});
router.get("/queries", async (req, res) => {
  var dbres = await Feedback.find({});
  return res.send({ status: true, count: dbres.length });
});
router.get("/queriesSolved", async (req, res) => {
  var dbres = await Feedback.find({});
  var count = 0;
  dbres.forEach((el) => {
    if (el?.feedback && el?.feedback?.length > 0) {
      count++;
    }
  });
  return res.send({ status: true, count: count });
});
router.get("/SubmisstionCount", async (req, res) => {
  var dbres = await User.find({});
  return res.send({ status: true, count: dbres.length });
});
module.exports = router;
