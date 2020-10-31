const axios = require("axios");

module.exports.getCoin = (req, res, next) => {
  axios
    .get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
    .then((result) => {
      res.status(201).json(result.data)
    })
    .catch((err) => {
      console.log(err);
    });
};
