import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";
import authJwt from "../middleware/authJWT"

const router = Router()

router.post("/signin",authJwt.authenticate,authJwt.login)
router.post("/signup",indexCtrl.userCtrl.signup)

export default router