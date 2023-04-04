import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import { Request } from 'express'

export const hashPassword = async (plainTextPassword: string) => {
    const saltRound = 6
    const hash = await bcrypt.hash(plainTextPassword, saltRound)
    return hash
}

export const comparePasswords = async (plainTextPassword: string, hashPassword: string) => {
    return await bcrypt.compare(plainTextPassword, hashPassword);
}

const secret = 'Hello, Goodbye, Friend'

export const signUserToken = async (user: User) => {
    let token = jwt.sign(
        {userId: user.userId },
        secret,
        { expiresIn: '1hr' }
    )
    return token
}

export const verifyUser = async (req: Request) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return null
    }

    const token = authHeader.split(' ')[1]
    try {
        let decoded: any = await jwt.verify(token, secret)
        return User.findByPk(decoded.userId)
    }
    catch (err) {
        return null
    }
}