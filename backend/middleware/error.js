import ErrorHandler from "../utils/ErrorHandler.js";

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";

    // wrong mongodb id error
    if (err.name === "CastError") {
        const message = `Resources not found with this id.. invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    // wrong jwt error
    if (err.name === "JsonWebTokenError") {
        const message = `Your url is invalid please try again laster`;
        err = new ErrorHandler(message, 400);
    }

    // jwt expired
    if (err.name === "TokenExpiredError") {
        const message = `Your url is expired please try again later`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
