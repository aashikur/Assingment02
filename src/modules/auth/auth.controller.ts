import { Request, Response } from "express"
import { authServices } from "./auth.services"


const signup = async (req: Request, res: Response) => {
    try {
        const result = await authServices.signup(req.body);

        if (!result) {
            return res.status(400).send({
                success: false,
                message: 'Signup failed',
                errors: []
            })
        }

        return res.status(201).send({
            success: true,
            message: 'User signed up successfully',
            data: result
        })
    } catch (error) {

        return res.status(201).send({
            success: true,
            message: 'User signed up successfully',
            errors: `${(error as Error).message }`
        })
    }
}



export const authController = {
    signup
}