import { Request, Response } from "express";

//Por enquanto, apenas iremos checar se o token está presente na requisição. Na próxima versão, teremos um esquema mais complexo de Roles
export const handleAuth = (req: Request, res: Response, next) => {
    
    next();
}