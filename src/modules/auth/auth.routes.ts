import { Request, Response, Router } from "express";
import { authController } from "./auth.controller";
import auth from "../../middleware/auth";
import test from "../../middleware/test";
import auth2 from "../../middleware/auth2";

const router = Router();

router.post('/signup', authController.signup);
router.post('/signin',  authController.signin);


export  const authRoutes = router;