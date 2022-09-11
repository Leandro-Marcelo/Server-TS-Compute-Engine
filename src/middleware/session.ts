import { NextFunction, Response } from "express";
import { RequestExt } from "../interfaces/req-ext";
import { verifyToken } from "../utils/jwt.handle";

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        // return Bearer adoksodkadkas
        const jwtByUser = req.headers.authorization || "";
        // get token adoksodkadkas
        const jwt = jwtByUser.split(" ").pop();
        // aquí TypeScript se queja porque dice que jwt puede ser undefined, podemos atacar este problema de tipeo en la función verifyToken, para que no se queje, y que sepa que siempre va a recibir un string.
        // pero en este caso lo vamos a manejar acá y es simplemente en vez de pasarle simplemente jwt, le pasamos `${jwt}`
        // este verifyToken puede retornar un string | JwtPayload y req.user solamente acepta JwtPayload | { id: string; } | undefined. Por lo tanto, debemos decirle a fuerza de que este verifyToken va a retornar si o si un {id:string}
        const isUser = verifyToken(`${jwt}`) as { id: string };
        if (!isUser) {
            res.status(401);
            res.send("NO_TIENES_UN_JWT_VALIDO");
        } else {
            req.user = isUser;
            next();
        }
    } catch (e) {
        console.log({ e });
        res.status(400);
        res.send("SESSION_NO_VALIDAD");
    }
};

export { checkJwt };
