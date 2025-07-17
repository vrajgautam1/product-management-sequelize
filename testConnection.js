// testConnection.js

const db = require('./models'); // This auto-connects using config.json

async function checkConnection(){
    try {
        await db.sequelize.authenticate()
        console.log("database connected successfully")
    } catch (error) {
        console.log(error.message);
    }
}

checkConnection()