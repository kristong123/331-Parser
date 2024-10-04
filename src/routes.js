// Store the information about each building here.
const buildings = [];

// Parses and records information on all the buildings
export const parseBuildings = (lines) => {
  for (let i = 1; lines.length; i++) {
    if (row[i].trim() === '') continue;
    const values = row[i].split(',');
    const record = {
        shortName: values[0],
        longName: values[1],
        x: values[2],
        y: values[3]
    }
    buildings.push(record);
  }
};


// Returns a list of (<= 3) buildings whose names contain the given text.
export const findByName = (req, res) => {
  const results = [];
  for (let i = 0; i < buildings.length && results.length < 3; i++) {
    if (buildings[i].longName.includes(req.query.text)) {
      results.push(buildings[i]);
    }
  }
  res.json(results);
}



// Returns a list of the 3 buildings located closest to the given point
export const closest = (req, res) => {
  const results = [];
  const buildingDistances = {};
  const distances = [];

  for (let i = 0; i < buildings.length; i++) {
    const distance = euclideanDistance(buildings[i].x, buildings[i].y, req.query.x, req.query.y);
    distances.push(distance);
    buildingDistances[distance] = buildings[i];
  }

  distances.sort();
  
  for (let i = 0; i < 3; i++) {
    results.push(buildingDistances[distances[i]]);
  }

  res.json(results);
}

/**
 * Computes the Euclidean distance between two points.
 * @param {number} x1 x-coordinate of the first point
 * @param {number} y1 y-coordinate of the first point
 * @param {number} x2 x-coordinate of the second point
 * @param {number} y2 y-coordinate of the second point
 * @return {number} distance between the points
 */
function euclideanDistance(x1, y1, x2, y2) {
  let dx = x1 - x2;
  let dy = y1 - y2;
  return dx * dx + dy * dy;
}
