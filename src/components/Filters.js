import React, { useContext } from "react";
import CategoryBtn from "./CategoryBtn";
import { RecipesContext } from "../App";

import { GiHotMeal } from "react-icons/gi";
import { PiForkKnifeBold } from "react-icons/pi";
import { MdOutlineSetMeal } from "react-icons/md";
import { GiPieSlice } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";

const categoryFilters = [
  { name: "Meal", Icon: GiHotMeal },
  { name: "Appetizers", Icon: PiForkKnifeBold },
  { name: "Sides", Icon: MdOutlineSetMeal },
  { name: "Desserts", Icon: GiPieSlice },
  { name: "Snacks", Icon: IoFastFood },
];

export default function Filters() {
  const { currentCategoryFilter, setCurrentCategoryFilter } = useContext(
    RecipesContext
  );

  function handleSetCategoryFilter(e) {
    if (currentCategoryFilter === e.name.toLowerCase()) {
      setCurrentCategoryFilter("");
      return;
    }
    setCurrentCategoryFilter(e.name.toLowerCase());
  }

  return (
    <>
      <div>
        {categoryFilters.map((el) => (
          <CategoryBtn
            {...el}
            key={el.name}
            isActive={currentCategoryFilter === el.name.toLowerCase()}
            handleClick={() => handleSetCategoryFilter(el)}
          />
        ))}
      </div>
    </>
  );
}
