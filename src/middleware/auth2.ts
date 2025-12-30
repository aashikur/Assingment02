import { NextFunction, Request, Response } from "express";
import  jwt  from "jsonwebtoken";
import { config } from "../config";


const auth2 = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        // const decoded = jwt.verify(token, config.jwtSecret as string) ;

        // console.log("Token received in auth2 middleware:", decoded);
        console.log("This is Test Middleware auth2");
        next();
    }
}

export default auth2;