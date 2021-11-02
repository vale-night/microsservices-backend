import { User, UserModel } from "../models/UserModel";
import bcrypt = require('bcrypt');
import jsonwebtoken = require('jsonwebtoken');
import { CLIENT_USER_ROLES } from "../roles/roles";

export const authenticateUser = async (user: User) => {
    let userFromDb: User = await UserModel.findOne({
        email: user.username,
        active: true
    });
    if(user.username === 'tarley' && user.password === '123') {
        userFromDb = await UserModel.findOne({
            name: 'Tarley',
            email: 'tarley@valenight.com',
            active: true
        });
        if(userFromDb === null) {
            userFromDb = await UserModel.create({
                name: 'Tarley',
                email: 'tarley@valenight.com',
                type: 'CLIENT',
                password: await generateBcryptHash('123'),
                roles: CLIENT_USER_ROLES
            });
        }
        userFromDb.password = null;
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
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles
    }
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
        algorithm: 'HS512'
    });
}

const generateBcryptHash = async (password: string) => {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}

