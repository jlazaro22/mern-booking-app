import mongoose from 'mongoose';

export default function mongooseConnect() {
  const environment = process.env.NODE_ENV;
  const db =
    environment === 'development' || environment === 'test'
      ? process.env.MONGODB_CONNECTION_STRING_DEV
      : process.env.MONGODB_CONNECTION_STRING;

  if (!db) {
    throw new Error('Missing MONGODB_CONNECTION_STRING environment variable');
  }
  switch (environment) {
    case 'development':
      mongoose.connect(db, { dbName: 'app-dev-db' }).then(() => {
        console.log('✅ Connected to MongoDB: ', db);
      });

      break;
    case 'test':
      mongoose.connect(db, { dbName: 'app-e2e-test-db' }).then(() => {
        console.log('✅ Connected to MongoDB: ', db);
      });

      break;
    default:
      mongoose.connect(db, { dbName: 'app-db' }).then(() => {
        console.log('✅ Connected to MongoDB');
      });

      break;
  }
}
