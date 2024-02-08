const mongoose = require('mongoose');

main().catch(err=> console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://danitbenishti:Danit2710@cluster0.5chs0kt.mongodb.net/library');
    console.log("mongo connected");

   module.exports = mongoose;
}
