const https = require("https");
const crypto = require('crypto');

const Auth = require('./lib/auth')
const Http = require('./lib/http')
const Users = require('./lib/users')
const Clients = require('./lib/client')

class Metatrader {
    constructor(server, port, authOption) {
        this.server = server;
        this.port = port;
        this.authOption = authOption
        this.https = new https.Agent();
        this.https.maxSockets = 1;
        this.auth = new Auth(this);
        this.http = new Http(this);
        this.users = new Users(this);
        this.clients = new Clients(this);

    }

}

module.exports = Metatrader
