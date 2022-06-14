import express from 'express';
import { register, login, getUser } from "../controllers/auth.mjs";
import authGuard from "../middlewares/auth.mjs";

const  router = express.Router();

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/getuser').get(authGuard, getUser)

export default router
