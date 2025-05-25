import mongoose from 'mongoose';

export default function mongooseConnect() {
  const db = process.env.MONGODB_CONNECTION_STRING;
  const environment = process.env.NODE_ENV;

  if (!db) {
    throw new Error('Missing MONGODB_CONNECTION_STRING environment variable');
  }

  if (environment === 'development') {
    mongoose.connect(db, { dbName: 'app-db' }).then(() => {
      console.log('✅ Connected to MongoDB: ', db);
    });
  } else if (environment === 'test') {
    mongoose.connect(db, { dbName: 'app-e2e-test-db' }).then(() => {
      console.log('✅ Connected to MongoDB: ', db);
    });
  } else {
    mongoose.connect(db, { dbName: 'app-db' }).then(() => {
      console.log('✅ Connected to MongoDB');
    });
  }
}
