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
    email: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    societyName: {
      type: String,
      trim: true,
    },
    area: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    postalCode: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true } // auto adds createdAt & updatedAt
);

const User = mongoose.model("User", userSchema);

module.exports = User;
