import mongoose from 'mongoose';
import { env } from 'process';

export async function connectDB() {
  const uri = env.MONGODB_URI || 'mongodb://localhost:27017/dev';  // 👈 use localhost
  await mongoose.connect(uri);
  console.log('Mongo connected to', uri);
}
