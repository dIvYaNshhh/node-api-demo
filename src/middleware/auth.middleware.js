const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const auth = ()=>{
    return async function(req, res, next){
        try{
        const authHeader = req.headers.authorization;
        console.log(JSON.stringify(authHeader))
        const bearer = "Bearer "
        if(!authHeader || !authHeader.startsWith(bearer)){
            res.status(201).json({"error":"Access denied. No Authorization token found!"})
        }

        const token = authHeader.replace(bearer,"")
        const secretKey = process.env.SECRET_JWT || ""

        const decoded = jwt.verify(token, secretKey)
        const user = await UserModel.findOne({id: decoded.user_id})

        if(!user){
            res.status(201).json({"error":"Authenticatio failed!"})
        }

        req.currentUser = user;
        next()
        }catch(e){
            res.status(201).json({"error":e.message})
        }
    }
}

module.exports = auth;