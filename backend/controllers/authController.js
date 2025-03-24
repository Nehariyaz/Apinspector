
const crypto = require("crypto");
const { Op } = require("sequelize");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/emailService");
const { User } = require("../models");

const verifyCaptcha = async (captchaToken) => {
    try {
        const response = await axios.post(
            "https://www.google.com/recaptcha/api/siteverify",
            null,
            {
                params: {
                    secret: process.env.RECAPTCHA_SECRET_KEY,
                    response: captchaToken,
                },
            }
        );

        return response.data.success;
    } catch (error) {
        console.error("reCAPTCHA verification failed:", error);
        return false;
    }
};

// User Registration
exports.register = async (req, res) => {
    try {
        console.log("Incoming Request Body:", JSON.stringify(req.body, null, 2));
        
        const { username, email, password, captchaToken } = req.body;
        
        if (!req.body || Object.keys(req.body).length === 0) {
            console.log("this is empty req body");
            return res.status(400).json({ message: "Request body is missing or empty" });
        }

        if (!captchaToken || !(await verifyCaptcha(captchaToken))) {
            console.log("captcha verified");
            return res.status(403).json({ message: "reCAPTCHA failed, please try again" });
        }

        const userExist = await User.findOne({ where: { email } });
        
        if (userExist) {
            console.log("User exists");
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        //console.log("User body:",user.username,user.email);
        try {
            await sendEmail(email, "Welcome!", "Thank you for registering with us.");
        } catch (emailError) {
            console.error("Email Sending Error:", emailError);
            return res.status(500).json({ message: "User registered, but email failed to send" });
        }

        console.log("Hello");
        return res.status(201).json({ message: "User registered successfully" });
        
    } catch (err) {
        console.error("Registration Error:", err);
        return res.status(500).json({ message: "Error registering user", err }); // Added return
    }
};


// User Login
exports.login = async (req, res) => {
    try {
        const { email, password, captchaToken } = req.body;
        console.log(email,password,captchaToken);
        if (!captchaToken || !(await verifyCaptcha(captchaToken))) {
            //console.log("Login captcha failed")
            return res.status(403).json({ message: "reCAPTCHA failed, please try again" });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.log("User not found!");
            return res.status(404).json({ message: "User does not exist" });
        }


        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log("Password does not match!");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        user.otp = otp;
        user.otpExpires = Date.now() + 15 * 60 * 1000; // OTP valid for 15 mins
        await user.save();

        await sendEmail(user.email, "OTP Verification", `Your OTP is: ${otp}`);

    
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        
        return res.status(200).json({ message: "Login successful", token });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Login error" });
    }
};


// Verify OTP
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || user.otp !== otp || Date.now() > user.otpExpires) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // Clear OTP after successful verification
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "OTP verification failed" });
    }
};

// Resend OTP
exports.resendOtp = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpires = Date.now() + 15 * 60 * 1000; // 15 mins expiry
        await user.save();

        await sendEmail(user.email, "Resend OTP", `Your new OTP is: ${otp}`);

        res.status(200).json({ message: "OTP resent successfully" });
    } catch (error) {
        console.error("Error resending OTP:", error);
        res.status(500).json({ message: "Failed to resend OTP" });
    }
};


//Forgot Password
exports.forgotpassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Enter valid email" });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.log("User not found!");
            return res.status(404).json({ message: "User does not exist" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcrypt.hash(resetToken, 10);
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        await sendEmail(
            user.email,
            "Password Reset Request",
            `Hello ${user.username},\n\nClick the link below to reset your password: \n\n ${resetUrl} \n\n This link expires in 1 hour.`
        );

        return res.status(200).json({ message: "Password reset link sent to your email" });

    } catch (err) {
        console.error("Forgot Password Error:", err);
        res.status(500).json({ message: "Something went wrong, please try again later" });
    }
};


//resetPassword
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.body;
        console.log("Token from params:", req.params.token);
console.log("Full request params:", req.params);

        const { password } = req.body;

        console.log("Password from request:", password);
        console.log("Token from request:", token);


        const user = await User.findOne({
            where: {
                resetPasswordToken: { [Op.ne]: null },
                resetPasswordExpires: { [Op.gt]: Date.now() },
            },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
        if (!isTokenValid) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash new password and update user record
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        return res.status(200).json({ message: "Password successfully reset" });
    } catch (err) {
        console.error("Reset Password Error:", err);
        return res.status(500).json({ message: "Something went wrong, please try again later" });
    }
};


// User Logout
exports.logout = (req, res) => {
    res.clearCookie("token");

    if (req.headers["content-type"] === "application/json") {
        return res.status(200).json({ message: "Logout successful" });
    }

    res.redirect("/login");
};

exports.dashboard = async (req, res) => {
    if (req.headers["content-type"] === "application/json") {
        return res.status(200).json({ message: `Welcome ${req.user.username}` });
    }

    res.render("dashboard", { username: req.user.username });
};
