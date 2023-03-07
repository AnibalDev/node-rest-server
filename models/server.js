const express = require('express');
const cors = require('cors')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Middlewares
        this.middlewares();
        // App Routes
        this.routes();

    }
    middlewares() {
        // CORS
        this.app.use(cors());
        // Read and parse Body
        this.app.use(express.json ());
        // Public dir
        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server runing in ', this.port);
        });
    }
}
module.exports = Server;