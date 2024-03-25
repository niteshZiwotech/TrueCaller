const truecallerjs = require("truecallerjs");

const loginTrueCallerService = async (request) => {
    const phoneNumber = request.body.mobile;
    const loginData = await truecallerjs.login(phoneNumber);

    if (loginData.status === 1 || loginData.status === 9) {
        // OTP sent successfully
        // Handle the response accordingly
        return loginData;
    } else if (loginData.status === 6 || loginData.status === 5) {
        // Verification attempts exceeded
        // Handle the response accordingly
        console.log("Message:", loginData.message);
        throw Error("Verification attempts exceeded", phoneNumber);
    } else {
        // Unknown response
        // Handle the response accordingly
        console.log("Status:", loginData?.status);
        console.log("Message:", loginData.message);
        throw Error(loginData.message || "Unknown response", phoneNumber);
    }
}

const verifyOTPTrueCallerService = async (request) => {
    const phoneNumber = request.body.mobile;
    const loginData = request.body.loginData;
    const otp = request.body.otp;
    const verifyOTPData = await truecallerjs.verifyOtp(
        phoneNumber,
        loginData,
        otp
    );

    if (verifyOTPData.status === 2 && !verifyOTPData.suspended) {
        // LOGIN SUCCESSFUL
        console.log("Login successful with phone number", phoneNumber);
        global.installationId = verifyOTPData.installationId
        return true;
    } else if (verifyOTPData.status === 11) {
        // INVALID OTP
        console.log("Message:", verifyOTPData.message, phoneNumber);
        throw Error("Invalid OTP");
    } else if (verifyOTPData.status === 7) {
        // RETRIES LIMIT EXCEEDED
        console.log("Message:", verifyOTPData.message, phoneNumber);
        throw Error("Retries limit exceeded");
    } else if (verifyOTPData.suspended) {
        // ACCOUNT SUSPENDED
        console.log("Message:", verifyOTPData.message, phoneNumber);
        throw Error("Account suspended");
    } else {
        // UNKNOWN RESPONSE
        console.log("Unknown response");
        console.log("Status:", verifyOTPData?.status);
        console.log("Message:", verifyOTPData.message, phoneNumber);
        throw Error(verifyOTPData.message || "Unknown response");
    }
}

const phoneNumberSearchService = async (request) => {
    const mobile = request.body.mobile;
    const installationId = global.installationId;
    const countryCode = request.body.countryCode;

    const response = await truecallerjs.bulkSearch(mobile, countryCode, installationId);
    return response.data;
}
const verifyInstallationService = async (request) => {
    if (!global?.installationId) {
        throw Error("Installation Id Not Found")
    }
    return true
}

module.exports = {
    phoneNumberSearchService,
    loginTrueCallerService,
    verifyOTPTrueCallerService,
    verifyInstallationService
};