const axios = require("axios");

module.exports.getCoinDay = (req, res, next) => {
  axios
    .get("https://api.lunarcrush.com/v2?/data=coinoftheday_info&key=z9x4zew4vlovhujy6rsc2")
    .then((result) => {
        console.log(result.data)
    //   res.status(201).json(result.data)
    })
    .catch((err) => {
      console.log(err);
    });
};
