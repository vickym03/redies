const mongoose = require("mongoose");

//Mongoose Model
const NoteSchema = new mongoose.Schema({
  title: String,
  note: String,
});

module.exports =
  mongoose.model.NoteSchema || mongoose.model("Note", NoteSchema);
