import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onUpdatePrice, onDelete }) {
  return (
    <ul className="cards">
{plants.map((plant) => {
  console.log(plant.id)
  return (
    <PlantCard
      key={plant.id}
      id={plant.id}
      name={plant.name}
      image={plant.image}
      price={plant.price}
      inStock={plant.inStock}
      onUpdatePrice={onUpdatePrice}
      onDelete={onDelete}
    />
  );
})}
    </ul>
  );
}

export default PlantList;