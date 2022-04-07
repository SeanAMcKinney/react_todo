import React from "react";

export default function SingleGroceryItem(props) {
  return (
    <div className="singleGroceryItem col-md-5 m-4">
      <h3>{props.groceryItem.Name}</h3>
      {props.groceryItem.Description !== null ? (
        <p>{props.groceryItem.Description}</p>
      ) : (
        <p>No Description Provided</p>
      )}
    </div>
  );
}
