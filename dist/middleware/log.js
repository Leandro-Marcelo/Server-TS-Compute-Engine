"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMiddleware = void 0;
// El log nos va a servir por si quieres estar vigilando la cantidad de peticiones, las ips, el navegador que estan utilizando, o cuales son los datos que se estan enviando o el usuario, etc etc. Todas esas cosas nos la provee el Request.
const logMiddleware = (req, res, next) => {
    const header = req.headers;
    // Cual es el navegador que la persona esta utilizando
    const userAgent = header["user-agent"];
    console.log("user-agent", userAgent);
    next();
};
exports.logMiddleware = logMiddleware;
