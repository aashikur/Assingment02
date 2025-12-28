import { Request, Response, Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post('/', authController.signup);


export  const authRoutes = router;