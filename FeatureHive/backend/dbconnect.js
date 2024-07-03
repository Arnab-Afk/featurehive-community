import mongoose from 'mongoose';

const mongoURI = 'URI';
// const mongoURI='mongodb://localhost:27017/';
const connectTOMongo = async () => {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongodb")
}

export default connectTOMongo;