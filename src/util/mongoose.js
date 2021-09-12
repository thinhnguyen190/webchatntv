module.exports = {
    
    mutipleMongooseToObject: function(mongooses){
        const array=mongooses.map(mongoose => mongoose.toObject())
    
        return array
    },
    MongooseToObject: function(mongoose){
        return mongoose ? mongoose.toObject() : mongoose
    }
}
