const axios= require("axios")
const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {register,login,forgotpassword,resetPassword,logout,dashboard,verifyOtp,resendOtp} = require("../controllers/authController");
const router = express.Router();


router.post("/register", register);
router.post("/forgot-password",forgotpassword);
router.post("/reset-password/:token", resetPassword);
router.post("/login", login);
router.get("/logout", logout);
router.get("/dashboard", authMiddleware, dashboard);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);


router.post("/api/register", async (req, res) => {
    try {
        const { email, password, captchaToken } = req.body;
        
        if (!email || !password || !captchaToken) {
            return res.status(400).json({ message: "Request body is missing or empty" });
        }

        // Let register() handle the success/error responses
        await register(req, res);
        
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({ message: "Server error during registration" });
        }
    }
});

router.post("/api/forgotpassword", (req,res) => {
    forgotpassword(req,res);
});



router.post("/api/reset-password", (req, res) => {
    resetPassword(req, res);
});


router.post("/api/login", (req, res) => {
    login(req, res);
});

router.post("/api/logout", logout);


module.exports = router;
