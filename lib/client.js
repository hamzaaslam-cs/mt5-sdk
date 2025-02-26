

class Client {
    constructor(instance) {
        this.instance = instance
    }

    create(client) {
        return new Promise((resolve, rejects) => {
            const callback = (error) => {
                if (error) {
                    rejects(error);
                }
                this.instance.http.post(`/api/client/add`,JSON.stringify(client), (error, res, body) => {
                    if (error) {
                        console.log(error);
                        rejects(error);
                    }
                    const answer = this.instance.http.parseBodyJSON(error, res, body);
                    resolve(answer ? answer?.answer : answer)
                });
            }
            return this.instance.auth.auth(callback)
        })
    }

    addUser(data){
        return new Promise((resolve, rejects) => {
            const callback = (error) => {
                if (error) {
                    rejects(error);
                }
                this.instance.http.post(`/api/client/user/add`,JSON.stringify(data), (error, res, body) => {
                    if (error) {
                        console.log(error);
                        rejects(error);
                    }
                    const answer = this.instance.http.parseBodyJSON(error, res, body);
                    console.log(answer);
                    resolve(answer ? answer?.answer : answer)
                });
            }
            return this.instance.auth.auth(callback)
        })
    }




}

module.exports = Client;
