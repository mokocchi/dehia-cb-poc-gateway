var express = require('express');
var router = express.Router();
var authenticateJWT = require('../middleware/authenticateJWT');
const { getApi, postApi, deleteApi } = require('../utils');
const apiAdapter = require('../utils/apiAdapter');
var API_PREFIX = process.env.API_PREFIX;
const api = apiAdapter(process.env.CB_POC_RESULTS_URL, true);

router.get(`${API_PREFIX}/results-status`, authenticateJWT, (req, res) => {
    getApi(api, req, res)
})

router.get(`${API_PREFIX}/results`, authenticateJWT, (req, res) => {
    getApi(api, req, res)
})


router.post(`${API_PREFIX}/circuit-breaker-switch`, authenticateJWT, (req, res) => {
    postApi(api, req, res)
})

router.delete(`${API_PREFIX}/circuit-breaker-switch`, authenticateJWT, (req, res) => {
    deleteApi(api, req, res)
})

router.get(`${API_PREFIX}/circuit-breaker-switch`, authenticateJWT, (req, res) => {
    getApi(api, req, res)
})

module.exports = router;