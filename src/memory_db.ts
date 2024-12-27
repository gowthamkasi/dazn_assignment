import { MongoMemoryServer } from 'mongodb-memory-server';

export const memoryDb = async () => {
  const mongoServer = await MongoMemoryServer.create();

  const mongoUri = mongoServer.getUri();

  console.log(`memoryDb running at ${mongoUri}`);

  return mongoUri;
};
