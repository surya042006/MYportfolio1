require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("frontend"));

console.log("Mongo URL:", process.env.MONGO_URL);

const client = new MongoClient(process.env.MONGO_URL);

let db;

async function startServer() {
  try {
    await client.connect();
    console.log("MongoDB Connected ✅");

    db = client.db("portfolio");

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT} 🚀`);
    });

  } catch (err) {
    console.error("MongoDB Error ❌", err);
  }
}

// POST API
app.post("/add", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !email || !message) {
      return res.status(400).json({ success: false });
    }

    await db.collection("contacts").insertOne({
      name,
      phone,
      email,
      message,
      createdAt: new Date()
    });

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

startServer();