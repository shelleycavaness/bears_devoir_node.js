const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
const BearSchema = new Schema({ //this is a new model of Bear
    name:String
});


module.exports = mongoose.model('Bear', BearSchema);
//model() is a methode of mogoose