const router = require('express').Router();
const { response } = require('express');
const User = require('../model/Users');
const {DataValidation} = require('../DataValidation');
const bcrypt = require('bcryptjs');

//app.use('/api/user/register')
router.post('/register', async (req, res) => {
    const {error} = DataValidation.registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send('Email already exists');

    const encrpytedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword
    });
    
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;