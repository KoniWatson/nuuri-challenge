import React from "react";
import "./details.css";

async function Details({ params }: { params: { id: string } }) {
  const { id } = await params;
  const nursery_info = await fetch(
    `http://localhost:4000/partners/nurseries/all`
  ).then(async (res) => {
    const data = await res.json();

    return data.filter((nursery: any) => nursery.id.toString() === id)[0];
  });

  return (
    <>
      <div className="nursery-details">
        <div>
          <label>Nursery Name</label> <h3>{nursery_info.name}</h3>
        </div>
        <div>
          <label>Nursery Address</label>{" "}
          <h3>
            {nursery_info.address1}, {nursery_info.address2},{" "}
            {nursery_info.city}
          </h3>
        </div>

        <a href="/">&lt; Back to Search</a>
      </div>
    </>
  );
}

export default Details;
