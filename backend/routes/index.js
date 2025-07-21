const fs = require("fs");
const router = require("express").Router();
var nurseries = [];

// Reading in data from JSON file - Nursery information
fs.readFile("./routes/filtered_nurseries.json", function (err, data) {
  if (err) throw err;

  nurseries = JSON.parse(data);
});

// Getting all nurseries
router.get("/partners/nurseries/all", (req, res) => {
  res.status(200).send(nurseries);
});
// Getting nurseries based on latitude, longitude, and radius
router.get("/partners/nurseries", (req, res) => {
  const { lat, lng, radius } = req.query;

  if (!lat || !lng || !radius)
    return res.status(400).send("Bad Request: Missing parameters");

  res.status(200).send(
    nurseries.filter((nursery) => {
      const nurseryLocation = {
        lat: parseFloat(nursery.location.coordinates[0]),
        lng: parseFloat(nursery.location.coordinates[1]),
      };

      const userLocation = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      };

      // Convert degrees to radians
      const degreesToRads = (deg) => (deg * Math.PI) / 180.0;

      const R = 6371000; // radius of Earth in meters
      const phi_1 = degreesToRads(nurseryLocation.lat); // latitude of nursery in radians
      const phi_2 = degreesToRads(userLocation.lat); // latitude of user in radians

      const delta_phi = degreesToRads(userLocation.lat - nurseryLocation.lat); // difference in latitudes
      const delta_lambda = degreesToRads(
        userLocation.lng - nurseryLocation.lng
      ); // difference in longitudes

      const a =
        Math.sin(delta_phi / 2.0) ** 2 +
        Math.cos(phi_1) * Math.cos(phi_2) * Math.sin(delta_lambda / 2.0) ** 2; // Haversine formula

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const meters = R * c; // distance in meters
      const km = meters / 1000.0; // distance in kilometers

      // check if the distance is within the specified radius
      return km <= radius;
    })
  );
});

module.exports = router;
