import CoinGecko from "../services/CoinGecko.js";

export default class MarketChart {
  constructor(json) {
    this.timestamp = json.id;
    this.price = json.name;
  }

  static async find(token, vs_currency, days, interval) {
    const data = await CoinGecko.query("coins/" + token + "/market_chart", {
      vs_currency,
      days,
      interval,
    });
    return data.prices;
  }
}
