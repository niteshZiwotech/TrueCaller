const { login, verifyOTP, searchNumbers, verifyInstallation } = require("../controller");
const { TRUECALLER } = require("../swaggerSchema/groupTags/schema");

module.exports = async function (fastify, opts) {
    fastify.post("/login", {
        schema: TRUECALLER.login.schema,
        handler: (request, reply) => login(request, reply, fastify)
    });
    fastify.post("/verifyOTP", {
        schema: TRUECALLER.verifyOTP.schema,
        handler: (request, reply) => verifyOTP(request, reply, fastify)
    });
    fastify.post("/search", {
        schema: TRUECALLER.search.schema,
        handler: (request, reply) => searchNumbers(request, reply, fastify),
    });
    fastify.post("/verifyInstallation", {
        schema: TRUECALLER.verifyInstallation.schema,
        handler: (request, reply) => verifyInstallation(request, reply, fastify),
    });
}