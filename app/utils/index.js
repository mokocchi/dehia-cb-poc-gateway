const errorResponse = (error, res, status_code, dev_message, user_message) => {
    console.log(error.message || error)
    res.status(status_code).send({
        status: status_code,
        developer_message: dev_message,
        user_message: user_message,
        error_code: 1,
        more_info: "/api/doc"
    })
}

const getApi = (api, req, res) => {
    let headers = { authorization: req.headers["authorization"] }
    api.get(req.url, { headers: headers }).then(resp => {
        console.log("Status: " + resp.status)
        res.status(resp.status).send(resp.data)
    }).catch(error => {
        if (error.response) {
            console.log("Status: " + error.response.status)
            res.status(error.response.status).send(error.response.data)
        } else {
            console.log("Status: 503")
            errorResponse(error, res, 503, "Service unavailable", "Service unavailable")
        }
    })
}

const postApi = (api, req, res, timeout = 5000) => {
    let headers = { authorization: req.headers["authorization"] }
    let body = req.body
    api.post(req.path, body, { headers: headers, timeout: timeout }).then(resp => {
        console.log("Status: " + resp.status)
        res.status(resp.status).send(resp.data)
    }).catch(error => {
        if (error.response) {
            console.log("Status: " + error.response.status)
            res.status(error.response.status).send(error.response.data)
        } else {
            console.log("Status: 503")
            errorResponse(error, res, 503, "Service unavailable", "Service unavailable")
        }
    })
}

const deleteApi = (api, req, res) => {
    let headers = { authorization: req.headers["authorization"] }
    api.delete(req.path, { headers: headers }).then(resp => {
        console.log("Status: " + resp.status)
        res.status(resp.status).send(resp.data)
    }).catch(error => {
        if (error.response) {
            console.log("Status: " + error.response.status)
            res.status(error.response.status).send(error.response.data)
        } else {
            console.log("Status: 503")
            errorResponse(error, res, 503, "Service unavailable", "Service unavailable")
        }
    })
}

module.exports = {
    getApi,
    postApi,
    deleteApi,
    errorResponse
}