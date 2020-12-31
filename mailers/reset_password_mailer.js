const nodemailer = require('../config/nodemailer');
const { getMaxListeners } = require('../models/users');

module.exports.resetPassword = function(accessToken){

     //some content and relative path
     let htmlString = nodemailer.renderTemplate({accessToken:accessToken}, '/reset_password/reset_password.ejs')
     console.log('inside mailer', accessToken.email);

     nodemailer.transporter.sendMail({
        from:'svam1008@gmail.com',   //sender address
        to:accessToken.email,  //list of reciecers
        subject:'Codeial : Reset Password', //subject line
        html:htmlString      //// html body
    }, (err, info)=>{
        if(err){
            console.log('error in sending mail', err); return;
        }
        
        console.log('messsage sent', info);
        return;
    })
    
}