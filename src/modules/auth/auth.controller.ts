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

        return res.status(500).send({
            success: false,
            message: 'Signup failed',
            errors: `${(error as Error).message }`
        })
    }
}

const signin = async (req: Request, res: Response) => {
    const result  = await authServices.signin(req.body);

    if(!result){
        return res.status(400).send({
            success: false,
            message: 'Signin failed',
            errors: []
        })
    }

    return res.status(200).send({
        success: true,
        message: 'User signed in successfully',
        data: result
    })
}


export const authController = {
    signup,
    signin
}
