//const parse = require("csv-parse");
const { parse } = require("csv-parse");
const fs = require("fs");

let results = [];
const isHabitPlanet = [];

function isHabit(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet['koi_insol'] < 1.11
  );
}

fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabit(data)) {
      isHabitPlanet.push(data);
    }
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(isHabitPlanet.map((planet)=>{
        return planet['kepler_name']
    }));
    console.log(`${isHabitPlanet.length} Habitable Planet found`);
  });
