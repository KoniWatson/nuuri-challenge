"use client";
import React from "react";
import "./home.css";

type Nursery = {
  id: number;
  name: string;
  address1: string;
  address2: string;
  city: string;
};

function Home() {
  const searchParams: { lat: number; lon: number } = {
    lat: 55.95,
    lon: -3.19,
  };
  const [nurseries, setNurseries] = React.useState<Nursery[]>([]);

  const handleNurserySearch = async () => {
    await fetch(
      `http://localhost:4000/partners/nurseries?lat=${searchParams.lat}&lng=${searchParams.lon}&radius=5`
    ).then(async (res) => {
      const data = await res.json();

      setNurseries(data);
    });
  };

  const handlePositionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    pos: "lon" | "lat"
  ) => {
    searchParams[pos] = parseFloat(e.target.value);
  };

  return (
    <section className="nursery-search">
      <div className="search-form">
        <div className="form-input">
          <label>Latitude Position</label>
          <input
            id="form-lat"
            type="float"
            placeholder="Enter Latitude e.g. 55.95"
            onChange={(event) => handlePositionChange(event, "lat")}
          />
        </div>
        <div className="form-input">
          <label>Longitude Position</label>
          <input
            id="form-lon"
            type="float"
            placeholder="Enter Longitude e.g. -3.19"
            onChange={(event) => handlePositionChange(event, "lon")}
          />
        </div>

        <button className="form-submit" onClick={handleNurserySearch}>
          Search
        </button>
        <span className="form-results">Results Found: {nurseries.length}</span>
      </div>

      <div className="results-container">
        {nurseries.length > 0 ? (
          <>
            <h3>Local Nurseries</h3>
            {/* <hr></hr> */}
            <section className="results-list">
              {nurseries.map((nursery, index) => (
                <a
                  className="view-link"
                  key={index}
                  href={`/nursery/${nursery.id}`}
                >
                  {nursery.name}
                </a>
              ))}
            </section>
          </>
        ) : (
          <p className="no-data">No nurseries found.</p>
        )}
      </div>
    </section>
  );
}

export default Home;
