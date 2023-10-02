const express = require("express");

const userController = require("./../controllers/userController");
//we can create the routing and use in this way;-
const router = express.Router();

//we can also write the  http method in this wasy:-
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
