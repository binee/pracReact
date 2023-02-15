const mongoose = require('mongoose');
const server='127.0.0.1:27017';
const database = 'practiceMongo';

class Database {
    constructor(){
        this._connect()
    }

_connect() {
    mongoose.connect(`mongodb://${server}/${database}`,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log('Database connected Succesfully')
    })
    .catch(err => {
        console.error(`${err} Database connection Error`)
    })
}
}
module.exports = new Database()