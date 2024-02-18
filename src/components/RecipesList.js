import React, { useContext, useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import { FaSpinner } from "react-icons/fa";
import Pagination from "./Pagination";
import { RecipesContext } from "../App";
import Modal from "./Modal";
import RecipeDetails from "./RecipeDetails";

export default function RecipesList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const [selectedRecipeId, setSelectedRecipeId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    filteredRecipes: recipes,
    isFetching,
    currentCategoryFilter,
    searchInput,
  } = useContext(RecipesContext);

  //Get current recipes
  const lastRecipeIndex = currentPage * recipesPerPage;
  const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
  const currentRecipes = recipes.slice(firstRecipeIndex, lastRecipeIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentCategoryFilter, searchInput]);

  function handleSelectedRecipe(id) {
    setSelectedRecipeId(id);
    setIsModalOpen(true);
  }

  return (
    <>
      <div
        className={`item-cards-wrapper ${isFetching ? "single-column" : ""}`}
      >
        {isFetching && <FaSpinner className="spinner" />}
        {!isFetching && (!currentRecipes || currentRecipes.length == 0) && (
          <div className="message">Nothing found...</div>
        )}
        {!isFetching &&
          currentRecipes.length > 0 &&
          currentRecipes.map((item) => {
            return (
              <ItemCard
                key={item.id}
                {...item}
                handleSelectedRecipe={() => handleSelectedRecipe(item.id)}
              />
            );
          })}
      </div>
      {!isFetching && currentRecipes.length > 0 && <hr />}
      <Pagination
        itemsPerPage={recipesPerPage}
        totalItems={recipes.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Modal isOpen={isModalOpen} onModalClose={() => setIsModalOpen(false)}>
        <RecipeDetails selectedRecipeId={selectedRecipeId} />
      </Modal>
    </>
  );
}
