const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "first Name is Required"],
      trim: true,
    },
    phoneNo: {
      type: String,
      required: [true, "Phone No is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is Required"],
    },
    role: {
      type: String,
      enum: ["Watchmen", "Chairmen", "Agent"],
      default: "Agent",
    },
  },
  { timestamps: true } // auto adds createdAt & updatedAt
);

const User = mongoose.model("User", userSchema);

module.exports = User;
