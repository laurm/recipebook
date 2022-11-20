import React, { useState, useEffect, useRef, useCallback } from "react";
import RecipeList from "./RecipeList";
import RecipeEdit from "./RecipeEdit";
import "../css/app.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = "cookingReact.recipes";

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(sampleRecipes);
  // const [recipeToEdit, setRecipeToEdit] = useState(null);
  const recipeToEdit = recipes.find((recipe) => recipe.id === selectedRecipeId);

  const firstFetchHappened = useRef(false);

  useEffect(() => {
    if (firstFetchHappened.current) return;
    firstFetchHappened.current = true;
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    console.log(JSON.parse(recipeJSON));
    if (recipeJSON != null) {
      setRecipes(JSON.parse(recipeJSON));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeInputsEdit,
    handleSelectRecipe,
    handleAddIngredient,
    handleDeleteIngredient,
  };

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: "New",
      servings: 1,
      cookTime: "1:00",
      instructions: "Instr..",
      ingredients: [
        {
          id: uuidv4(),
          name: "Name",
          amount: "1 Tbs",
        },
      ],
    };
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeDelete(id) {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  }

  function handleRecipeInputsEdit(id, recipe) {
    const newRecipes = [...recipes];
    const recipeIndex = newRecipes.findIndex((recip) => recip.id === id);
    newRecipes[recipeIndex] = recipe;
    setRecipes(newRecipes);
  }

  function handleSelectRecipe(id) {
    setSelectedRecipeId(id);
  }

  function handleAddIngredient() {
    const emptyIngrObj = {
      id: uuidv4(),
      name: "",
      amount: "",
    };
    const newRecipes = [...recipes];
    const recipeIndex = recipes.findIndex(
      (recipe) => recipe.id === selectedRecipeId
    );
    newRecipes[recipeIndex].ingredients.push(emptyIngrObj);
    setRecipes(newRecipes);
  }

  function handleDeleteIngredient(ingrId) {
    const newIngredients = recipeToEdit.ingredients.filter(
      (ingr) => ingr.id !== ingrId
    );
    const recipeIndex = recipes.findIndex(
      (recipe) => recipe.id === selectedRecipeId
    );
    const newRecipes = [...recipes];
    newRecipes[recipeIndex].ingredients = newIngredients;

    setRecipes(newRecipes);
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {recipeToEdit && (
        <RecipeEdit
          recipeToEdit={recipeToEdit}
          // handleRecipeInputsEdit={handleRecipeInputsEdit}
        />
      )}
    </RecipeContext.Provider>
  );
}

const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: "1:45",
    instructions: "1.Put salt on Chicken \n2.Put chicken in oven \n3.Eat",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 Pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbs",
      },
    ],
  },
  {
    id: 2,
    name: "Plain Pork",
    servings: 5,
    cookTime: "2:30",
    instructions: "1.Put salt on Pork \n2 .Put pork in oven \n3.Eat",
    ingredients: [
      {
        id: 1,
        name: "Pork",
        amount: "3 Pounds",
      },
      {
        id: 2,
        name: "Paprika",
        amount: "2 Tbs",
      },
    ],
  },
];
export default App;
