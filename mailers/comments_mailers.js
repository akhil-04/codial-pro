const nodemailer = require('../config/nodemailer');


//this is another way of exporting
exports.newComment = (comment)=>{
    console.log('Inside new comment mailer',comment);

    //some content and relative path
    let htmlString = nodemailer.renderTemplate({comment:comment}, '/comments/new_comments.ejs')

    nodemailer.transporter.sendMail({
        from:'svam1008@gmail.com',
        to:comment.user.email,
        subject:'New Comment Published!',
        html:htmlString
    }, (err, info)=>{
        if(err){
            console.log('error in sending mail', err); return;
        }

        console.log('messsage sent', info);
        return;
    })
}