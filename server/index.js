import express from "express";

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
  console.log("AI Interview agent");
  return res.json({ message: "Server started!" });
});
app.listen(PORT, (req, res) => {
  console.log(`app is listening on http://localhost:${PORT}`);
});
