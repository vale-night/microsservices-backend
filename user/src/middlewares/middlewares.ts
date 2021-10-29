import { Request, Response } from "express";
import { invokeService } from "../services/gatewayCommunicationService";

//Por enquanto, apenas iremos checar se o token está presente na requisição e se é válido.
export const handleAuth = async (req: Request, res: Response, next) => {
    console.log(req.route);
    const token = req.header('Authorization')?.split(' ')[1];
    const isValidToken = token ?
        await invokeService('AUTH_VERIFY_TOKEN', { token }, true)
        : false;
    if (!isValidToken) {
        res.status(401).json({
            'auth': false,
            'error': 'Token inválido'
        });
        return;
    }
    next();
}