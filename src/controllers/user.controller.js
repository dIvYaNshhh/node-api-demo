const UserModel = require('../models/user.model');
const { validationResult } = require('express-validator')

class UserController {

    createUser = async(req, res)=>{
        this.checkReqestParameter(req, res);
        const result = await UserModel.create(req.body);
        if(!result) {
            res.status(201).json({"error":result})
        }
        res.status(201).json({"message":'User has been created successfully'})
    };

    login = async(req, res)=>{
        this.checkReqestParameter(req, res);
        const { email, password}  = req.body;
        
        const result = await UserModel.findOne({email});
        
        if(!result) {
            res.status(201).json({"error":'User not found'})
        } 
        res.status(201).json({"message":'User login successfully', data: result})
    };

    checkReqestParameter = (req, res)=>{
        const error = validationResult(req)
        if(!error.isEmpty()){
            res.status(201).json({"error":error})
        }
    };

}

module.exports = new UserController();