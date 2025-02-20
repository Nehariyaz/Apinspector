const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/emailService");
const { User } = require("../models");

// Function to verify reCAPTCHA
const verifyCaptcha = async (captchaToken) => {
    try {
        const response = await axios.post(
            "https://www.google.com/recaptcha/api/siteverify",
            null,
            {
                params: {
                    secret: process.env.RECAPTCHA_SECRET_KEY,  // Use the Secret Key from .env
                    response: captchaToken,
                },
            }
        );

        console.log("reCAPTCHA Verification Result:", response.data);
        return response.data.success;
    } catch (error) {
        console.error("reCAPTCHA verification failed:", error);
        return false;
    }
};

// User Registration
exports.register = async (req, res) => {
    try {
        console.log("Incoming Request Body:", req.body); //debugging
        const { username, email, password, "g-recaptcha-response": captchaToken } = req.body;

        if (!captchaToken || !(await verifyCaptcha(captchaToken))) {
            return res.status(400).json({ message: "reCAPTCHA failed, please try again" });
        }

        // 🔒 Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });

        // 📧 Send welcome email
        await sendEmail(email, "Welcome!", "Thank you for registering with us.");

        return res.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ message: "Error registering user" });
    }
};

// User Login
exports.login = async (req, res) => {
    try {
        const { username, password, "g-recaptcha-response": captchaToken } = req.body;

        // ✅ Check if reCAPTCHA is provided and valid
        if (!captchaToken || !(await verifyCaptcha(captchaToken))) {
            return res.status(400).json({ message: "reCAPTCHA failed, please try again" });
        }

        // 🔍 Find user in database
        const user = await User.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 🔑 Generate JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // 📧 Send login notification email
        await sendEmail(user.email, "Login Alert", "You have successfully logged in.");

        return res.status(200).json({ message: "Login successful", token });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Login error" });
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

// Dashboard
exports.dashboard = async (req, res) => {
    if (req.headers["content-type"] === "application/json") {
        return res.status(200).json({ message: `Welcome ${req.user.username}` });
    }

    res.render("dashboard", { username: req.user.username });
};
