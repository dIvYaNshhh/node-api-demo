const query = require('../database/db-connection');
const { multipleColumnSet } = require('../utils/common.util');


class UserModel {
    tableName = "user";

    create = async({username, password, first_name, last_name, email})=>{
        const sql = `INSERT INTO ${this.tableName} (username, password, first_name, last_name, email) VALUES (?, ?, ?, ?, ?)`;

        const result = await query(sql, [username, password, first_name, last_name, email]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }

    find = async(params={})=>{
        const sql = `SELECT * FROM ${this.tableName}`
    
        if(!Object.keys(params).length){
            return await query(sql);
        }

        const { columnSet, values} = multipleColumnSet(params);
        return await query(sql, [...values]);
    }

    findOne = async(params={})=>{
        const sql = `SELECT * FROM ${this.tableName}`
    
        if(!Object.keys(params).length){
            return await query(sql);
        }

        const { columnSet, values} = multipleColumnSet(params);
        const result = await query(sql, [...values]);
        return result[0];
    }
}

module.exports = new UserModel();