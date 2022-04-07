import React from "react";
import CatForm from "./CatForm";

export default function CatCreate(props) {
  return (
    <div className="creatCategory m-2 text-center">
      <CatForm
        getCategories={props.getCategories}
        setShowCreate={props.setShowCreate}
      />
    </div>
  );
}
