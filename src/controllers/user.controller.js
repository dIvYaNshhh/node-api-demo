const UserModel = require('../models/user.model');
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();
class UserController {

    testToken = async(req, res)=>{
        res.status(201).json({"message":'Authentication is  successfully done!!'})
    };

    createUser = async(req, res)=>{
        this.checkReqestParameter(req, res);
        await this.hashPassword(req);
        const result = await UserModel.create(req.body);
        if(!result) {
            res.status(201).json({"error":result})
        }
        res.status(201).json({"message":'User has been created successfully'})
    };

    login = async(req, res)=>{
        this.checkReqestParameter(req, res);
        const { email, password:pass}  = req.body;
        
        const result = await UserModel.findOne({email});

        if(!result) {
            res.status(201).json({"error":'User not found'})
        } 
        console.log(JSON.stringify(result));
        const isMatch = await bcrypt.compare(pass, result.password);

        if(!isMatch) {
            res.status(201).json({"error":'Password is incorrect'});
        }

        const secretKey = process.env.SECRET_JWT || ""
        const token = jwt.sign({user_id: result.id.toString()}, secretKey, {
            expiresIn:'24h'
        })
        const {password, ...otherUserDetail} = result
        const user = {...otherUserDetail, token}
        res.status(201).json({"message":'User login successfully', data: user})
    };

    checkReqestParameter = (req, res)=>{
        const error = validationResult(req)
        if(!error.isEmpty()){
            res.status(201).json({"error":error})
        }
    };

    hashPassword = async(req) =>{
        if(req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }

}

module.exports = new UserController();