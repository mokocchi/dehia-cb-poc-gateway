var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { errorResponse } = require('../utils')

const verify = async (token) => {
    //TODO: check cookie or something
    return token;
}

const traits = ["Brave", "Funny", "Peaceful", "Quiet", "Shy"];
const animals = ["Toucan", "Maned Wolf", "Capibara", "Jaguar", "Llama"];
const bools = [false];
const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);
const pairs = cartesian(traits, animals, bools);

console.log(pairs);

router.post('/login', (req, res) => {
    const { token } = req.body;
    verify(token).then((result => {
        if (result) {
            const accessToken = jwt.sign({
                name: "Some Name"
            }, process.env.JWT_SECRET, { expiresIn: "15m", algorithm: "HS256" });

            res.json({
                accessToken,
                expires_in: 900000
            });
        } else {
            errorResponse({ message: "Not a valid user" }, res, 400, "Invalid id_token", "Try again")
        }
    }
    )).catch(error => {
        console.log(error);
        errorResponse("Not a valid user", res, 400, "Invalid id_token", "Try again")
    });

});

module.exports = router;
