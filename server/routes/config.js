const env = process.env.NODE_ENV || "production";

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
  development: {
    APIKey: "Gk7wew4CTlebvSal0tt8vA",
    APISecret: "xlOBK8bLaBKq7TCWBH6HMQ1QFH7hNFhPUUFK",
  },
  production: {
    APIKey: "Gk7wew4CTlebvSal0tt8vA",
    APISecret: "xlOBK8bLaBKq7TCWBH6HMQ1QFH7hNFhPUUFK",
  },
};

module.exports = config[env];
