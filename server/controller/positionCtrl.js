import { Op } from "sequelize";
import { sequelize } from "../models/init-models";

const job_list = async (req,res) =>{

    try {
        
        let limit = 10
        let offset = 0
        const joblist = await req.context.models.positions.findAndCountAll({
            limit : limit,
            offset : offset,
            where : {
                [Op.and]:[{
                    pos_description:req.query.description
                },{
                    pos_location:req.query.location
                }]
                
            }
        });
        return res.send(joblist)
    } catch (error) {
        return res.status(404).send("not found")       
    }

}
//localhost:3001/api/recruitment/position/?description=java&location=yogyakarta


const job_detail  = async (req,res) => {
    try {
        const jobdetail = await req.context.models.positions.findOne({
            where:{pos_id:req.params.id}
        })
        return res.send(jobdetail)
    } catch (error) {
        return res.status(404).send("not found")
    }
}
//localhost:3001/api/recruitment/1
export default {
    job_list,
    job_detail
}