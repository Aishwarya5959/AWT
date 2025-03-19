const { MongoClient } = require('mongodb');

async function run() {
  const uri = 'mongodb://127.0.0.1:27017/testdb';  
  const client = new MongoClient(uri);

  try {
  
    await client.connect();
    console.log("Mongodb connected");
    const database = client.db('test');
    const collection = database.collection('users');
 
    const documents = await collection.find({}).toArray();

 
    console.log(documents);
  } finally {
    await client.close();
  }
}
run().catch(console.error);
