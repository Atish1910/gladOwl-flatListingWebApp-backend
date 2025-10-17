const User = require("../models/user");

exports.getIndex = (req, res, next) => {
  User.find().then(() => {
    res.render("index");
  });
};
