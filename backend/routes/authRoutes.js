const axios= require("axios")
const express = require("express");
//const { register, login, logout, dashboard, forgotpassword, resetPassword  } = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {register,login,forgotpassword,resetPassword,logout,dashboard,verifyOtp,resendOtp} = require("../controllers/authController");
const router = express.Router();

//console.log("Register function:", register);

// router.get("/login", (req, res) => res.render("login",{message:null}));
// router.get("/register", (req, res) => res.render("register"));
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
        console.log("Incoming request:", req.body); 

        const { email, password, captchaToken } = req.body;
        register(req,res)

        if (!email || !password || !captchaToken) {
            console.log("Missing required fields.");
            return res.status(400).json({ message: "Missing required fields." });
        }
    } catch (error) {
        console.error("Register API Error:", error);
        res.status(500).json({ message: "Server error during registration" });
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
