export default class CoinGecko {
  static async query(endpoint, filter) {
    const params = filter
      ? new URLSearchParams({
          ...filter,
        })
      : "";
    const resp = await fetch(
      "https://api.coingecko.com/api/v3/" +
        endpoint +
        (params.toString() !== "" ? "?" + params.toString() : ""),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const json = await resp.json();

    return json;
  }
}
