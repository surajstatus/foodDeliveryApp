const express = require('express');
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = "Mynameisendtoendclearallwearesafedonottakeproblems";

router.post("/createusers",
    body('email','Invalid mail').isEmail(),
    body('name','Name Must be greater than 5').isLength({ min: 5 }),
    body('password','Password Value Must be greater than 5').isLength({ min: 5 }),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)
        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
                location: req.body.location
            }).then(res.json({success:true}));
        } catch (error) {
            console.log(error);
            res.json({success:false});
        }
    })


    router.post("/loginusers",
    body('email','Invalid mail').isEmail(),
    body('password','Password Value Must be greater than 5').isLength({ min: 5 }),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
            const userdetail = await User.findOne({email});
            if(!userdetail){
                return res.status(400).json({ errors: "Try logging with correct credentials" });
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userdetail.password);

            if(!pwdCompare){
                return res.status(400).json({ errors: "Try logging with correct credentials" });
            }
            const data = {
                user: {
                    id: userdetail.id
                }
            }

            const authoToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, authoToken: authoToken });

        } catch (error) {
            console.log(error);
            res.json({success:false});
        }
    })

module.exports = router;