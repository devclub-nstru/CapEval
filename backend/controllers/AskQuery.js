const User = require("../config/models/userModel");
var nodemailer = require("nodemailer");

async function sendFeedbackMail(newbody) {
  const { to, feedback } = newbody;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kradityanormal5@gmail.com", // Your Gmail email address
      pass: process.env.emailpass, // Your Gmail password or App Password
    },
  });

  // Email message options
  const mailOptions = {
    from: "Feedback Notification <kradityanormal5@gmail.com>", // Sender address
    to,
    subject: "New Feedback Received",
    text: `You have received new feedback: ${feedback}`,
    html: `<p>You have received new feedback:</p><p>${feedback}</p>`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    return { success: true, msg: "Feedback email sent!" };
  } catch (error) {
    console.log("Error sending feedback email:", error);
    return { success: false, msg: "Error sending feedback email" };
  }
}
module.exports = {
  getQuery: async (req, res) => {
    const Query = require("../config/models/studentFeedback");
    try {
      const query = req.query?.mentor
        ? await Query.find({
            mentor: { $regex: new RegExp(`^${req.query.mentor}$`, "i") },
          })
        : req.query?.id
        ? await Query.findOne({ _id: req.query.id })
        : await Query.find({});
      if (!query) {
        return res.send({ status: true, msg: [] });
      }
      return res.send({ status: true, msg: query });
    } catch (err) {
      return res.send("Error getting Query");
    }
  },

  postQuery: async (req, res) => {
    const { query } = req.body;
    if (!query) {
      return res.send("Query is required");
    }
    const Query = require("../config/models/studentFeedback");
    try {
      var dbres = await User.findById(req.userId);
      const newQuery = new Query({
        // ...query,
        file: query?.file || "",
        query: query.query,
        email: dbres.email,
        mentor: dbres.mentorName,
        name: dbres.name,
      });
      await newQuery.save();
      res.status(200).send("Query submitted successfully");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Error posting Query");
    }
  },

  putQuery: async (req, res) => {
    const { feedback, id } = req.body;
    if (!feedback) {
      return res.status(400).send("feedback is required");
    }
    const Query = require("../config/models/studentFeedback");
    try {
      const updatedQuery = await Query.findByIdAndUpdate(
        id,
        { feedback },
        { new: true }
      );

      if (!updatedQuery) {
        return res.status(404).send("Query not found");
      }

      // Send feedback email
      const emailResponse = await sendFeedbackMail({
        to: updatedQuery.email,
        feedback,
      }); // Replace with actual recipient email
      if (!emailResponse.success) {
        console.error("Failed to send feedback email:", emailResponse.msg);
      }

      res.status(200).send("Query updated successfully");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Error updating Query");
    }
  },
};
