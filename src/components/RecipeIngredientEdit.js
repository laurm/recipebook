import React from "react";

export default function RecipeIngredientEdit({
  id,
  name,
  amount,
  setNewRecipeIngredients,
  handleDeleteIngredient,
}) {
  // function helper(ingredientId, changes){
  //     [
  //         {
  //           id: uuidv4(),
  //           name: "Name",
  //           amount: "1 Tbs",
  //         },
  //       ]

  //     setNewRecipe({
  //         ingredients: [

  //         ]
  //     })
  // }

  return (
    <>
      <input
        type="text"
        className="recipe-edit__input"
        value={name}
        onInput={(e) => setNewRecipeIngredients(id, { name: e.target.value })}
      />
      <input
        type="text"
        className="recipe-edit__input"
        value={amount}
        onInput={(e) => setNewRecipeIngredients(id, { amount: e.target.value })}
      />
      <button
        className="btn btn--danger"
        onClick={() => handleDeleteIngredient(id)}
      >
        &times;
      </button>
    </>
  );
}
