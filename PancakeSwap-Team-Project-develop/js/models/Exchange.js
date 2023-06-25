import CoinGecko from "../services/CoinGecko.js";

export default class Exchange {
  constructor(json) {
    this.id = json.id;
    this.name = json.name;
    this.year_established = json.year_established;
    this.country = json.country;
    this.description = json.description;
    this.url = json.url;
    this.image = json.image;
    this.has_trading_incentive = json.has_trading_incentive;
    this.trust_score = json.trust_score;
    this.trust_score_rank = json.trust_score_rank;
    this.trade_volume_24h_btc = json.trade_volume_24h_btc;
    this.trade_volume_24h_btc_normalized = json.trade_volume_24h_btc_normalized;
  }

  static async find(filter = null) {
    const data = await CoinGecko.query("exchanges", filter);
    return data;
  }
}
