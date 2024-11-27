import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  
  const [searchWord, setSearchWord] = useState("")

  useEffect(() => {
    fetch("http://localhost:6001/plants")
    .then((response) => response.json())
    .then((plantData) => setPlants(plantData))
  }, [])

  const handleSearch = (word) => {
    setSearchWord(word)
  }

  const displayedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchWord.toLowerCase())
  )

  function handleUpdatePrice(id, newPrice) {
    setPlants((plants) =>
      plants.map((plant) =>
        plant.id === id ? { ...plant, price: newPrice } : plant
      )
    );
  }

  function handleDelete(id) {
    setPlants((plants) => plants.filter((plant) => plant.id !== id));
  }
  
  return (
    <main>
      <NewPlantForm setPlants={setPlants}/>
      <Search onSearch={handleSearch}/>
      <PlantList
        plants={displayedPlants}
        onUpdatePrice={handleUpdatePrice}
        onDelete={handleDelete}
      />    
      </main>
  );
}

export default PlantPage;
