const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dohwyiqtt/image/upload/v1639961306/YelpCamp/dcd278s59vrec9sx1scr.jpg',
                    filename: 'YelpCamp/dcd278s59vrec9sx1scr',
                },
                {
                    url: 'https://res.cloudinary.com/dohwyiqtt/image/upload/v1639961309/YelpCamp/gnpmdxovngn5ywlm29ey.jpg',
                    filename: 'YelpCamp/gnpmdxovngn5ywlm29ey',
                },
                {
                    url: 'https://res.cloudinary.com/dohwyiqtt/image/upload/v1639961311/YelpCamp/visoysa5r1mce1425nvl.jpg',
                    filename: 'YelpCamp/visoysa5r1mce1425nvl',
                },
                {
                    url: 'https://res.cloudinary.com/dohwyiqtt/image/upload/v1639961311/YelpCamp/flqawsobzr3ljo5x8qkp.jpg',
                    filename: 'YelpCamp/flqawsobzr3ljo5x8qkp',
                }
            ],
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci, magnam ipsa, consequuntur fuga amet sequi quod pariatur a, ab qui ex nisi! Odit beatae provident consectetur? Eos sequi esse qui. Ducimus voluptatum, quisquam deserunt a cumque iusto facere accusantium, velit quae, sapiente voluptate. Alias molestiae, dolor dolores laudantium totam quae aspernatur distinctio sapiente quod qui iure odit recusandae voluptas nostrum!',
            price,
            author: '61b4cd6ad3bc5eb3cfe62659'
        });
        await camp.save();
    }
}

seedDB().then(() => {
    db.close();
});