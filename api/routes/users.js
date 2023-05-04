const express = require("express");
const {
  createUser,
  deleteUser,
  updateUser,
  getUser,
  getUsers,
} = require("../controllers/user");
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");
const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("hello user , you are logged in ");
// });
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user , you are logged in  and can delete your account");
// });
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello admin , you are logged in  and can delete all account");
// });

router.route("/").post(createUser).get(verifyAdmin, getUsers);
router
  .route("/:id")
  .get(verifyUser, getUser)
  .delete(verifyUser, deleteUser)
  .put(verifyUser, updateUser);

module.exports = router;
