const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    mentor: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    githubRepo: {
      type: String,
      required: true,
      trim: true,
    },
    hostedLink: {
      type: String,
      required: false,
      trim: true,
    },
    figmaLink: {
      type: String,
      required: false,
      trim: true,
    },
    query: {
      type: String,
      required: false,
      trim: true,
    },
    video: {
      type: String,
      required: true,
      trim: true,
    },
    report: {
      type: Object,
      required: false,
      trim: true,
      default: {},
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isMailSend: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("AllStudens", userSchema);

module.exports = User;
