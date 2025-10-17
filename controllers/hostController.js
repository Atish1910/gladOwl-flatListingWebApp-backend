const User = require("../models/user");
const bcrypt = require("bcrypt");

// GET List of users
exports.getAddUser = async (req, res, next) => {
  try {
    await User.find().then((registereUsers) => {
      res.render("user-list", {
        registereUsers: registereUsers,
      });
    });
  } catch (error) {
    console.error("Internal Server Error:getAddUser", error);
    res.status(500).json({ message: "Internal Server Error getAddUser" });
  }
};

exports.getAddUserJson = async (req, res, next) => {
  await User.find().then((registereUsers) => {
    res.json({
      registereUsers: registereUsers,
    });
  });
};

// POST Signup
exports.postAddUser = async (req, res, next) => {
  try {
    const { fullName, phoneNo, password, role } = req.body;

    if (!fullName || !phoneNo || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ phoneNo });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this phone number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully");

    const user = new User({
      fullName: fullName.trim(),
      phoneNo: phoneNo.trim(),
      role,
      password: hashedPassword,
    });

    await user.save();
    console.log("User created successfully:", user.fullName);

    res.redirect("/user-list");
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET Login
exports.getLogin = (req, res, next) => {
  User.find().then(() => {
    res.render("host/login");
  });
};

// POST Login
exports.postLogin = async (req, res, next) => {
  try {
    const { phoneNo, password } = req.body;

    if (!phoneNo || !password) {
      return res
        .status(400)
        .json({ message: "Phone number and password are required" });
    }

    const user = await User.findOne({ phoneNo });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    console.log(" Login successful for:", user.fullName);
    res.redirect("/user-list");
  } catch (error) {
    console.error("PostLogin Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
