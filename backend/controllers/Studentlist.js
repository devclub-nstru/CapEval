const Studentlists = require("../config/models/AllStudents");

// const Studentlists = require('../models/AllStudents');
const fetchStudentlist = async (req, res) => {
  try {
    const Studentlist = await Studentlists.find({
      mentor: { $regex: new RegExp(`^${req.query.mentor}$`, "i") },
    });

    if (Studentlist.length > 0) {
      return res.status(200).json({
        success: true,
        data: Studentlist,
      });
    } else {
      return res.status(404).json({
        success: false,
        data: "No Studentlist found.",
      });
    }
  } catch (error) {
    console.error("Error fetching Studentlist:", error);

    return res.status(500).json({
      success: false,
      message: "An error occured while updating the list.",
    });
  }
};
const addStudentlist = async (req, res) => {
  try {
    // console.log("req came")
    const { name, email, githubRepo, hostedList, query, video, report } =
      req.body;

    const requiredFields = [
      "name",
      "email",
      "githubRepo",
      "hostedList",
      "query",
      "video",
      "report",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `The following fields are required: ${missingFields.join(
          ", "
        )}.`,
      });
    }

    const newStudentlist = new Studentlists({
      name,
      email,
      githubRepo,
      hostedList,
      query,
      video,
      report,
    });

    const savedStudentlist = await newStudentlist.save();

    return res.status(201).json({
      success: true,
      message: "Studentlist Created successfully",
      data: savedStudentlist,
    });
  } catch (error) {
    console.error("Error adding Studentlist:", error);

    return res.status(500).json({
      success: false,
      message: "An error occurred while addind the list.",
      error: error.message,
    });
  }
};

// const updateStudentlist = async (req, res) => {
//     try {
//         const updateData = req.body;

//         if (!)
//     }
// }

module.exports = {
  fetchStudentlist,
  addStudentlist,
};
