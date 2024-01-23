const {createPool} = require("mysql2/promise");
class DataBaseConnection{
    async connectDB(query){
        const conn = await createPool({
            database:"crud-usuarios",
            user:"z4bdoj72ujwc9jf3u2zm",
            host:"aws.connect.psdb.cloud",
            password:"pscale_pw_oyJYRi79jC2ChG1vFlOQyrkYynOCtlyciHu7KFYaGeJ",
            ssl:{
                rejectUnauthorized:false
            }
        });
        return await conn.query(query);
    }
}

module.exports = DataBaseConnection;