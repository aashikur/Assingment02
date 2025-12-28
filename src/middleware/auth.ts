import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

const auth = (req : Request, res : Response, next: NextFunction) => {

        const authResult = req.headers.authorization;
        if (!authResult || !authResult.startsWith('Bearer ')) {
            return res.status(401).send({ 

                success: false,
                message: 'Unauthorized', 
                errors: [] 
            });
        }

        const decoded = jwt.verify(
            // authResult.split(' ')[1],
            // process.env.JWT_SECRET as string
            authResult, config.jwtSecret as string

            
        );
    
    return next();
}