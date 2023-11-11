const express = require("express");
const bodyParser = require("body-parser");
const redisConnection = require("./redis/config");
const dbConnection = require("./db/config");
const isCached = require("./cached/cached");
const NoteSchema = require("./model/index");
const { setData, getData } = require("./redis/Session");
const app = express();

dbConnection();

app.use(bodyParser.json());

//Create notes
app.post("/api/notes", async (req, res, next) => {
  const { title, note } = req.body;

  try {
    const _note = new NoteSchema({
      title: title,
      note: note,
    });

    const savedNote = await _note.save();
    console.log("savedNote");
    console.log("savedNote", savedNote);
    // // Store in Redis
    setData(savedNote._id.toString(), savedNote);

    return res.json({
      message: "Note has been saved",
      note: savedNote,
    });
  } catch (err) {
    return res.status(500).json(err); // Handle error appropriately
  }
});

app.get("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id", id);

  try {
    const redies = await getData(id);

    console.log("redies ", redies);
    // Assuming NoteSchema is a Mongoose model for your notes
    // const note = await NoteSchema.findOne({ _id: id });

    // if (!note) {
    //   return res.status(404).json({ message: "Note not found" });
    // }

    // return res.status(200).json({ note });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

app.listen(5000, () => console.log("Server running at port 5000"));
