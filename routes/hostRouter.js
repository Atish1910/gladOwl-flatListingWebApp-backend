const express = require("express");
const hostRouter = express.Router();
const hostController = require("../controllers/hostController");

// GET Routes
hostRouter.get("/signup", hostController.getSignup);
hostRouter.get("/login", hostController.getLogin);
hostRouter.get("/user-list", hostController.getAddUser);
hostRouter.get("/user-list-json", hostController.getAddUserJson);

// POST Routes
hostRouter.post("/signup", hostController.postSignup);
hostRouter.post("/login", hostController.postLogin);
hostRouter.get("/edit-signup/:id", hostController.getEditUser);
hostRouter.post("/edit-signup/:id", hostController.postEditUser);
hostRouter.get("/deleteUser/:id", hostController.deleteUser);

module.exports = hostRouter;
