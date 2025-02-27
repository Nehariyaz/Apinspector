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

        //console.log("reCAPTCHA Verification Result:", response.data);
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
        console.log("Incoming Request Headers:", JSON.stringify(req.headers, null, 2));
        const { username, email, password, captchaToken } = req.body;

        /* function generateUsername(email) {
            const usernameBase = email.split("@")[0];
            const randomSuffix = Math.floor(1000 + Math.random() * 9000);
            return `${usernameBase}${randomSuffix}`;
        }

        const username = generateUsername(email); */
        //console.log("This is a token",captchaToken)
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body is missing or empty" });
        }

        if (!captchaToken || !(await verifyCaptcha(captchaToken))) {
            return res.status(400).json({ message: "reCAPTCHA failed, please try again" });
        }

        const userExist = await User.findOne({ where: { email } });

        if (userExist) {
            //console.log("User not found!");
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });

        try {
            await sendEmail(email, "Welcome!",username, "Thank you for registering with us.");
        } catch (emailError) {
            console.error("Email Sending Error:", emailError);
            return res.status(500).json({ message: "User registered, but email failed to send" });
        }

        //console.log("Hello");
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
        console.log(captchaToken)
        if (!captchaToken || !(await verifyCaptcha(captchaToken))) {
            //console.log("Faillll")
            return res.status(400).json({ message: "reCAPTCHA failed, please try again" });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            //console.log("User not found!");
            return res.status(400).json({ message: "User does not exist" });
        }

        //console.log("Stored Hashed Password:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log("Password does not match!");
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        await sendEmail(user.email, "Login Alert", user.username, "You have successfully logged in.");

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
