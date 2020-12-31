const User = require('../../../models/users');
const jwt = require('jsonwebtoken');

const env = require('../../../config/environment');


module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email:req.body.email});
        if(!user || user.password!=req.body.password){
            return res.json(422, {
                message:'Invalid Username or Password'
            });
        }
        return res.json(200, {
            message:'Sign In successfull Here is your token please keep it safe',
            data: {
                //sign is a function, toJSON part get encrypted
                token: jwt.sign(user.toJSON(), env.jwt_secret, {
                    expiresIn:'100000'
                })
            }
        });
    }catch(err){
        console.log('******', err);
        return res.json(500, {
            message: 'Internal server Error'
        });
    }
}