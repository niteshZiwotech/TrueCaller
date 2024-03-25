const ERROR_CODES = {
    INVALID_INPUT: "INVALID_INPUT",
    SERVER_ERROR: "SERVER_ERROR",
    AUTH_ERROR: "AUTH_ERROR",
    INVALID_TOKEN: "INVALID_TOKEN",
};

const CODES = {
    LOGIN: "LOGIN",
    VERIFY_OTP: "VERIFY OTP",
    SEARCH_NUMBERS: "SEARCH NUMBERS",
    VERIFY_INSTALLATION: "VERIFY INSTALLATION"
}

const success = (result, status, code) => {
    return {
        success: true,
        status: status,
        result: result,
        error: {
            code: code,
            message: null,
        },
    };
};

const error = (message, errorCode, status) => {
    return {
        success: false,
        status: status,
        result: null,
        error: {
            code: errorCode,
            message: message || "Internal Server Error",
        },
    };
};

module.exports = {
    ERROR_CODES,
    CODES,
    success,
    error
}