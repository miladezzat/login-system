const userModel = require('./models/user');

require("./config/db");
let admins = [
    {
        full_name: "admin one",
        email: "admin-one@gmail.com",
        password: "12345678",
        isAdmin: true
    },
    {
        full_name: "admin two",
        email: "admin-two@gmail.com",
        password: "12345678",
        isAdmin: true
    },

];

userModel.insertMany(admins)
    .then(admins => {
        console.log(admins);
    })
    .catch(err => console.log(err));