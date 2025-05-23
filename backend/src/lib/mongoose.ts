import mongoose from 'mongoose';

export default function mongooseConnect() {
  const db = process.env.MONGODB_CONNECTION_STRING;

  if (!db) {
    throw new Error('Missing MONGODB_CONNECTION_STRING environment variable');
  }

  mongoose.connect(db, { dbName: 'mern-booking-app-db' }).then(() => {
    console.log('✅ Connected to MongoDB');
  });
}
