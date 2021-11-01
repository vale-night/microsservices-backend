import { Request, Response } from "express";
import { PERMISSIONS, Role } from "../roles/roles";
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

export const hasPermission = (allowedPermissions: Array<PERMISSIONS>) => {
    return async (req: Request, res: Response, next) => {
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
        if(!tokenHasAnyPermission(token, allowedPermissions)) {
            res.status(403).json({
                'auth': false,
                'error': 'Sem permissão para acessar o recurso desejado'
            });
            return;
        }
        res.locals.loggedUser = decodeToken(token);
        next();
    }
}

export const tokenHasAnyPermission = (token: string, allowedPermissions: Array<PERMISSIONS>) => {
    const tokenPayload = decodeToken(token);
    return tokenPayload.roles.filter(role => role.resource === 'USERS').flatMap(role => role.permissions).some(permission => allowedPermissions.includes(permission));
}

export const decodeToken = (token: string): {id: string, roles: Array<Role>} => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const buff = Buffer.from(base64, 'base64');
    const payloadinit = buff.toString('ascii');
    const payload = JSON.parse(payloadinit);
    return payload;
}