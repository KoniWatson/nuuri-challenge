const app = require("../../app");
const request = require("supertest");

describe("Nursery API", () => {
  it("should return all nurseries and status code 200", async () => {
    await request(app)
      .get("/partners/nurseries/all")
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });

  it("should only return nurseries within Glasgow and status code 200", async () => {
    await request(app)
      .get("/partners/nurseries?lat=55.8642&lng=-4.2518&radius=5")
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });

  it("should only return nurseries within Edinburgh and status code 200", async () => {
    await request(app)
      .get("/partners/nurseries?lat=55.9533&lng=-3.1883&radius=5")
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });

  it("returns status code 400 and bad request for missing parameters", async () => {
    await request(app)
      .get("/partners/nurseries?lat=55.8642")
      .expect(400)
      .then((response) => {
        expect(response.text).toEqual("Bad Request: Missing parameters");
      });
  });
});
