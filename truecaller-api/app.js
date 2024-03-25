require("dotenv").config();

const path = require("path");
const AutoLoad = require("@fastify/autoload");
const fastifySwaggerUi = require("@fastify/swagger-ui");
const fastifySwagger = require("@fastify/swagger");

module.exports = async function (fastify, opts) {

    fastify.register(require("@fastify/compress"), {
        global: false,
    });

    fastify.addHook("preHandler", (request, reply, done) => {
        if (request.method === "OPTIONS") {
            reply.code(200).send();
        }
        done();
    });

    fastify.addHook("onRequest", (request, reply, done) => {
        // Record the request start time in nanoseconds
        request.startTime = process.hrtime.bigint();
        done();
    });

    fastify.register(fastifySwagger, {
        routePrefix: "/documentation",
        swagger: {
            info: {
                title: "Truecaller API",
                description: "API documentation for my Fastify application",
                version: "1.0.0",
            },
        },
        exposeRoute: true, // This creates a route for serving the Swagger JSON
    });

    fastify.register(fastifySwaggerUi, {
        title: "API Documentation",
        swagger: "/documentation/json", // Route to your Swagger JSON
    });

    fastify.register(require("@fastify/cors"), (instance) => {
        return (req, callback) => {
            const corsOptions = {
                // This is NOT recommended for production as it enables reflection exploits
                origin: true,
            };
            //TODO: for production set to false
            if (/^localhost$/m.test(req.headers.origin)) {
                corsOptions.origin = true;
            }

            // callback expects two parameters: error and options
            callback(null, corsOptions);
        };
    });

    fastify.register(AutoLoad, {
        dir: path.join(__dirname, "plugins"),
        options: Object.assign({}, opts),
    });

    fastify.register(AutoLoad, {
        dir: path.join(__dirname, "routes"),
        options: Object.assign({}, opts),
    });
    console.log("Connection Okk");
}