var express = require("express");
const User = require("../config/models/AllStudents");
var router = express.Router();
router.post("/", async (req, res) => {
  try {
    var { evaluation, id, feedback } = req.body;
    var dbres = await User.findByIdAndUpdate(id, {
      report: { evaluation, total: evaluation.total, feedback },
    });
    return res.json({ status: true, msg: "Evalution Added" });
  } catch (error) {
    return res.json({ status: false, msg: "Error Occured" });
  }
});
module.exports = router;
