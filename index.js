// Import the express module
import express from "express";
import cors from "cors";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Firebase Application
const firebaseApp = initializeApp({
  projectId: "poc-e2e-with-firebase-emulator",
});
const database = getFirestore();

// Create an instance of an Express application
const app = express();
app.use(express.json());
app.use(cors());

// Define a route for the root URL ('/')
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/articles", async (req, res) => {
  const articles = await database.collection("articles").get();
  res.json(articles.docs.map((item) => item.data()));
});

app.post("/articles", async (req, res) => {
  const body = req.body;
  const writeResult = await database.collection("articles").add(body);
  res.json({
    message: `Successful write resource`,
    id: writeResult.id,
  });
});

// Start the server and listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
