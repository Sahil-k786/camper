const mongoose=require('mongoose');
const Campground=require('../models/campground');
const cities=require('./cities');
const {places,descriptors}=require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/camper', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample=(array)=>{
    return array[Math.floor(Math.random() *array.length)]
}

const seedDb=async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
       const rnd=Math.floor(Math.random()*1000);
       const price=Math.floor(Math.random()*20)+10;
       const camp=new Campground({
           author:'6246f859781baff9207ceada',
           location: `${cities[rnd].city},${cities[rnd].state}`,
           title:`${sample(descriptors)} ${sample(places)}`,
           image:'https://picsum.photos/800/1000',
           description:'lorem ipsum',
           price

       })
       console.log(camp);
      await camp.save();
    }
    
}

seedDb().then(()=>{
        mongoose.connection.close();
});