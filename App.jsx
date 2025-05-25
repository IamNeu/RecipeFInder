import "./App.css";
import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const getMeals = async () => {
    setSelectedMeal(null);
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await response.json();
    setMeals(data.meals || []);
  };

  const getMealDetails = async (id) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    setSelectedMeal(data.meals[0]);
  };
  

  return (
    <div className="app-container">
      <div className="search-bar-container">
        <h1>Recipe Finder</h1>
        <div className="search-controls">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for a meal"
            type="text"
          />
          <button onClick={getMeals}>Search</button>
        </div>
      </div>
      <ul className="meal-list">
        {meals.map(meal => (
          <li key={meal.idMeal}>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width="100"
              style={{ cursor: "pointer" }}
              onClick={() => getMealDetails(meal.idMeal)}
            />
            <br />
            <strong>{meal.strMeal}</strong>
          </li>
        ))}
      </ul>
      {selectedMeal && (
        <div className="selected-meal">
          <h2>{selectedMeal.strMeal}</h2>
          <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} width="200" />
          <p><b>Category:</b> {selectedMeal.strCategory}</p>
          <p><b>Area:</b> {selectedMeal.strArea}</p>
          <p><b>Instructions:</b> {selectedMeal.strInstructions}</p>
          <h3>Ingredients:</h3>
          <ul>
            {Array.from({ length: 20 }, (_, i) => {
              const ingredient = selectedMeal[`strIngredient${i + 1}`];
              const measure = selectedMeal[`strMeasure${i + 1}`];
              return (
                ingredient && ingredient.trim() !== "" ? (
                  <li key={i}>{measure} {ingredient}</li>
                ) : null
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;