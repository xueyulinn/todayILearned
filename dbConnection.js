const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.DB_URL || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connect = async () => {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    const db = await client.db("todayILearnedDB");
    db.command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    return db;
  } catch (err) {
    console.error(err);
  }
};

module.exports = connect;
