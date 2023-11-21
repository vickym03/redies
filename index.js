const express = require("express");
const bodyParser = require("body-parser");
const redisConnection = require("./redis/config");
const dbConnection = require("./db/config");
const isCached = require("./cached/cached");
const NoteSchema = require("./model/index");
const { setData, getData } = require("./redis/Session");
const app = express();

console.log("get");

dbConnection();

app.use(bodyParser.json());

/*                            ***Save notes***

method : Post

Curl : curl --location 'http://localhost:5000/api/notes' \
--header 'Content-Type: application/json' \
--data '{
    "title": "zero",
    "note": "one"
}'


use: save notes in DB and redis
*/
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
    await setData(savedNote._id.toString(), savedNote);

    return res.json({
      message: "Note has been saved",
      note: savedNote,
    });
  } catch (err) {
    return res.status(500).json(err); // Handle error appropriately
  }
});

/*                            ***get notes***

method : Get

Curl : curl --location 'http://localhost:5000/api/notes/654684d634f050955eaf0822' \
--header 'Content-Type: application/json'

use: get notes 
*/
app.get("/api/notes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const redies = await getData(id);
    if (!redies) {
      const note = await NoteSchema.findOne({ _id: id });
      console.log("not found in redis");
      await setData(note._id.toString(), note);
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      } else {
        console.log("found in DB");
        const redies = await getData(id);
        return res.status(200).json(redies);
      }
    }

    return res.status(200).json(redies);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

app.listen(5000, () => console.log("Server running at port 5000"));
