const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure the User model is correctly imported

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send("Access Denied");
        }

        const decode = jwt.verify(token, "secret");

        req.userId = decode.userId; // Attach userId to req

        // Fetch user email from the database using userId
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        req.email = user.email; // Attach email to req
        next();
    } catch (err) {
        console.error(err.message);
        res.status(400).send("Invalid Token");
    }
};

module.exports = { auth };
