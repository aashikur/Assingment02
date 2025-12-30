import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";

const auth =  (...roles: string[]) => {
    return  (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;

            if (!token) {
                // !authResult || !authResult.startsWith('Bearer ')
                return res.status(500).send({
                    success: false,
                    message: 'No token found',
                    errors: []
                });
            }

            const decoded = jwt
            .verify(token, config.jwtSecret as string ) as JwtPayload;

            console.log('Decoded JWT from auth:', decoded);
            console.log('Required roles:', roles);

            // req.user = decoded as Record<string, any>;
            return next();
        } catch (err) {
            res.status(500).json({
                message: "something went wrong!"
            })
        }

    }


}

export default auth;