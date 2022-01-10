const Pool = require('pg').Pool;
const pool = new Pool(
    process.env.DATABASE_URL
)


pool.connect()
    .then(()=>console.log("connexion à la base de donnée réussie"))
    .catch((error => console.error(error)))

module.exports = pool;