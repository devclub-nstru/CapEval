const User = require("../config/models/AllStudents");
const userModel = require("../config/models/userModel");

module.exports = {
  getReport: async (req, res) => {
    const { email } = req.params;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }
      return res.status(200).json({ status: true, data: user.report });
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, message: "Server error", error });
    }
  },
  postReport: async (req, res) => {
    // const { email } = req.params;
    try {
      var user = await userModel.findById(req.userId);
      const { responseSheet } = req.body;
      if (!responseSheet) {
        return res
          .status(400)
          .send({ status: false, message: "Inputs are required" });
      }
      var allfiels = {
        // ...user,
        name: user.name,
        email: user.email,
        mentor: user.mentorName,
        githubRepo: responseSheet.githubUrl,
        hostedLink: responseSheet.hostedLink,
        video: responseSheet?.videoFile,
        query: responseSheet.query,
        figmaLink: responseSheet.figmaLink,
        // ...responseSheet,
      };
      var tosave = new User(allfiels);
      await tosave.save();
      return res
        .status(200)
        .send({ status: true, message: "Project submitted successfully" });
    } catch (error) {
      console.log(error);
      return res
        .status(200)
        .json({ status: false, message: "Error posting report" });
    }
  },
};
