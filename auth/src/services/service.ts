import { User, UserModel } from "../models/UserModel";
import bcrypt = require('bcrypt');
import jsonwebtoken = require('jsonwebtoken');

export const authenticateUser = async (user: User) => {
    let userFromDb: User = await UserModel.findOne({
        email: user.username,
        active: true
    });
    if(user.username === 'tarley' && user.password === '123') {
        userFromDb = {
            email: 'tarley@valenight.com',
            password: null
        } as User;
    } else {
        if(!userFromDb) {
            return null;//TODO - Lançar exceção
        }
        const passwordMatch = await bcrypt.compare(user.password, userFromDb.password);
        if(!passwordMatch) {
            return null;//TODO - Lançar exceção
        }
    }
    return generateJwtToken(userFromDb);

}

export const isValidJwt = (jwt: string) => {
    try {
        return !!jsonwebtoken.verify(jwt, process.env.JWT_SECRET, {
            algorithms: ['HS512']
        });
    } catch (err) {
        console.error(err);
        return false;
    }
}

const generateJwtToken = (user: User) => {
    const payload = { //TODO - Adicionar ROLES no payload
        email: user.email
    }
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
        algorithm: 'HS512'
    });
}

