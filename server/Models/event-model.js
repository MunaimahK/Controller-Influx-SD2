const mongoose = require("mongoose");
const EventSchema = mongoose.Schema(
  {
    event: [
      {
        eventTitle: String,
        Description: String,
        Location: String,
        Date: String,
      },
    ],
  },
  {
    collection: "events",
  }
);
const event = mongoose.model("events", EventSchema);
module.exports = event;
