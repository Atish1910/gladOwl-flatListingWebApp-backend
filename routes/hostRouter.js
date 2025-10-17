const express = require("express");
const hostRouter = express.Router();

const hostController = require("../controllers/hostController");

hostRouter.post("/add-user", hostController.postAddUser);
hostRouter.get("/user-list", hostController.getAddUser);
hostRouter.get("/user-list-json", hostController.getAddUserJson);
hostRouter.post("/login-user", hostController.postLogin);
hostRouter.get("/login", hostController.getLogin);

module.exports = hostRouter;
