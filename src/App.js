import React, { useState, useEffect } from "react";
import RecipesList from "./components/RecipesList";
import "./css/app.css";
import { getRecipes } from "./utils/RecipesAPI";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";

export const RecipesContext = React.createContext();

function App() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [currentCategoryFilter, setCurrentCategoryFilter] = useState("");
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    async function handleRecipes() {
      try {
        setIsFetching(true);
        const recipesResult = await getRecipes();
        if (recipesResult && recipesResult.results) {
          setRecipes(recipesResult.results);
          setFilteredRecipes(recipesResult.results);
        } else {
          if (recipesResult.message) {
            setApiError(recipesResult.message);
          }
        }
        setIsFetching(false);
      } catch (err) {
        console.error("Could not get recipes: ", err);
      }
    }
    handleRecipes();
  }, []);

  useEffect(() => {
    let initialFilteredRecipes = [...recipes];
    if (searchInput) {
      initialFilteredRecipes = initialFilteredRecipes.filter((recipe) => {
        return recipe?.name?.toLowerCase().includes(searchInput.toLowerCase());
      });
    }
    if (currentCategoryFilter) {
      initialFilteredRecipes = initialFilteredRecipes.filter((recipe) => {
        return recipe.tags?.find((tag) => {
          return tag.type === "meal" && tag.name === currentCategoryFilter;
        });
      });
    }
    setFilteredRecipes(initialFilteredRecipes);
  }, [searchInput, currentCategoryFilter, recipes]);

  const recipesContextValue = {
    recipes,
    filteredRecipes,
    setRecipes,
    setSearchInput,
    currentCategoryFilter: currentCategoryFilter,
    setCurrentCategoryFilter,
    isFetching,
    searchInput,
  };

  return (
    <RecipesContext.Provider value={recipesContextValue}>
      <div className="main-layout">
        <aside>
          <SearchBar />
          <Filters />
        </aside>
        <main>
          {(apiError && <div>ERROR: {apiError}</div>) || <RecipesList />}
        </main>
      </div>
    </RecipesContext.Provider>
  );
}

export default App;
