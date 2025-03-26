// import secondStepModel from "../config/models/secondStepModel";

const nodemailer = require("nodemailer");
const express = require("express");
const secondStepModel = require("../config/models/secondStepModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../config/models/userModel");
const AllStudents = require("../config/models/AllStudents");
const fs = require("fs");
const path = require("path");
var htmlTemplate = fs.readFileSync(
  path.join(__dirname, "../config/StudentEvaluation.html"),
  "utf-8"
);
const max_tries = 10;

const sendEmail = async (body) => {
  const { to } = body;
  if (!to) {
    return {
      success: false,
      msg: "No recipients defined",
    };
  }

  var email = to;
  const user = await User.findOne({
    email: { $regex: new RegExp(`^${email}$`, "i") },
  });

  if (user) {
    return { status: false, message: "User Already Exist" };
  }
  var fourdigitotp = Math.floor(1000 + Math.random() * 9000);
  var data = await secondStepModel.findOne({ email });
  if (!data) {
    var tosave = new secondStepModel({
      email,
      otp: fourdigitotp,
      totalTries: { tries: 1, date: new Date().toDateString() },
      time: Number(new Date()),
    });
    await tosave.save();
    var emailsent = await sendOTPPassMail({ to, otp: fourdigitotp, email });
    if (emailsent) {
      return {
        success: true,
        msg: "Email Sent",
      };
    } else {
      return {
        success: false,
        msg: "Unable To Send Email",
      };
    }
  }

  if (data?.totalTries?.tries && data.totalTries.tries > max_tries) {
    if (data.totalTries.date == new Date().toDateString()) {
      return {
        success: false,
        msg: "Max Tries Limit Reached. Try Tomorrow",
      };
    } else {
      await secondStepModel.findOneAndUpdate(
        { email },
        {
          "totalTries.tries": 1,
          "totalTries.date": new Date().toDateString(),
          time: Number(new Date()),
        }
      );

      var emailsent = await sendOTPPassMail({ to, email });
      if (emailsent) {
        return {
          success: true,
          msg: "Email Sent",
        };
      } else {
        return {
          success: false,
          msg: "Unable To Send Email",
        };
      }
    }
  } else {
    if (
      data?.totalTries?.date &&
      data.totalTries.date != new Date().toDateString()
    ) {
      await secondStepModel.findOneAndUpdate(
        { email },
        {
          "totalTries.tries": 1,
          "totalTries.date": new Date().toDateString(),
          time: Number(new Date()),
        }
      );
    } else {
      await secondStepModel.findOneAndUpdate(
        { email },
        {
          $inc: {
            "totalTries.tries": 1,
          },
          "totalTries.date": new Date().toDateString(),
          time: Number(new Date()),
        }
      );
    }
    var emailsent = await sendOTPPassMail({ to, email });
    if (emailsent) {
      return {
        success: true,
        msg: "Email Sent",
      };
    } else {
      return {
        success: false,
        msg: "Unable To Send Email",
      };
    }
  }
  // Create a transporter with Gmail SMTP credentials
};
router.post("/otp", async (req, res) => {
  return res.send(await sendEmail(req.body));
});
router.post("/forgetPass", async (req, res) => {
  var body = req.body;
  if (!body.to) {
    return res.send({ status: false, msg: "Please add a recipient." });
  }
  var dbres = await User.findOne({ email: body.to });
  if (!dbres) {
    return res.send({ status: false, msg: "User not found" });
  }
  const token = jwt.sign({ _id: dbres._id }, process.env.SECRET_KEY, {
    expiresIn: "10m",
  });

  return res.send(
    await sendForgetPassMail({
      to: body.to,
      host:
        process.env.forgetPasswordHostedLink + "?token=" + token ||
        "https://localhost:6969/?token=" + token,
    })
  );
});
router.post("/sendQuery", async (req, res) => {});
router.post("/sendReport", async (req, res) => {
  var body = req.body;
  if (!body.to) {
    return res.send({ status: false, msg: "Please add a recipient." });
  }
  await AllStudents.findOneAndUpdate({ email: body.to }, { isMailSend: true });
  var dbres = await AllStudents.findOne({ email: body.to });
  if (!dbres) {
    return res.send({ status: false, msg: "User not found" });
  }
  // console.log(dbres);

  return res.send(
    await sendReport({
      to: body.to,
      student: dbres,
    })
  );
});
async function sendForgetPassMail(newbody) {
  var { to, host } = newbody;
  var email = to;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kradityanormal5@gmail.com", // Your Gmail email address
      pass: process.env.emailpass, // Your Gmail password or App Password
    },
  });

  // Email message options
  const mailOptions = {
    from: "Forget password for capstone project <kradityanormal5@gmail.com>", // Sender address
    to,
    subject: "Forget password for capstone project",
    text: `${otp}`,
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">NST x RU</a>
    </div>
    <p style="font-size:1.1em">Hi, ${email.split("@")[0].replace(" ")}</p>
    <p>Thank you for choosing Newton School. Use the following Link to Update your Password.</p>
    <a href='${host}' style="background: #00466a;text-decoration:none;margin: 0 auto;width: max-content;padding: 4px 10px;color: #fff;border-radius: 4px;">Update Password</a>
    <p style="font-size:0.9em;">Regards,<br />Newton school Team</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Newton School Of Technology</p>
      <p>Sonipat</p>
      <p>Delhi NCR</p>
    </div>
  </div>
</div>`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    return { status: true, msg: "Email sent!" };
  } catch (error) {
    console.log("Error sending email:", error);
    return { status: false, msg: "Error sending email" };
  }
}
async function sendOTPPassMail(newbody) {
  var { to, email } = newbody;
  var otp = newbody?.otp || Math.floor(1000 + Math.random() * 9000);
  await secondStepModel.findOneAndUpdate({ email }, { otp });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kradityanormal5@gmail.com", // Your Gmail email address
      pass: process.env.emailpass, // Your Gmail password or App Password
    },
  });

  // Email message options
  const mailOptions = {
    from: "OTP for capstone project <kradityanormal5@gmail.com>", // Sender address
    to,
    subject: "OTP for capstone project",
    text: `${otp}`,
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">NST x RU</a>
    </div>
    <p style="font-size:1.1em">Hi, ${email.split("@")[0].replace(" ")}</p>
    <p>Thank you for choosing Newton School. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />Newton school Team</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Newton School Of Technology</p>
      <p>Sonipat</p>
      <p>Delhi NCR</p>
    </div>
  </div>
</div>`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log("Error sending email:", error);
    return false;
  }
}
async function sendReport(newbody) {
  var { to, student } = newbody;
  if (!student?.report?.evaluation) {
    return { status: false, msg: "Not evaluation Detected" };
  }
  var HTML = Object.keys(student.report.evaluation).reduce((prev = 0, curr) => {
    if (["SMH", "VHM", "IMI", "FEA", "CWOC"].includes(curr)) {
      return prev + student.report.evaluation[curr];
    } else {
      return prev;
    }
  }, 0);
  //   console.log(HTML);
  var CSS = Object.keys(student.report.evaluation).reduce((prev = 0, curr) => {
    if (["LP", "TCS", "SVC", "Resp", "COBP"].includes(curr)) {
      return prev + student.report.evaluation[curr];
    } else {
      return prev;
    }
  }, 0);
  var RESPONSIVE = Object.keys(student.report.evaluation).reduce(
    (prev = 0, curr) => {
      if (["MFA", "DC"].includes(curr)) {
        return prev + student.report.evaluation[curr];
      } else {
        return prev;
      }
    },
    0
  );

  var OPTIMIZATION = Object.keys(student.report.evaluation).reduce(
    (prev = 0, curr) => {
      if (["AFD", "IEU"].includes(curr)) {
        return prev + student.report.evaluation[curr];
      } else {
        return prev;
      }
    },
    0
  );
  var TESTING = Object.keys(student.report.evaluation).reduce(
    (prev = 0, curr) => {
      if (["CBC", "BFI"].includes(curr)) {
        return prev + student.report.evaluation[curr];
      } else {
        return prev;
      }
    },
    0
  );
  // console.log([
  //   { title: "HTML", value: HTML },
  //   { title: "CSS", value: CSS },
  //   { title: "RESPONSIVE", value: RESPONSIVE },
  //   { title: "OPTIMIZATION", value: OPTIMIZATION },
  //   { title: "TESTING", value: TESTING },
  //   { title: "TOTAL", value: student.report.total },
  // ]);
  // return;
  //   var VISUALDESIGN = student.report.evaluation;
  //   var TESTING = student.report.evaluation;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kradityanormal5@gmail.com", // Your Gmail email address
      pass: process.env.emailpass, // Your Gmail password or App Password
    },
  });

  var newhtmlTemplate = htmlTemplate
    .replace("{StudentName}", student.name)
    .replace("johndoe@example.com", to)
    .replace("{MentorName}", student.mentor)
    // Update scores
    .replace("{HTMLSCORE}", `${HTML}`)
    .replace("{CSSSCORE}", `${CSS}`)
    .replace("{Responsiveness&MobileOptimizationLSCORE}", `${RESPONSIVE}`)
    .replace("{Visual&FunctionalDesignSCORE}", `${OPTIMIZATION}`)
    .replace("{Testing&DebuggingSCORE}", `${TESTING}`)
    .replace("{TOTALSCORE}", `${student.report?.total}`)
    // Update feedback
    .replace("{FeedbackInputOfStudent}", `${student.report.feedback}`);

  const mailOptions = {
    from: "Your S&W capstone project evalutation report <kradityanormal5@gmail.com>", // Sender address
    to,
    subject: "Your S&W capstone project evalutation report",
    text: `Your Evaluation Report`,
    html: newhtmlTemplate,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    return { status: true, msg: "Email send sucessfully" };
  } catch (error) {
    return { status: false, msg: "Failed to send Email" };
  }
}

module.exports = router;
