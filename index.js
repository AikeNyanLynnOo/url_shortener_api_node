require("dotenv").config();
var cors = require("cors");
const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const app = express();
const PORT = 8001;
app.use(cors());

const MONGO_URL = process.env.MONGO_URL;
console.log("URL is>>", MONGO_URL);

connectToMongoDB(MONGO_URL)
  .then(() => console.log("Mongodb connected"))
  .catch((e) => {
    console.log("Connect Error>>", e);
  });

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
