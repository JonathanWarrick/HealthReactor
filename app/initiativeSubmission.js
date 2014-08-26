var mongoose = require('mongoose');
// var moment = require('moment');

// create the submission schema for new submissions
var SubmissionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  waterPoints: { type: Number, required: true },
  stairsPoints: { type: Number, required: true },
  yogaPoints: { type: Number, required: true },
  workoutPoints: { type: Number, required: true },
  walkPoints: { type: Number, required: true },
  meditatePoints: { type: Number, required: true },
  totalPoints: { type: Number, required: true },
  timestamp: {type: Date, default: Date.now},
  date: { type: String }
});

SubmissionSchema.pre('save', function(next) {
	var submission = this;
	var changeDate = function(callback) {
		submission.date = submission.timestamp.toDateString();
		callback();
	}
	changeDate(function(err) {
		if (err) {
			console.error(err);
		}
		console.log('submission:', submission);
		next();
	});
});

// define user model (mongoose models are equivalent of collections, so users file is irrelevant)
var Submission = mongoose.model('Submission', SubmissionSchema);

// export for use in handler functions
module.exports = Submission;