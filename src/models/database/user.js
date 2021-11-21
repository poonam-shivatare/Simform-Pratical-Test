const postgres = require('./pool');     // postgres pool instance


// placeholder
const user = {};


////////////////////////
//       tables       //
////////////////////////

// users table
user.initTableUser = () => {
    return postgres.query(
        `
        CREATE TABLE IF NOT EXISTS users(
            user_id UUID PRIMARY KEY NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            profile_image_url TEXT,
            password TEXT NOT NULL,
            phone NUMERIC(15) NOT NULL,
            time_stamp TIMESTAMPTZ DEFAULT NOW()
        );     
        `
    );
}



module.exports = user;