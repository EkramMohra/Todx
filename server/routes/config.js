const env = process.env.NODE_ENV || "production";

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
  
  development: {
    APIKey: "Gk7wew4CTlebvSal0tt8vA",
    APISecret: "xlOBK8bLaBKq7TCWBH6HMQ1QFH7hNFhPUUFK",
    PUSHER: {
      APP_ID : "1241840",
      KEY: "5b82386d16e4fe295409",
      SECRET: "612c2fa47c3d0774686c",
      CLUSTER: "eu"
    }
  },
  production: {
    APIKey: "Gk7wew4CTlebvSal0tt8vA",
    APISecret: "xlOBK8bLaBKq7TCWBH6HMQ1QFH7hNFhPUUFK",
    PUSHER: {
      APP_ID : "1241840",
      KEY: "5b82386d16e4fe295409",
      SECRET: "612c2fa47c3d0774686c",
      CLUSTER: "eu"
    }
  },

  

};

module.exports = config[env];