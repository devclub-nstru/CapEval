const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  query: {
    type: String,
    required: true,
  },
  mentor: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: false,
    default: "",
  },
  file: {
    type: String,
    required: false,
    default: "",
  },
});

const Feedback = mongoose.model("Allfeedbacks", studentSchema);

module.exports = Feedback;
