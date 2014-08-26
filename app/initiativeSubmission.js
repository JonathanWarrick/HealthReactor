var mongoose = require('mongoose');

// create the user schema for new users
var SubmissionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  points: { type: Number, required: true },
  timestamp: {type: Date, default: Date.now}
});

// define user model (mongoose models are equivalent of collections, so users file is irrelevant)
var Submission = mongoose.model('Submission', SubmissionSchema);

// export for use in handler functions
module.exports = Submission;