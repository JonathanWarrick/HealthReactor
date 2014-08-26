var mongoose = require('mongoose');
// var moment = require('moment');

// create the user schema for new users
var SubmissionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  points: { type: Number, required: true },
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


// SubmissionSchema.methods.convertDate = function(date) {
// 	moment(date).format('YYYY-MM-DD');
// };

// SubmissionSchema.pre('save', function(next) {
// 	var submission = this;
// 	submission.date = submission.convertDate(submission.timestamp);
// 	console.log('success');
// 	console.log(submission.date);
// 	next();
// });

// define user model (mongoose models are equivalent of collections, so users file is irrelevant)
var Submission = mongoose.model('Submission', SubmissionSchema);

// export for use in handler functions
module.exports = Submission;