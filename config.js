const dotenv = require('dotenv');
dotenv.config();

module.exports =  httpResult = {
    notFound:404,
    success:200,
    error:400,
    connStr:process.env.DB_CONNECTION_STRING,
    secret:"ciestmiani",
    expiresIn: "2 days"
} 