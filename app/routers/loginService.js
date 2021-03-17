var express = require('express');
var AsyncLock = require('async-lock');
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
const f = (a, b) => [].concat(...a.map(d => b.map(e => `${d} ${e}`)));
const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);
let free = cartesian(traits, animals);
let taken = [];

const purgeTaken = _ => {
    const released = taken.filter(x => x[1] > ((new Date()).getMilliseconds() + 900000)).map(x => x[0]);
    taken = taken.filter(x => x[1] < ((new Date()).getMilliseconds() + 900000));
    free.concat(released);
}

router.post('/login', (req, res) => {
    const { token } = req.body;
    verify(token).then((result => {

        if (result) {
            const lock = new AsyncLock();
            lock.acquire("names", (done) => {

                purgeTaken();

                if (free.length === 0) {
                    errorResponse({ message: "All seats taken!" }, res, 400, "All seats taken! (max users reached)", "All seats taken!")
                }
                const idx = Math.round(Math.random() * free.length);
                const take = free[idx];
                free = free.filter((item, index) => index != idx);
                taken.push([take, (new Date()).getMilliseconds()]);

                done(null, take);
            }).then(take => {
                const accessToken = jwt.sign({
                    name: take
                }, process.env.JWT_FRONT_SECRET, { expiresIn: "15m", algorithm: "HS256" });

                res.json({
                    accessToken,
                    expires_in: 900000
                }).catch(error => {
                    errorResponse({ message: "Not a valid user" }, res, 400, "Invalid login information", "Try again")
                });
            }
    } else {
            errorResponse({ message: "Not a valid user" }, res, 400, "Invalid login information", "Try again")
        }
    )).catch(error => {
            console.log(error);
            errorResponse("Not a valid user", res, 400, "Invalid login information", "Try again")
        });

});

module.exports = router;
