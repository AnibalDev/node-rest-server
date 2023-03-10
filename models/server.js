const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Database Connection
        this.connectDB();
        // Middlewares
        this.middlewares();
        // App Routes
        this.routes();

    }

    async connectDB() {
        await dbConnection();
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
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.authPath, require('../routes/auth'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server runing in ', this.port);
        });
    }
}
module.exports = Server;