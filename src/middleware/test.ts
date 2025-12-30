import { NextFunction, Request, Response } from "express";


const test = ( req : Request, res: Response, next: NextFunction) => {
    console.log("This is Test Middleware");
    next();
}

export default test;