var express = require('express');
var router = express.Router();
var authenticateJWT = require('../middleware/authenticateJWT');
var { getApi, postApi, deleteApi } = require("../utils")
var apiAdapter = require("../utils/apiAdapter")
var API_PREFIX = process.env.API_PREFIX
const api = apiAdapter(process.env.CB_POC_COLLECT_URL, true);

router.get(`${API_PREFIX}/collect-status`, authenticateJWT, (req, res) => {
  getApi(api, req, res)
})

router.post(`${API_PREFIX}/switch`, authenticateJWT, (req, res) => {
  postApi(api, req, res)
})

router.delete(`${API_PREFIX}/switch`, authenticateJWT, (req, res) => {
  deleteApi(api, req, res)
})

module.exports = router;