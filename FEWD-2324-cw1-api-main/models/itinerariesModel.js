//const nedb = require("nedb");
const nedb = require("gray-nedb");

class Itineraries {
  constructor(itineraryFilePath) {
    console.log(itineraryFilePath);
    if (itineraryFilePath) {
      this.itinerary = new nedb(itineraryFilePath);
      itineraryFilePath;
    } else {
      this.itinerary = new nedb();
    }
  }

  getAllEntries() {
    return new Promise((resolve, reject) => {
      this.itinerary.find({}, function (err, entries) {
        if (err) {
          reject(err);
        } else {
          resolve(entries);
          console.log("function all() returns: ", entries);
        }
      });
    });
  }

  addEntry(itinerary, id) {
    var entry = {
      itinerary: itinerary,
      id: id,
    };
    return new Promise((resolve, reject) => {
      this.itinerary.insert(entry, function (err, doc) {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  }
}
module.exports = Itineraries;
