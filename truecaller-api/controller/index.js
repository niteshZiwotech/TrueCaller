const { phoneNumberSearchService, verifyOTPTrueCallerService, loginTrueCallerService, verifyInstallationService } = require("../services/truecaller");
const { error, success, CODES } = require("../utilities");

const login = async (request, reply, fastify) => {
  try {
    const result = await loginTrueCallerService(request, fastify);
    reply.status(200).send(success(result, 200, CODES.LOGIN));
  } catch (err) {
    reply.status(200).send(error(err.message, CODES.LOGIN, 200));
  }
};

const verifyOTP = async (request, reply, fastify) => {
  try {
    const result = await verifyOTPTrueCallerService(request, fastify);
    reply.status(200).send(success(result, 200, CODES.VERIFY_OTP));
  } catch (err) {
    reply.status(200).send(error(err.message, CODES.VERIFY_OTP, 200));
  }
};

const searchNumbers = async (request, reply, fastify) => {
  try {
    const result = await phoneNumberSearchService(request, fastify);
    reply.status(200).send(success(result, 200, CODES.SEARCH_NUMBERS));
  } catch (err) {
    reply.status(200).send(error(err.message, CODES.SEARCH_NUMBERS, 200));
  }
};
const verifyInstallation = async (request, reply, fastify) => {
  try {
    const result = await verifyInstallationService(request, fastify);
    reply.status(200).send(success(result, 200, CODES.VERIFY_INSTALLATION));
  } catch (err) {
    reply.status(200).send(error(err.message, CODES.VERIFY_INSTALLATION, 200));
  }
};

module.exports = {
  login,
  verifyOTP,
  searchNumbers,
  verifyInstallation
}