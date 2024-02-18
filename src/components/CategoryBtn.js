import React from "react";

export default function CategoryBtn({ name, Icon, handleClick, isActive }) {
  return (
    <>
      <div className="item-card" onClick={handleClick}>
        <div className={`filter-container${isActive ? " active" : ""}`}>
          <div className="icon">{Icon && <Icon />}</div>
          <div>{name}</div>
        </div>
      </div>
    </>
  );
}
