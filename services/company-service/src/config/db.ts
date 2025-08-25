import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dev';  // 👈 use localhost
  await mongoose.connect(uri);
  console.log('Mongo connected to', uri);
}
