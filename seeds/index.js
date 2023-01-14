const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const imgStr = require('./images');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log('Database Connected');
}

// array[Math.floor(Math.random() * array.length)]

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++)
    {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '637ea4305088fcb138ef133d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
              type: 'Point',
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/de7essmmt/image/upload/v1669438128/YelpCamp/cnvvp9eo241d5mmzchxp.jpg',
                  filename: 'YelpCamp/cnvvp9eo241d5mmzchxp',
                },
                {
                  url: 'https://res.cloudinary.com/de7essmmt/image/upload/v1669438128/YelpCamp/jnvng4pnvwhmppdf03u2.jpg',
                  filename: 'YelpCamp/jnvng4pnvwhmppdf03u2',
                }
              ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum similique excepturi quaerat dignissimos perspiciatis sunt saepe tempore placeat inventore iure, quas ad consequatur incidunt. Neque quaerat veritatis inventore eos quo!',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})