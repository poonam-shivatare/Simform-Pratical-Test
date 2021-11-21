const express = require('express');                            // web framework for nodejs
const bcrypt = require('bcrypt');                              // generate random strings
const { v4: uuidv4 } = require('uuid');                        // v4 uuid generator
//models
const User = require('../../models/user/user');                // user - model
//middleware
const { generateToken } = require('../../middlewares/auth')    // middleware 
// services
const s3Bucket = require("../../services/s3_bucket");          // service - s3 bucket
// router
const router = express.Router();                               // express - router


///////////////////
//     login     //
///////////////////

router.post(
    '/login',
    async (req, res) => {
        try {
            const { email, password } = req.body;

            // checking user email
            const resultUserDetails = await User.getUserDetailsByEmail(email);
            if (!resultUserDetails.rowCount) {
                return res.status(401).json({
                    status: false,
                    info: 'No account with these credentials exists. Please sign-up instead.',
                    data: null
                });
            };

            // user details object
            const userDetails = resultUserDetails.rows[0];

            // checking user password
            const isPasswordMatching = await bcrypt.compare(password, userDetails.password);
            // return notOK if no match
            if (!isPasswordMatching) {
                return res.status(401).json({
                    status: false,
                    info: 'Incorrect credentials, please try again!',
                    data: null
                });
            };

            // generate JWT token
            const accessToken = await generateToken({
                user_id: userDetails.user_id,
                first_name: userDetails.first_name,
                last_name: userDetails.last_name,
                phone: userDetails.phone,
                email: userDetails.email,
                time_stamp: userDetails.time_stamp
            });

            return res.status(200).json({
                status: true,
                info: 'Log In Successful!',
                data: { accessToken }
            });
        } catch (err) {

        }
    }
);

//////////////////////
//     register     //
//////////////////////

router.post(
    '/signup',
    // s3Bucket.upload.single('image'),
    async (req, res) => {
        try {
            const { firstName, lastName, email, password, phone } = req.body;
            const imageURL = (req.file) ? req.file.location : null;

            // checking user email
            const userDetails = await User.getUserDetailsByEmail(email);

            if (userDetails.rowCount) {
                res.status(401).json({
                    status: false,
                    info: 'User already exists with this email.',
                    data: null
                });
            }

            // create hash password
            const hashPassword = bcrypt.hashSync(password, 10);

            //
            // register new user
            //
            const userID = uuidv4();
            const registrationTimeStamp = (
                await User.saveUserDetails(userID, firstName, lastName, email, hashPassword, imageURL, phone)
            ).rows[0].time_stamp;

            // generate access token
            const accessToken = await generateToken({
                user_id: userID,
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                time_stamp: registrationTimeStamp
            });

            return res.status(200).json({
                status: true,
                info: 'Signup Successful!',
                data: { accessToken }
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({
                status: false,
                info: err.message,
                data: null
            });
        }
    }
);



module.exports = router;