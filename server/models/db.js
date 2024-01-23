const {createPool} = require("mysql2/promise");
class DataBaseConnection{
    async connectDB(query){
        const conn = await createPool({
            database:"crud-usuarios",
            user:"u96bg7ywyitfh4lai5eb",
            host:"aws.connect.psdb.cloud",
            password:"pscale_pw_ohC8QS6I3VSIjZY4RnsSmcQNuQ2eeXmZBV7Dzy0ZfXD",
            ssl:{
                rejectUnauthorized:false
            }
        });
        return await conn.query(query);
    }
}

module.exports = DataBaseConnection;
