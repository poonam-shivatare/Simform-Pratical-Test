const express = require('express');                                                 // web framework for nodejs
const bcrypt = require('bcrypt');                                                   // generate random strings
// models                           
const User = require('../../models/user/user');                                     // user - model
//middleware
const { authenticateToken, generateToken } = require('../../middlewares/auth');     // middleware
// services
const s3Bucket = require("../../services/s3_bucket");                                // service - s3 bucket
// router
const router = express.Router();                                                     // express - router



///////////////////
//     User     //
///////////////////

// update user details
router.put(
    '/update/:userID',
    authenticateToken,
    s3Bucket.upload.single('image'),
    async (req, res) => {
        try {
            const userID = req.params.userID;
            const { firstName, lastName, email, password, phone } = req.body;
            const imageURL = (req.file) ? req.file.location : null;

            // create hash password
            const hashPassword = bcrypt.hashSync(password, 10);

            //
            // register new user
            //
            const registrationTimeStamp = (
                await User.updateUserDetails(userID, firstName, lastName, email, hashPassword, imageURL, phone)
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
                info: 'User updated!',
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

// get all user details
router.get(
    '/',
    authenticateToken,
    async (req, res) => {
        try {
            // get all user list
            const usersList = (await User.getUserDetails()).rows;

            res.status(200).json({
                status: true,
                info: 'Users Details',
                data: { usersList }
            })
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

// get all user details
router.get(
    '/:userID',
    authenticateToken,
    async (req, res) => {
        try {
            const userID = req.params.userID;
            // get all user details
            const userDetail = (await User.getUserDetailsByUserID(userID)).rows[0];

            res.status(200).json({
                status: true,
                info: 'User Detail',
                data: userDetail
            })
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