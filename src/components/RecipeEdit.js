import React, { useContext } from "react";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { RecipeContext } from "./App";

export default function RecipeEdit({ recipeToEdit }) {
  const {
    handleRecipeInputsEdit,
    handleAddIngredient,
    handleDeleteIngredient,
  } = useContext(RecipeContext);

  function setNewRecipe(changes) {
    // let changedRecipe = { ...recipeToEdit };
    // changedRecipe[attr] = val;
    // handleRecipeInputsEdit(recipeToEdit.id, changedRecipe);
    handleRecipeInputsEdit(recipeToEdit.id, { ...recipeToEdit, ...changes });
  }

  function setNewRecipeIngredients(ingredientId, ingrChanges) {
    const ingredientToEdit = recipeToEdit.ingredients.find(
      (i) => i.id === ingredientId
    );
    const newIngredient = { ...ingredientToEdit, ...ingrChanges };
    const newIngredientIndex = recipeToEdit.ingredients.findIndex(
      (ingr) => ingr.id === ingredientId
    );

    const newIngredients = [...recipeToEdit.ingredients];
    newIngredients[newIngredientIndex] = newIngredient;

    handleRecipeInputsEdit(recipeToEdit.id, {
      ...recipeToEdit,
      ingredients: newIngredients,
    });
  }

  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button className="btn recipe-edit__remove-button">&times;</button>
      </div>
      <div className="recipe-edit__details-grid">
        <label htmlFor="name" className="recipe-edit__label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={recipeToEdit.name}
          onInput={(e) => setNewRecipe({ name: e.target.value })}
          className="recipe-edit__input"
        />
        <label htmlFor="cookTime" className="recipe-edit__label">
          Cook Time
        </label>
        <input
          type="text"
          name="cookTime"
          id="cookTime"
          value={recipeToEdit.cookTime}
          onInput={(e) => setNewRecipe({ cookTime: e.target.value })}
          className="recipe-edit__input"
        />
        <label htmlFor="servings" className="recipe-edit__label">
          Servings
        </label>
        <input
          type="number"
          min="1"
          name="servings"
          value={recipeToEdit.servings}
          onInput={(e) => setNewRecipe({ servings: e.target.value })}
          id="servings"
          className="recipe-edit__input"
        />
        <label htmlFor="instructions" className="recipe-edit__label">
          Instructions
        </label>
        <textarea
          name="instructions"
          value={recipeToEdit.instructions}
          onInput={(e) => setNewRecipe({ instructions: e.target.value })}
          id="instructions"
          className="recipe-edit__input"
        ></textarea>
      </div>
      <br />
      <label className="recipe-edit__label">Ingredients</label>
      <div className="recipe-edit__ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {recipeToEdit.ingredients.map((el) => (
          <RecipeIngredientEdit
            {...el}
            key={el.id}
            setNewRecipeIngredients={setNewRecipeIngredients}
            handleDeleteIngredient={handleDeleteIngredient}
          />
        ))}
      </div>
      <div className="recipe-edit__add-ingredient-btn-container">
        <button
          className="btn btn--primary"
          onClick={() => handleAddIngredient()}
        >
          Add Ingredient
        </button>
      </div>
    </div>
  );
}
