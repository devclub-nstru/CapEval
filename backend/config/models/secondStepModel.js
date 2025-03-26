const mongoose = require("mongoose");

const authschema = mongoose.Schema({
  email: { type: String },
  otp: { type: Number },
  totalTries: {
    type: Object,
  },
  time: {
    type: Number,
  },
});
module.exports = mongoose.model("secindstepauth", authschema);
