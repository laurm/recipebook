import React from "react";
import { FaThumbsUp, FaThumbsDown, FaUser } from "react-icons/fa";

export default function ItemCard({
  thumbnail_url,
  name,
  user_ratings,
  description,
  credits,
  id,
  handleSelectedRecipe,
}) {
  return (
    <div className="item-card" onClick={handleSelectedRecipe}>
      <figure>
        <img src={thumbnail_url} alt={name} />
      </figure>
      <div className="item-body">
        <h2>{name}</h2>
        <p>
          {description ||
            `Check out this awesome recipe and prepare today the best ${name?.toLowerCase()}`}
        </p>
      </div>
      <div className="item-footer">
        <div className="ratings">
          <FaThumbsUp /> {user_ratings?.count_positive || 0} &nbsp;&nbsp;{" "}
          <FaThumbsDown /> {user_ratings?.count_negative || 0}
        </div>
        <div className="author">
          {credits && credits[0]?.name && (
            <>
              <FaUser /> {credits[0].name}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
