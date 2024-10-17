// Require Mongoose
const mongoose = require("mongoose");

// Define the schema for the topic
const NotesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  comments: [
    {
      commenterName: {
        type: String,
      },
      comment: {
        type: String,
      },
    },
  ],
  attachedPdf: {
    type: String,
  },
});

// Create the Topic model
const Notes = mongoose.model("Notes", NotesSchema);

// Export the Topic model
module.exports = Notes;
