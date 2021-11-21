const { Pool } = require('pg');     // postgres connection pool
// env
require('dotenv').config();         // environment variable
const DATABASE_URL = process.env.DATABASE_URL;


//////////////////////
//      pg pool     //
//////////////////////

const postgres = new Pool({
    connectionString: DATABASE_URL
});



module.exports = postgres;