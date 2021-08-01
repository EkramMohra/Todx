const env = process.env.NODE_ENV || "production";

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
  
  development: {
    APIKey: "lQxV34GfT_OpCW1EbqkylA",
    APISecret: "ZYTx2FuHYwUz2l9KsUg7bdEyQJjjdWVtH1GR",
    PUSHER: {
      APP_ID : "1241840",
      KEY: "5b82386d16e4fe295409",
      SECRET: "612c2fa47c3d0774686c",
      CLUSTER: "eu"
    }
  },
  production: {
    APIKey: "lQxV34GfT_OpCW1EbqkylA",
    APISecret: "ZYTx2FuHYwUz2l9KsUg7bdEyQJjjdWVtH1GR",
    PUSHER: {
      APP_ID : "1241840",
      KEY: "5b82386d16e4fe295409",
      SECRET: "612c2fa47c3d0774686c",
      CLUSTER: "eu"
    }
  },

  

};

module.exports = config[env];