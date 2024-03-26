const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  test,
  register,
  login,
  profile,
  display,
  firstTimeQ,
  updateQR,
  defaultAdmin,
  Logout,
  retrieveCustomQ,
  updateCQForm,
  updateDuesPaid,
  checkPaid,
  updateAnswers,
  displayCustomQ,
  deleteCustomQ,
  lendUser,
  takeGeneral,
  findDuesPayingMembers,
  passwordResetRequest,
} = require("../Controllers/controllers.js");
const { stripeEP } = require("../Controllers/stripe.js");

router.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:3003",
      "http://localhost:8000",
      "http://localhost:8001",
      "http://localhost:8002",
    ],

    function(origin, callback) {
      // Check if the origin is allowed or if it's a preflight request (OPTIONS)
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.startsWith("http://localhost:") ||
        origin.startsWith("https://localhost:")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
      callback(null, true);
    },
  })
);
// router.get("/", test);
router.post("/register", register);
router.post("/login", login);
router.get("/profile", profile);
router.get("/member/details", display);
router.get("/one-time-signup-server", firstTimeQ);
router.get("/updateQR", updateQR);
router.get("/admin/default", defaultAdmin);
router.get("/logout", Logout);
router.get("/display-custom-questions", displayCustomQ);
router.get("/custom-questions", retrieveCustomQ);
router.get("/update-answers", updateAnswers);
router.get("/remove-question", deleteCustomQ);
router.get("/update-custom-questions", updateCQForm);
router.get("/checkout-session", stripeEP);
router.get("/paid-dues", updateDuesPaid);
router.get("/paid-dues-check", checkPaid);
router.get("/lend-user", lendUser);
router.get("/take-general", takeGeneral);
router.get("/paying-dues-members", findDuesPayingMembers);
router.post("/password-reset-request", passwordResetRequest);
// router.post("/reset-password", resetPassword);
module.exports = router;
