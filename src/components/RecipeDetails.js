import React, { useState, useEffect } from "react";

import { MdAccessTime, MdEnergySavingsLeaf } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { LuChefHat } from "react-icons/lu";
import { FaCarrot } from "react-icons/fa6";
import { PiListNumbersBold } from "react-icons/pi";
import { BsFillChatRightTextFill } from "react-icons/bs";

import { getRecipeDetailsById } from "../utils/RecipesAPI";

export default function RecipeDetails({ selectedRecipeId }) {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [imgOrientation, setImgOrientation] = useState(null);
  const [imgSrc, setImgSrc] = useState("https://placehold.co/600x350");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipeDetails = await getRecipeDetailsById(selectedRecipeId);
        setRecipeDetails(recipeDetails);
        let imgUrl = recipeDetails && recipeDetails.thumbnail_url;
        imgUrl && setImgSrc(imgUrl);
        checkImgOrientation(imgUrl);
      } catch (err) {
        console.log("ERROR fetching recipe details: ", err);
      }
    };

    const checkImgOrientation = (imgSrc) => {
      const img = new Image();
      img.src = imgSrc;
      let orientation = "";
      if (img.naturalHeight > img.naturalWidth) {
        orientation = "1:1";
      } else {
        orientation = "16:9";
      }
      setImgOrientation(orientation);
    };

    fetchData();
  }, [selectedRecipeId]);

  return (
    <div className="recipe-details">
      <div
        className={`content${
          imgOrientation && imgOrientation === "1:1" ? " portrait" : ""
        }`}
      >
        {(imgSrc && (
          <img
            src={imgSrc}
            alt={recipeDetails?.name}
            className="thumbnail-img"
          />
        )) ||
          "loading.."}
        <div className="details">
          <div className="info">
            <div className="total-time">
              <MdAccessTime />
              {recipeDetails?.total_time_tier?.display_tier ||
                recipeDetails?.total_time_minutes ||
                "-"}
            </div>
            <div className="yields">
              <GoPeople />{" "}
              {recipeDetails?.yields ||
                `Servings: ${recipeDetails?.num_servings}`}
            </div>
            <div className="credits">
              <LuChefHat />{" "}
              {(recipeDetails?.credits?.length &&
                recipeDetails?.credits[0]?.name) ||
                "-"}
            </div>
          </div>
          {recipeDetails?.name && (
            <h1 className="title">{recipeDetails.name}</h1>
          )}
          {recipeDetails?.description && (
            <p className="description">{recipeDetails.description}</p>
          )}
          <div className="lists">
            {recipeDetails?.sections?.length &&
              recipeDetails.sections[0].components?.length && (
                <div className="ingredients">
                  <div className="list-title">
                    <FaCarrot /> <h2>Ingredients</h2>
                  </div>
                  <ul className="ingredients-list">
                    {recipeDetails?.sections?.length &&
                      recipeDetails.sections[0].components.map((item) => {
                        return (
                          item.raw_text && (
                            <li key={item.raw_text}>{item.raw_text}</li>
                          )
                        );
                      })}
                  </ul>
                </div>
              )}
            {recipeDetails?.topics?.length && (
              <div className="topics">
                <div className="list-title">
                  <BsFillChatRightTextFill /> <h2>Topics</h2>
                </div>
                <ul className="topics-list">
                  {recipeDetails.topics.map((item) => {
                    return item.name && <li key={item.name}>{item.name}</li>;
                  })}
                </ul>
              </div>
            )}
            {recipeDetails?.nutrition && (
              <div className="nutrition">
                <div className="list-title">
                  <MdEnergySavingsLeaf />
                  <h2>Nutrition</h2>
                </div>
                <ul className="nutrition-list">
                  <li>
                    <label>Calories: </label>
                    {recipeDetails?.nutrition?.calories || "-"}
                  </li>
                  <li>
                    <label>Carbohydrates: </label>
                    {recipeDetails?.nutrition?.carbohydrates || "-"}
                  </li>
                  <li>
                    <label>Fat: </label>
                    {recipeDetails?.nutrition?.fat || "-"}
                  </li>
                  <li>
                    <label>Fiber: </label>
                    {recipeDetails?.nutrition?.fiber || "-"}
                  </li>
                  <li>
                    <label>Protein: </label>
                    {recipeDetails?.nutrition?.protein || "-"}
                  </li>
                  <li>
                    <label>Sugar: </label>
                    {recipeDetails?.nutrition?.sugar || "-"}
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="lists">
            {recipeDetails?.instructions?.length && (
              <div className="instructions">
                <div className="list-title">
                  <PiListNumbersBold />
                  <h2>Cooking instructions</h2>
                </div>
                <ul className="instructions-list">
                  {recipeDetails.instructions.map((step, id) => {
                    return (
                      <li key={id}>
                        {id + 1}) {step.display_text}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          {recipeDetails?.tags?.length && (
            <div className="tags">
              {recipeDetails.tags.map((tag) => {
                return <span key={tag.name}>{tag.name && `#${tag.name}`}</span>;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
