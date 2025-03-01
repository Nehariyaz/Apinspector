const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = req.cookies.token || (authHeader && authHeader.split(" ")[1]);
    const captchaToken = req.body.captchaToken || req.query.captchaToken;

    if (!captchaToken) {
        return res.status(400).json({ message: "CAPTCHA verification failed" });
    }
        
    try {
        // Verify reCAPTCHA with Google API
        const captchaVerifyURL = `https://www.google.com/recaptcha/api/siteverify`;
        const response = await axios.post(captchaVerifyURL, null, {
            params: {
                secret: process.env.RECAPTCHA_SECRET_KEY, // Secret key from .env
                response: captchaToken,
            },
        });

        if (!response.data.success) {
            return res.status(400).json({ message: "CAPTCHA validation failed" });
        }

        // Proceed with token authentication
        if (!token) {
            return res.status(401).json({ message: "Access Denied: No Token" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid Token" });
            }
            req.user = user;
            next();
        });

    } catch (error) {
        console.error("Error verifying reCAPTCHA:", error);
        return res.status(500).json({ message: "Server error during CAPTCHA verification" });
    }
};

module.exports = { authenticateToken };

    // if (!token) {
    //     if (req.headers["content-type"] === "application/json") {
    //         return res.status(401).json({ message: "Access Denied" });
    //     }
    //     return res.redirect("/login");
    // }

    // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //     if (err) {
    //         if (req.headers["content-type"] === "application/json") {
    //             return res.status(403).json({ message: "Invalid Token" });
    //         }
    //         return res.redirect("/login");
    //     }
    //     req.user = user;
    //     next();
    // });
//};

//module.exports = { authenticateToken };
