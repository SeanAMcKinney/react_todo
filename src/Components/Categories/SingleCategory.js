import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import CatEdit from "./CatEdit";

library.add(fas);

export default function SingleCategory(props) {
  const { currentUser } = useAuth();
  const [showEdit, setShowEdit] = useState(false);
  const deleteCategory = (id) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${props.category.DepartmentName}?`)) {
      axios.delete(`http://localhost:56020/api/categories/${id}`).then(() => {
        props.getCategories(id);
      })
    }
  }

  return (
    <tr>
      <td>{props.category.DepartmentName}</td>
      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN && (
        <td>
          <button
            className="m-1 rounded"
            id="editLink"
            onClick={() => setShowEdit(true)}
          >
            <FontAwesomeIcon icon={["fas", "edit"]} />
          </button>
          <button
            className="m-1 rounded"
            id="deleteLink"
            onClick={() => deleteCategory(props.category.CategoryId)}
          >
            <FontAwesomeIcon icon={["fas", "trash-alt"]} />
          </button>
          {showEdit && (
            <CatEdit
              category={props.category}
              setShowEdit={setShowEdit}
              showEdit={showEdit}
              getCategories={props.getCategories}
            />
          )}
        </td>
      )}
    </tr>
  );
}
