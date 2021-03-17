const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { errorResponse } = require('../utils')
const tokens = {};
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_FRONT_SECRET, (err, user) => {
            if (err) {
                console.log(err);
                errorResponse(err, res, 403, "Invalid token", "Forbidden")
                return
            }
            const now = new Date();
            if (user.exp < (now.getTime() / 1000)) {
                errorResponse(new Error(`Token expired for user ${user.name}`), res, 403, "Token expired", "Please login again");
            } else {
                req.user = user;
                if (!tokens[token]) {
                   const internal_token = jwt.sign({
                        name: user.name
                    }, process.env.JWT_SECRET, { expiresIn: "15m", algorithm: "HS256" });
                    req.headers["authorization"] = `Bearer ${internal_token}`;
                    tokens[token] = internal_token;
                } else {
                    const internal_token = tokens[token];
                    req.headers["authorization"] = `Bearer ${internal_token}`;
                }
                next();
            }
        });
    } else {
        errorResponse(new Error("Unauthorized"), res, 401, "Auth header missing", "Unauthorized")
    }
};

module.exports = authenticateJWT;