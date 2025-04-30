let generatedOTP = ""; // Temporary storage for OTP

  exports.sendMockOTP = async (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required" });
    }
    generatedOTP = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
    console.log(`OTP for ${phoneNumber}: ${generatedOTP}`); // Log OTP to console
    res.status(200).json({ message: "Mock OTP generated. Check the console for the OTP.", otp: generatedOTP });
  };

  exports.verifyMockOTP = async (req, res) => {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: "OTP code is required" });
    }
    if (code === generatedOTP) {
      generatedOTP = ""; // Clear OTP after verification
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  };