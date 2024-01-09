const nedb = require("gray-nedb");

class Reviews {
  constructor(reviewFilePath) {
    console.log(reviewFilePath);
    if (reviewFilePath) {
      this.review = new nedb(reviewFilePath);
      reviewFilePath;
    } else {
      this.review = new nedb();
    }
  }
  getAllEntries() {
    return new Promise((resolve, reject) => {
      this.review.find({}, function (err, entries) {
        if (err) {
          reject(err);
        } else {
          resolve(entries);
          console.log("function all() returns: ", entries);
        }
      });
    });
  }

  addEntry(review, id) {
    var entry = {
      review: review,
      id: id,
    };
    return new Promise((resolve, reject) => {
      this.review.insert(entry, function (err, doc) {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  }
}
module.exports = Reviews;
