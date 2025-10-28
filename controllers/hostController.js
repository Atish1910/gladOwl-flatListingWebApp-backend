const User = require("../models/user");
const bcrypt = require("bcrypt");

// ✅ GET user list page
exports.getAddUser = async (req, res) => {
  try {
    const registeredUsers = await User.find();
    res.render("user-list", { registereUsers: registeredUsers });
  } catch (error) {
    console.error("Internal Server Error:getAddUser", error);
    res.status(500).json({ message: "Internal Server Error getAddUser" });
  }
};

// ✅ GET user list JSON
exports.getAddUserJson = async (req, res) => {
  try {
    const registeredUsers = await User.find();
    res.json({ registereUsers: registeredUsers });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error getAddUserJson" });
  }
};

// ✅ POST Signup
exports.postSignup = async (req, res) => {
  try {
    const {
      fullName,
      phoneNo,
      password,
      role,
      email,
      image,
      societyName,
      area,
      state,
      city,
      postalCode,
    } = req.body;

    if (!fullName || !phoneNo || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ phoneNo });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this phone number already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName: fullName.trim(),
      phoneNo: phoneNo.trim(),
      role,
      password: hashedPassword,
      email,
      image,
      societyName,
      area,
      state,
      city,
      postalCode,
    });

    await user.save();
    console.log("✅ User created successfully:", user);

    // ✅ redirect correctly
    res.redirect("/host/user-list");
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ GET Signup page
exports.getSignup = (req, res) => {
  res.render("host/signup");
};

// ✅ GET Login page
exports.getLogin = (req, res) => {
  res.render("host/login");
};

// ✅ POST Login
exports.postLogin = async (req, res) => {
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

    console.log("✅ Login successful for:", user.fullName);
    res.redirect("/host/user-list");
  } catch (error) {
    console.error("PostLogin Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getEditUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("host/edit-signup", { user });
  } catch (error) {
    console.error("Error loading edit page:", error);
    res.status(500).send("Server Error");
  }
};

exports.postEditUser = async (req, res) => {
  try {
    const {
      fullName,
      phoneNo,
      image,
      societyName,
      area,
      state,
      city,
      postalCode,
    } = req.body;

    // Update user first
    await User.findByIdAndUpdate(
      req.params.id,
      {
        fullName: fullName || "NA",
        phoneNo: phoneNo || "NA",
        image: image || "NA",
        societyName: societyName || "NA",
        area: area || "NA",
        state: state || "NA",
        city: city || "NA",
        postalCode: postalCode || "NA",
      },
      { new: true }
    );

    console.log("✅ User updated successfully");

    // ✅ Redirect to user list after successful update
    res.redirect("/host/user-list");
  } catch (error) {
    console.error("❌ Internal Server Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await User.findByIdAndDelete(userId);

    console.log("User deleted successfully:", userId);

    // Redirect to the user list after deletion
    res.redirect("/host/user-list");
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    res.status(500).send("Internal Server Error while deleting user");
  }
};
