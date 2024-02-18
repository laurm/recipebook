import React, { useState, useContext, useRef, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { getRecipesBySearchInput } from "../utils/RecipesAPI";
import { RecipesContext } from "../App";

export default function SearchBar() {
  const { recipes, setRecipes, isFetching, setSearchInput } = useContext(
    RecipesContext
  );

  const handleSearchInput = async (input) => {
    setSearchInput(input);
    // if (input.length > 3) {
    //   setIsFetching(true);
    // }
  };
  return (
    <>
      <div className="search-bar-wrapper">
        <FaSearch id="search-icon" />
        <input
          placeholder="search here"
          onChange={(e) => handleSearchInput(e.target.value)}
        />
      </div>
      {/* <div className="search-content">{isFetching}</div> */}
    </>
  );
}
