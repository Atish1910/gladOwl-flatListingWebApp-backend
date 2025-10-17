const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.getAddNewUser = async (req, res, next) => {
  try {
    await User.find().then((registerUser) => {
      res.json({
        registerUser: registerUser,
      });
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error getAddNewUser: " });
  }
};

exports.postAddNewUser = async (req, res, next) => {
  try {
    const { fullName, phoneNo, password, role } = req.body;

    if (!fullName || !phoneNo || !password || !role) {
      return res
        .status(400)
        .json({ message: "All field should filled properly" });
    }

    const existingUser = await User.findOne({ phoneNo });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "this user is already exist with same mobile No" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      phoneNo,
      role,
      password: hashedPassword,
    });

    await user.save();
    console.log("User Create Sucessfully");
    res.redirect("/user-list");

    // ======================//
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Internal Server Error", error);
  }
};
