//we created a queue
const queue = require('../config/kue');
const commentsMailer = require('../mailers/comments_mailers');

//process function call the mailer
queue.process('emails', function(job,done){
    console.log('email worker is processing a job', job.data);

    //
    commentsMailer.newComment(job.data);
    done();
})

//now mails will send by this not by controller