const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://Foodies:$uraj321Vish@cluster0.pcuycle.mongodb.net/foodiesmern?retryWrites=true&w=majority'

const mongoDB = async () => {
    await mongoose.connect(mongoURI)
    try {
        console.log('connected');
        const fetched_data = await mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray().then(async(data) => {
            const foodCategory = await mongoose.connection.db.collection("food_category");
            foodCategory.find({}).toArray().then(async(catData) => {
                try {
                    global.food_items = data;
                    global.food_category = catData;
                    // console.log(global.food_category);
                } catch (error) {
                    console.log(error);
                }
            })
        }).catch((err)=> console.log(err));
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = mongoDB;