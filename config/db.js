const mongooose = require('mongoose');
const dbConfig = require('./db-config.js');

const connectDB = async() => {
    try{
        const connexion = await mongooose.connect(dbConfig.database)
        console.log(`MongoDB Connected: ${connexion.connection.host}`);
    }
    catch(err){
        console.log(`MongoDB Connection Error: ${err}`);
        process.exit(1);
    }
}

module.exports = connectDB;