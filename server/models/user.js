//Import of Modules
const DataBaseConnection = require("./db.js");

//Creation of Instances
let conn = new DataBaseConnection();

//Creation of the User class and its different methods
class User{
    async create(user){
        let exist = await this.validateExistUser(user.email);
        if(exist)return false;
        
        let query = `INSERT INTO users (name, lastname, email, birthdate, password) 
        VALUES ("${user.name}", "${user.lastName}", "${user.email}", "${user.birthDate}", "${user.password}");`;
        return conn.connectDB(query);
    }
    delete(id){
        let query = `DELETE FROM users WHERE id=${id}`;
        return conn.connectDB(query);
    }
    read(offset = 0){
        let query = `SELECT id, name, lastName, email, birthDate FROM users`;
        return conn.connectDB(query);
    }
    async update(user){
        let exist = await this.validateExistUser(user.email,true);
        if(exist)return false;
        
        let password = user.password!=undefined ? `, password = "${user.password}"`:"";
        let query = `UPDATE users SET name = "${user.name}", lastname = "${user.lastName}", email = "${user.email}", birthdate = "${user.birthDate}"${password} WHERE id = ${user.id}`;
        return conn.connectDB(query);
    }
    async validateExistUser(email,flag=false){
        let query = `SELECT * FROM users WHERE email = "${email}"`;
        let existUser = await conn.connectDB(query);
        if(flag && existUser[0].length>0 && email == existUser[0][0].email)return false;
        return existUser[0].length>0?true:false;
    }
}

//Export module
module.exports = User;