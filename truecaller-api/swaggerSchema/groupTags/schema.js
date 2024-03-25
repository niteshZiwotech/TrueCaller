//! for every new route add a schema name you wish to group the api's on swagger
const TRUECALLER = {
  login: {
    schema: {
      tags: ["TRUECALLER"],
      description: "login with phone number",
      body: {
        type: "object",
        properties: {
          mobile: { type: "string" }
        },
        required: ["mobile"],
      },
    },
  },
  verifyOTP: {
    schema: {
      tags: ["TRUECALLER"],
      description: "verify your OTP",
      body: {
        type: "object",
        properties: {
          mobile: { type: "string" },
          loginData: { type: "object" },
          otp: { type: "string" },
        },
        required: ["mobile", "loginData", "otp"],
      },
    },
  },
  search: {
    schema: {
      tags: ["TRUECALLER"],
      description: "search phone number details",
      body: {
        type: "object",
        properties: {
          mobile: { type: "string" },
          countryCode: { type: "string" }
        },
        required: ["mobile", "countryCode"],
      },
    },
  },
  verifyInstallation: {
    schema: {
      tags: ["TRUECALLER"],
      description: "verify installation id is generated or not",
    },
  },
};

module.exports = {
  TRUECALLER
};
