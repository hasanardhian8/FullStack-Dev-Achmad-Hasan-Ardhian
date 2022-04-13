import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.positionCtrl.job_list)
router.get('/:id',indexCtrl.positionCtrl.job_detail)



export default router