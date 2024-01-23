//Import of Modules
const DataBaseConnection = require("./db.js");

//Creation of Instances
let conn = new DataBaseConnection();

//Creation of the authentication class and its different methods
class authentication{
    login(authData){
        let query = `SELECT id, email, name, lastname FROM users WHERE email = "${authData.email}" AND password = "${authData.password}";`;
        return conn.connectDB(query);
    }
}

module.exports = authentication;