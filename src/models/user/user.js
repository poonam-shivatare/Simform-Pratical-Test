const postgres = require('../database/pool');       // postgres pool instance

// user model

class User {

    // save user details
    static saveUserDetails(userID, firstName, lastName, email, hashPassword, imageURL, phone) {
        return postgres.query(
            `
            INSERT INTO users (user_id, first_name, last_name, email, password, profile_image_url, phone)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING time_stamp;
            `,
            [userID, firstName, lastName, email, hashPassword, imageURL, phone]
        );
    };

    // update user details
    static updateUserDetails(userID, firstName, lastName, email, hashPassword, imageURL, phone) {
        return postgres.query(
            `
            UPDATE users
            SET first_name = $2,
                last_name = $3,
                email = $4,
                password = $5,
                profile_image_url = $6,
                phone = $7
            WHERE user_id = $1
            RETURNING time_stamp;
            `,
            [userID, firstName, lastName, email, hashPassword, imageURL, phone]
        );
    };

    // get user details by user email
    static getUserDetailsByEmail(email) {
        return postgres.query(
            `
            SELECT 
                user_id,
                first_name,
                last_name,
                email,
                password
            FROM users
            WHERE email = $1;                
            `,
            [email]
        );
    };

    // get all users details
    static getUserDetails() {
        return postgres.query(
            `
            SELECT 
                user_id,
                first_name,
                last_name,
                email,
                profile_image_url,
                phone
            FROM users;                
            `
        );
    };

    // get user details by userID
    static getUserDetailsByUserID(userID){
        return postgres.query(
            `
            SELECT 
                user_id,
                first_name,
                last_name,
                email,
                password
            FROM users
            WHERE user_id = $1;                
            `,
            [userID]
        )
    }


}



module.exports = User;