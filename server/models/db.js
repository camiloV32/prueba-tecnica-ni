const {createPool} = require("mysql2/promise");
class DataBaseConnection{
    async connectDB(query){
        const conn = await createPool({
            database:"crud-usuarios",
            user:"8y8vzerxcmhqglz1qzd5",
            host:"aws.connect.psdb.cloud",
            password:"pscale_pw_FZTUelHM0lOtIxjEi6lyGlFoV2z0EaTTjCRKBGaHvzf",
            ssl:{
                rejectUnauthorized:false
            }
        });
        return await conn.query(query);
    }
}

module.exports = DataBaseConnection;