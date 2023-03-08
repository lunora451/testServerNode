const envalid = require("envalid");
const validator = require("envalid/dist/validators");

const env = envalid.cleanEnv(process.env, {
  MONGO_URI: validator.str(),
  PORT: validator.port(),
});

module.exports = env;
