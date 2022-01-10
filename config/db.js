const Pool = require('pg').Pool;
const pool = new Pool({
    user:process.env.db_user,
    password:process.env.db_password,
    database:process.env.db_database,
    host:process.env.db_host,
    port : 5432
})


pool.connect()
    .then(()=>console.log("connexion à la base de donnée réussie"))
    .catch((error => console.error(error)))

module.exports = pool;