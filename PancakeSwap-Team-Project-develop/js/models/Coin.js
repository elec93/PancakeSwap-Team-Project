import CoinGecko from "../services/CoinGecko.js";

export default class Coin {
  constructor(json) {
    this.id = json.id;
    this.symbol = json.symbol;
    this.name = json.name;
  }

  static async find() {
    const data = await CoinGecko.query("coins/list");
    return data.map((el) => new Coin(el));
  }

  image = async () => {
    const data = await CoinGecko.query(`coins/${this.id}`);
    return data.image.large;
  };
}
