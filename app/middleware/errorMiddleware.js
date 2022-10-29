const errorHandler = (err, req, res, next) => {
    // console.log({ err })
    // console.log({ req })
    let statusCode;
    if (res.statusCode == 200) {
        statusCode = 500
    } else {
        statusCode = res.statusCode ? res.statusCode : 500
    }

    res.status(statusCode).json({
        isSuccess: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

module.exports = {
    errorHandler,
}