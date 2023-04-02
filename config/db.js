const mongoose = require('mongoose');



// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
const connectDB = async() =>{
    try {
       const db = await mongoose.connect(process.env.DB_URL)
       console.log(`MongoDB is connected on Port: ${db.connection.port}, on host ${db.connection.host}, name ${db.connection.name}`.green.bold.italic);
    } catch (error) {
        console.log(error.message.red.bold.italic);
        process.exit(1)
        
    }

}

module.exports = connectDB