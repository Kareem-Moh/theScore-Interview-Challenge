const fs = require('fs')

let cleanData = []

fs.readFile(__dirname + '/rushing.json', (err, data) => {
  if (err) throw err;
  for (let entry of JSON.parse(data)){
    //data cleanup

    //Convert all yardage to integers
    if (typeof entry.Yds === "string"){
      entry.Yds = parseInt(entry["Yds"].replace(",",""))
    }

    //Change Lng to 2 seperate values, 1 for yards, 1 for bool if it was a TD
    entry.LngWasTD = "N"
    if (typeof entry.Lng === "string"){
        if (entry.Lng.includes("T")) {
            entry.LngWasTD = "Y"
        }
        entry.Lng = parseInt(entry["Lng"].replace("T",""))
    }

    cleanData.push(entry)
  }
});

module.exports = cleanData