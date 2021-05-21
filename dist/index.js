"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const post_1 = __importDefault(require("./routes/post"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const pass_1 = __importDefault(require("./routes/pass"));
const categoria_1 = __importDefault(require("./routes/categoria"));
const server = new server_1.default();
// Body parser - Middleware - lo prepara como js facil de utilizar
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// Configurar CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
// Rutas de mi app - Middleware
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_1.default);
server.app.use('/obt', pass_1.default);
server.app.use('/categoria', categoria_1.default);
// server.app.use('/buscar', buscarRoutes );
// Conectar DB
mongoose_1.default.connect('mongodb://localhost:27017/adminkey', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err)
        throw err;
    console.log('Base de datos ONLINE');
});
// Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
