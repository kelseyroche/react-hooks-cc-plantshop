import React, { useState } from "react";

function PlantCard({ id, name, image, price, inStock, onDelete, onUpdatePrice }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(price);
  const [stockStatus, setStockStatus] = useState(inStock);

  function handleToggleStock() {
    setStockStatus((prevStatus) => !prevStatus);
  }

  function handlePriceChange(e) {
    setNewPrice(e.target.value);
  }

  function handlePriceUpdate() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: parseFloat(newPrice) }),
    })
      .then((response) => response.json())
      .then((updatedPlant) => {
        onUpdatePrice(id, updatedPlant.price);
        setIsEditing(false);
      });
  }

  function handleDelete() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    }).then(() => onDelete(id));
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      {isEditing ? (
        <input
          type="number"
          value={newPrice}
          onChange={handlePriceChange}
          onBlur={handlePriceUpdate}
        />
      ) : (
        <p onClick={() => setIsEditing(true)}>Price: {price}</p>
      )}
      {stockStatus ? (
        <button className="primary" onClick={handleToggleStock}>
         In Stock
        </button>
      ) : (
        <button onClick={handleToggleStock}>Out of Stock</button>
      )}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;