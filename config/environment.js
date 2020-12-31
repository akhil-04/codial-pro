const development = {
    name: 'development',
    sesssion_cookie_key:'blahsomething',
    db:'codeial_development',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user:'svam1008@gmail.com',
            pass: 'MATA@1008'
        }
    },
    google_client_id:"884120867378-virpuvphaf8uhm1d7kkfjfjp6q45r3n0.apps.googleusercontent.com",
    google_client_secret: "bbfu7BiNKTpdiwitACmeI2Ud",
    google_call_back_url:"http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeial'
}

const production = {
    name: 'production',
    sesssion_cookie_key:'WRjFN7h0W25tAtyXhFOwsVMphSHsCGoK',
    db:'codeial_production',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user:'svam1008@gmail.com',
            pass: 'MATA@1008'
        }
    },
    google_client_id:"884120867378-virpuvphaf8uhm1d7kkfjfjp6q45r3n0.apps.googleusercontent.com",
    google_client_secret: "bbfu7BiNKTpdiwitACmeI2Ud",
    google_call_back_url:"http://localhost:8000/users/auth/google/callback",
    jwt_secret:'pzehx65N0Lt9ysriMzmaoLggTu7hYXe7'
}



module.exports = development;