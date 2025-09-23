class Trade {
  constructor(instance) {
    this.instance = instance;
  }

  updateTradeBalance(data) {
    return new Promise((resolve, rejects) => {
      const callback = (error) => {
        if (error) {
          rejects(error);
        }
        this.instance.http.post(
          `/api/trade/balance`,
          JSON.stringify(data),
          (error, res, body) => {
            if (error) {
              console.log(error);
              rejects(error);
            }
            const answer = this.instance.http.parseBodyJSON(error, res, body);
            resolve(answer ? answer?.answer : answer);
          }
        );
      };
      return this.instance.auth.auth(callback);
    });
  }
}

module.exports = Trade;
