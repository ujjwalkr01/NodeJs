const express = require("express");

//we can create the routing and use in this way;-
const router = express.Router();

const getAllUsers = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not yet defined!" });
};
const createUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not yet defined!" });
};
const getUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not yet defined!" });
};
const updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not yet defined!" });
};
const deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not yet defined!" });
};

//we can also write the  http method in this wasy:-
router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
