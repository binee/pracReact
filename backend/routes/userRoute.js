const User = require('../models/userModel');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

/**
 * Login User
 */

router.route('/login').post(async(req,res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({email : email}, {_id:1, password:1, token:1});
        const isMatchBcrypt = await bcrypt.compare(password,user.password);
        if(isMatchBcrypt){
            console.log(user);
            res.status(201).send({dataUser : user});        
        }
        else{
            res.status(201).send('Invalid Email and Password')
        }
    } catch (error) {
        res.status(500).send({error : error.message});
    }

})

/**
 * Create JWT token
 *
/**
 * Insert User
 * 
 */
 router.route('/addUser').post(async(req,res,next) => {
    try {
        const { name, email } = req.body;
        const checkUser = await User.findOne(email);
        if(checkUser){
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });  
        }

    // Register new USER
    const userBody = new User({
        name, 
        email, 
        password: await bcrypt.hash(this.password, 10),
        avatar: gravatar.url(email, { s: '200', r: 'pg', d: 'mm' }),
    })
        const userInfo = new User(req.body);
        let user = new User(userBody);
       User.generateToken();
        await user.save();
        res.status(201).send({dataUser : user});        
    } catch (error) {
        next(error);       
    }
});

/**
 * Fetch all user
 */
router.route('/').get(async(req,res) => {
    try {
        const userInfo = await User.find();
        res.status(200).send(userInfo);
        
    } catch (error) {
        res.status(500).send({error : error.message});
    }
});

/**
 * update user
 */
router.route('/editUser/:id').put(async(req,res)=>{
    const {id} = req.params;
    try {
        const userUpdate = await User.findByIdAndUpdate(id,req.body,{ runValidators: true });
        res.status(201).send(userUpdate);        

    } catch (error) {
        res.status(500).send({error : error.message});
    }
});
/**
 * DELETE USER
 */
router.route('/delete/:id').delete(async(req,res,next) => {
    const {id} = req.params;
    try {
        const response = await User.findByIdAndDelete(id);
        response.status(201).send(id);        
    } catch (error) {
        error.statusCode = 400;
        next(error);
    }

})
module.exports =  router;