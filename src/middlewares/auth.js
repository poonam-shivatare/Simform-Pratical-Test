const jwt = require('jsonwebtoken');                  // jwt - authentication
// env
require('dotenv').config();                           // environment variables
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;


/////////////////////////
//    generate token   //
/////////////////////////

const generateToken = async (user) => {
    return jwt.sign(user, ACCESS_TOKEN, { expiresIn: '12h' });
};

/////////////////////////
//     authenticate    //
/////////////////////////

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(400).json({
                status: false,
                info: 'Please add authentication token!',
                data: null
            });
        };
        // if token exist verify
        const user = jwt.verify(token, ACCESS_TOKEN);
        req.user = user;

        next();

    } catch (err) {
        console.log(err);

        // check token expire err
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: false,
                info: err.name,
                data: null
            });
        };

        return res.status(500).json({
            status: false,
            info: err.message,
            data: null
        });
    };
};

module.exports = { generateToken, authenticateToken };