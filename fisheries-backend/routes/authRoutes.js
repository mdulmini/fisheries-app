const express = require("express");
     const router = express.Router();
     const { sendMockOTP, verifyMockOTP } = require("../controllers/authController");

     router.post("/send-otp", sendMockOTP);
     router.post("/verify-otp", verifyMockOTP);

     module.exports = router;