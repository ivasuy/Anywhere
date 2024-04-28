const mongoose = require("mongoose");
// password: password1234
exports.connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI).then((con) => {
        console.log("DATABASE CONNECTED " + con.connection.host);
    }).catch((err) => {
        console.log("error: " + err);
    })
}


