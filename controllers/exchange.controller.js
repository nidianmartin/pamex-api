const axios = require("axios");

module.exports.getExchange = (req, res, next) => {
  axios
    .get(
      "https://api.coingecko.com/api/v3/exchanges"
    )
    .then((result) => {
      res.status(201).json(result.data)
    })
    .catch((err) => {
      console.log(err);
    });
};
