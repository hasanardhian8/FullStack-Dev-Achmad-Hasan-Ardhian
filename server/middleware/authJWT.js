const jwt  = require('jsonwebtoken')
const passport = require('passport')
const Strategy = require('passport-local').Strategy
import bcrypt from 'bcrypt'

const jwtSecret = process.env.JWT_SECRET || 'myjwt'
const adminPassword = process.env.ADMIN_PASSWORD || 'secret'
const jwtOpts = {algorithm : 'HS256', expiresIn:'30d'}
import models from '../models/init-models'

passport.use(adminStrategy())
const authenticate = passport.authenticate('local',{session:false})

module.exports = {
    authenticate,
    login : login,
    ensureAdmin : ensureAdmin,
    ensureJobSeek : ensureJobSeek
}

async function login (req,res,next){
    const token = await sign({user_name:req.user.user_name,roleType:req.user.roleType});
    const {user_id,user_name,user_email,roleType} = req.user
    res.cookie('jwt',token, {httpOnly:true})

    res.json({profile:{user_id,user_name,user_email,roleType},success:true,token:token})
}

async function sign(payload){
    const token  = await jwt.sign(payload,jwtSecret,jwtOpts)
    return token
}

async function ensureJobSeek (req,res,next){
    const jwtString = req.headers.authorization || req.cookies.jwt
    const payload = await verify(jwtString)
    if (payload.user_name) {
        req.user = payload
        if (req.user.roleType === 'JobSeek') req.isJobSeek = true
        return next()
    }
    const err = new Error('Unauthorized')
    err.statusCode = 401
    next(err)
}

async function ensureAdmin(req,res,next) {
    const jwtString = req.headers.authorization || req.cookies.jwt
    const payload = await verify(jwtString)
    if (payload.user_name === "dono") return next()
        const err = new Error('Unauthorized')
    err.statusCode = 401
    next(err)
}

async function verify(jwtString = '') {
    jwtString = jwtString.replace(/^Bearer /i, '')
    try {
        const payload = await jwt.verify(jwtString, jwtSecret)
        return payload
    } catch (err) {
        err.statusCode = 401
        throw err
    }
}

function adminStrategy() {
    return new Strategy(async function (user_name, password, cb){
        try {
            const result = await models.users.findOne({
                where :{user_name:user_name}
            })
            console.log(result);
            const {user_name,user_id,user_password,user_email} = result.dataValues;
            const compare  = await bcrypt.compare(password, user_password)

            if (compare) return cb(null, {user_name:user_name,user_id:user_id,user_email:user_email})
        } catch (error) {
            console.log(error);
        }
        cb(null, false)
    })
}