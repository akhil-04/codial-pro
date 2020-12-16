const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

//this part sends emils, and sets the communication
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:{
        user:'svam1008@gmail.com',
        pass: 'MATA@1008'
    }
});

//whenever i am sending the html mail, and file is inside the folder
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(path.join(__dirname,'../views/mailers', relativePath),
    data,
    function(err, template){
        if(err){
            console.log('error in rendering template',err);
            return;
        }
        mailHTML = template;
    }
    )

    return mailHTML;
}


module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}